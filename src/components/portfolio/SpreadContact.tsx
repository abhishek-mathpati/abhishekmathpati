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
        className="absolute z-10 cursor-pointer rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border-2 border-transparent hover:border-black/60 hover:bg-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
        style={{
          left: '63.333%',
          top: '49.074%',
          width: '3.5%',
          aspectRatio: '1 / 1'
        }}
        aria-label="GitHub Profile"
      />

      {/* Interactive Button: Contact / Send Email Modal (Resend) */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        title="Send a Message (Resend Email)"
        className="absolute z-10 cursor-pointer rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border-2 border-transparent hover:border-black/60 hover:bg-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 bg-transparent"
        style={{
          left: '67.240%',
          top: '49.120%',
          width: '3.5%',
          aspectRatio: '1 / 1'
        }}
        aria-label="Send Direct Message"
      />

      {/* Interactive Link: LinkedIn Profile */}
      <a
        href="https://www.linkedin.com/in/mathpati-abhishek-b654b2296/"
        target="_blank"
        rel="noopener noreferrer"
        title="Open LinkedIn Profile"
        className="absolute z-10 cursor-pointer rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border-2 border-transparent hover:border-black/60 hover:bg-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
        style={{
          left: '71.146%',
          top: '49.120%',
          width: '3.5%',
          aspectRatio: '1 / 1'
        }}
        aria-label="LinkedIn Profile"
      />

      {/* Interactive Link: Download CV / Resume */}
      <a
        href="/Abhishek_Mathpati_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Abhishek_Mathpati_CV.pdf"
        title="Download CV (PDF)"
        className="absolute z-10 cursor-pointer rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border-2 border-transparent hover:border-black/60 hover:bg-black/[0.06] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-[1.03] active:scale-95"
        style={{
          left: '67.240%',
          top: '55.185%',
          width: '8.44%',
          height: '5.00%'
        }}
        aria-label="Download CV"
      />

      {/* Direct Contact Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
