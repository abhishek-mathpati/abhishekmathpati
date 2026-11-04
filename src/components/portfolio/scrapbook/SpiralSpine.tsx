import React from 'react'

interface Props {
  className?: string
  count?: number
}

export const SpiralSpine: React.FC<Props> = ({ className = '', count = 14 }) => {
  return (
    <div className={`relative h-full flex flex-col justify-between py-1 pointer-events-none select-none z-30 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative w-full h-[18px] sm:h-[22px] flex items-center justify-center">
          {/* Punched hole slot on left (in dark brown cover) */}
          <div className="absolute left-[2%] w-[18%] h-[12px] sm:h-[14px] bg-[#1a0e07] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)] opacity-95" />

          {/* Punched hole slot on right (in spine edge) */}
          <div className="absolute right-[2%] w-[18%] h-[12px] sm:h-[14px] bg-[#1a0e07] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.95)] opacity-95" />

          {/* Realistic 3D Silver Metallic Ring Coil */}
          <div className="relative w-[88%] h-[10px] sm:h-[13px] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.6),0_1.5px_3px_rgba(0,0,0,0.4)] bg-gradient-to-b from-[#ffffff] via-[#cbd5e1] via-50% to-[#475569] border-t border-white/95">
            {/* Top specular highlight streak */}
            <div className="absolute inset-x-2 top-[1px] h-[1.5px] bg-white/95 rounded-full" />
            {/* Center soft metallic reflection */}
            <div className="absolute inset-x-3 top-[3.5px] h-[1px] bg-white/60 rounded-full" />
            {/* Bottom cylinder shadow */}
            <div className="absolute inset-x-1 bottom-0 h-[2px] bg-[#1e293b]/60 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

