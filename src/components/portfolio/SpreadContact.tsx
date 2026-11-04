import React, { useState } from 'react'
import { ContactModal } from '../contact/ContactModal'

interface SpreadProps {
  className?: string
}

export const SpreadContact: React.FC<SpreadProps> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={`relative w-full h-full select-none overflow-hidden bg-white ${className}`}>
      {/* High-Definition Master Design */}
      <img
        src="/designs/Page8.png"
        alt="Language Skills & Contact Spread"
        className="w-full h-full object-fill pointer-events-none select-none"
      />

      {/* Interactive Link: GitHub Profile */}
      <a
        href="https://github.com/abhishek-mathpati"
        target="_blank"
        rel="noopener noreferrer"
        title="Open GitHub Profile"
        className="absolute z-10 cursor-pointer rounded-full transition-all duration-200 hover:outline hover:outline-2 hover:outline-black/50 hover:shadow-lg hover:scale-110 active:scale-95"
        style={{
          left: '61.8%',
          top: '46.3%',
          width: '3.0%',
          height: '5.2%'
        }}
        aria-label="GitHub Profile"
      />

      {/* Interactive Button: Contact / Send Email Modal */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        title="Send a Direct Message"
        className="absolute z-10 cursor-pointer rounded-full transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-500/60 hover:shadow-lg hover:scale-110 active:scale-95 bg-transparent"
        style={{
          left: '65.4%',
          top: '46.3%',
          width: '3.0%',
          height: '5.2%'
        }}
        aria-label="Send Direct Message"
      />

      {/* Interactive Link: LinkedIn Profile */}
      <a
        href="https://www.linkedin.com/in/abhishekmathpati"
        target="_blank"
        rel="noopener noreferrer"
        title="Open LinkedIn Profile"
        className="absolute z-10 cursor-pointer rounded-full transition-all duration-200 hover:outline hover:outline-2 hover:outline-blue-600/60 hover:shadow-lg hover:scale-110 active:scale-95"
        style={{
          left: '69.0%',
          top: '46.3%',
          width: '3.0%',
          height: '5.2%'
        }}
        aria-label="LinkedIn Profile"
      />

      {/* Interactive Link: Download CV / Resume */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Abhishek_Mathpati_Resume.pdf"
        title="Download Curriculum Vitae (PDF)"
        className="absolute z-10 cursor-pointer rounded-full transition-all duration-200 hover:outline hover:outline-2 hover:outline-black/50 hover:shadow-lg hover:scale-[1.04] active:scale-95"
        style={{
          left: '63.2%',
          top: '52.7%',
          width: '8.2%',
          height: '5.2%'
        }}
        aria-label="Download CV"
      />

      {/* Direct Contact Form Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
