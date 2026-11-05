import React, { useState } from 'react'
import { ContactModal } from '../contact/ContactModal'

interface SpreadProps {
  className?: string
}

export const SpreadContact: React.FC<SpreadProps> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Resolution Design from Designs/Page8.png */}
      <img
        src="/designs/Page8.png?v=20261105"
        alt="Language Skills & Contact Spread"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain pointer-events-none select-none"
      />

      {/* Interactive Link: GitHub Profile */}
      <a
        href="https://github.com/abhishek-mathpati"
        target="_blank"
        rel="noopener noreferrer"
        title="Open GitHub Profile"
        className="group absolute z-10 cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hover:scale-115 active:scale-95"
        style={{
          left: '63.333%',
          top: '49.074%',
          width: '2.92%',
          height: '4.63%'
        }}
        aria-label="GitHub Profile"
      >
        {/* Soft Ambient Halo Glow (like turning arrows) */}
        <div className="absolute -inset-2 rounded-full bg-white/45 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Icon with Filled White Octocat - straight pop-up */}
        <img
          src="/designs/contact/icon_hover_gh.png"
          alt=""
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] drop-shadow-[0_0_3px_rgba(0,0,0,0.35)] pointer-events-none select-none"
        />
      </a>

      {/* Interactive Button: Contact / Send Email Modal (Resend) */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        title="Send a Message"
        className="group absolute z-10 cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hover:scale-115 active:scale-95 bg-transparent border-none p-0 outline-none"
        style={{
          left: '67.240%',
          top: '49.120%',
          width: '2.92%',
          height: '4.54%'
        }}
        aria-label="Send Direct Message"
      >
        {/* Soft Ambient Halo Glow */}
        <div className="absolute -inset-2 rounded-full bg-white/45 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Icon with Filled White Envelope - straight pop-up */}
        <img
          src="/designs/contact/icon_hover_em.png"
          alt=""
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] drop-shadow-[0_0_3px_rgba(0,0,0,0.35)] pointer-events-none select-none"
        />
      </button>

      {/* Interactive Link: LinkedIn Profile */}
      <a
        href="https://www.linkedin.com/in/mathpati-abhishek-b654b2296/"
        target="_blank"
        rel="noopener noreferrer"
        title="Open LinkedIn Profile"
        className="group absolute z-10 cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hover:scale-115 active:scale-95"
        style={{
          left: '71.146%',
          top: '49.120%',
          width: '2.81%',
          height: '4.54%'
        }}
        aria-label="LinkedIn Profile"
      >
        {/* Soft Ambient Halo Glow with subtle blue tint */}
        <div className="absolute -inset-2 rounded-full bg-blue-400/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Icon with Filled White 'in' - straight pop-up */}
        <img
          src="/designs/contact/icon_hover_li.png"
          alt=""
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] drop-shadow-[0_0_3px_rgba(0,0,0,0.35)] pointer-events-none select-none"
        />
      </a>

      {/* Interactive Link: Download CV / Resume */}
      <a
        href="/Abhishek_Mathpati_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Abhishek_Mathpati_CV.pdf"
        title="Download CV (PDF)"
        className="group absolute z-10 cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hover:scale-108 active:scale-95"
        style={{
          left: '67.240%',
          top: '55.185%',
          width: '8.13%',
          height: '4.44%'
        }}
        aria-label="Download CV"
      >
        {/* Soft Ambient Halo Glow around the pill */}
        <div className="absolute -inset-2 rounded-full bg-white/45 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Hover Icon with Filled White Cloud, Arrow & 'CV' - straight pop-up */}
        <img
          src="/designs/contact/icon_hover_cv.png"
          alt=""
          className="relative w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] drop-shadow-[0_0_3px_rgba(0,0,0,0.35)] pointer-events-none select-none"
        />
      </a>

      {/* Direct Contact Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
