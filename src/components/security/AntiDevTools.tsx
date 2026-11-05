import { useEffect, useState } from 'react';

interface AntiDevToolsProps {
  /** If true, immediately replaces window.location with about:blank on lock */
  immediateRedirect?: boolean;
}

export function AntiDevTools({ immediateRedirect = false }: AntiDevToolsProps) {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const isDev = import.meta.env.DEV;

    const triggerLock = () => {
      setIsLocked(true);

      // In production (or if immediateRedirect requested), redirect out
      if (!isDev) {
        if (immediateRedirect) {
          window.location.replace('about:blank');
        } else {
          // Give 2.5s for the intruder to see the ACCESS DENIED security protocol screen
          setTimeout(() => {
            window.location.replace('about:blank');
          }, 2500);
        }
      }
    };

    // 1. Dimension Check: Detects DevTools docked to side or bottom
    // In local dev, skip dimension polling so developers can inspect styles on localhost
    const detectDevTools = setInterval(() => {
      // Exclude mobile devices where virtual keyboards & scrolling resize inner dimensions
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) return;

      // In dev mode, don't lock on dimension difference to avoid locking developers out of localhost
      if (isDev && !window.location.search.includes('testSecurity=true')) {
        return;
      }

      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;

      if (widthDiff || heightDiff) {
        triggerLock();
      }
    }, 500);

    // 2. Keyboard Shortcuts Block (F12, Inspect, View Source, Console)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Dev mode unlock escape hatch
      if (isDev && isLocked && e.key === 'Escape') {
        setIsLocked(false);
        return;
      }

      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        triggerLock();
      }
      // Ctrl+Shift+I / Cmd+Option+I (Inspect DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        triggerLock();
      }
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        triggerLock();
      }
      // Ctrl+U / Cmd+U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        triggerLock();
      }
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        triggerLock();
      }
    };

    // 3. Right-Click Context Menu Block (Silently disabled to prevent accidental lockout)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      clearInterval(detectDevTools);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [immediateRedirect, isLocked]);

  if (!isLocked) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center text-red-500 font-mono select-none px-6">
      <div className="relative flex flex-col items-center max-w-xl text-center">
        {/* Pulsing Glitch / Access Denied Banner */}
        <div className="w-16 h-16 mb-4 rounded-full border-2 border-red-500/80 flex items-center justify-center bg-red-950/40 animate-pulse">
          <span className="text-3xl font-black text-red-500">!</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-widest animate-pulse text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
          ACCESS DENIED
        </h1>

        <p className="text-lg sm:text-2xl font-bold tracking-wider text-red-400">
          Security Protocol Activated.
        </p>

        <p className="text-sm sm:text-base mt-3 text-red-300/80 font-mono leading-relaxed">
          Unauthorized diagnostic access detected and neutralized.
        </p>

        <div className="mt-6 px-4 py-2 rounded border border-red-500/30 bg-red-950/30 text-red-400 text-xs font-mono">
          <span>EVENT_ID: SEC_INSPECTION_BLOCKED</span>
          <span className="mx-2">•</span>
          <span>TERMINAL_HALT</span>
        </div>

        {import.meta.env.DEV && (
          <button
            onClick={() => setIsLocked(false)}
            className="mt-8 px-4 py-1.5 rounded-full border border-red-400/40 text-xs text-red-300 hover:bg-red-950/60 transition-colors cursor-pointer"
          >
            [Dev Mode: Click or press Esc to Dismiss]
          </button>
        )}
      </div>
    </div>
  );
}

