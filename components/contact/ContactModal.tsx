'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [honey, setHoney] = useState(''); // invisible honeypot field
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, _honey: honey }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to send transmission');
            }

            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full font-sans text-sm">
            {/* Invisible honeypot field */}
            <input
                type="text"
                name="_honey"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Name
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/55 hover:bg-white/70 focus:bg-white/85 border border-white/70 focus:border-blue-500/80 rounded-2xl text-slate-900 placeholder-slate-400 font-sans text-sm outline-none backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                    disabled={status === 'loading'}
                />
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/55 hover:bg-white/70 focus:bg-white/85 border border-white/70 focus:border-blue-500/80 rounded-2xl text-slate-900 placeholder-slate-400 font-sans text-sm outline-none backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                    disabled={status === 'loading'}
                />
            </div>

            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Message
                </label>
                <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-white/55 hover:bg-white/70 focus:bg-white/85 border border-white/70 focus:border-blue-500/80 rounded-2xl text-slate-900 placeholder-slate-400 font-sans text-sm outline-none resize-none backdrop-blur-md transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]"
                    disabled={status === 'loading'}
                />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2.5 text-rose-800 text-xs bg-rose-500/15 p-3 rounded-2xl border border-rose-400/40 backdrop-blur-md font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {status === 'success' && (
                <div className="flex items-center gap-2.5 text-emerald-800 text-xs bg-emerald-500/15 p-3 rounded-2xl border border-emerald-400/40 backdrop-blur-md font-sans">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>✓ Message transmitted successfully!</span>
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white font-semibold font-sans text-sm shadow-[0_10px_25px_rgba(15,23,42,0.25)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.35)] border border-white/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md mt-2"
            >
                <Send className="w-4 h-4" />
                <span>{status === 'loading' ? 'Transmitting...' : 'Send Message'}</span>
            </button>
        </form>
    );
}

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/25 select-auto transition-opacity duration-300"
            onClick={onClose}
        >
            {/* Frosted Liquid Glass Modal (Matching reference aesthetic) */}
            <div
                className="relative w-full max-w-md rounded-[32px] p-7 md:p-8 select-auto bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.25),inset_0_1.5px_1px_rgba(255,255,255,0.85),inset_0_-1px_1px_rgba(255,255,255,0.25)] text-slate-800 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/40 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/60 border border-white/80 shadow-sm flex items-center justify-center text-blue-600 backdrop-blur-md">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold font-sans text-slate-900 tracking-tight">Send a Message</h2>
                            <p className="text-[11px] text-slate-600 font-sans">Delivers to abhishekmathpati2027@gmail.com</p>
                        </div>
                    </div>
                    {/* Frosted Glass Circular Close Button */}
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <ContactForm onSuccess={() => {}} />
            </div>
        </div>,
        document.body
    );
}

export default ContactForm;
