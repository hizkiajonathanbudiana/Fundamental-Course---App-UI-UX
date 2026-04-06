import React from 'react';

export default function MomoMascot({ className = "w-24 h-24", mood = "happy", animated = true }) {
  const floatClass = animated ? (mood === 'excited' ? "animate-bop-fast" : "animate-bop") : "";
  return (
    <div className={`relative ${floatClass} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {/* Ears */}
        <circle cx="20" cy="30" r="14" fill="#000000" />
        <circle cx="20" cy="30" r="7" fill="#4B4B5A" />
        <circle cx="80" cy="30" r="14" fill="#000000" />
        <circle cx="80" cy="30" r="7" fill="#4B4B5A" />
        
        {/* Head/Body Base */}
        <rect x="15" y="20" width="70" height="75" rx="35" fill="#2A2A3B" stroke="#000000" strokeWidth="4" />
        
        {/* Formosan Bear Signature White 'V' */}
        <path d="M30 80 Q50 100 70 80" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
        
        {/* Snout Area */}
        <ellipse cx="50" cy="60" rx="20" ry="15" fill="#E4E4E7" stroke="#000000" strokeWidth="3" />
        <ellipse cx="50" cy="53" rx="6" ry="4" fill="#000000" />
        
        {/* Mouth Based on Mood */}
        {mood === 'happy' || mood === 'excited' ? (
          <path d="M43 62 Q50 68 57 62" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : mood === 'focused' ? (
          <path d="M46 62 L54 62" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M45 64 Q50 60 55 64" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* Eyes Based on Mood */}
        {mood === "happy" ? (
           <>
             <path d="M32 45 Q36 41 40 45" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
             <path d="M60 45 Q64 41 68 45" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
           </>
        ) : mood === "excited" ? (
           <>
             <path d="M32 45 L36 40 L40 45" stroke="#00FF87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
             <path d="M60 45 L64 40 L68 45" stroke="#00FF87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
           </>
        ) : (
           <>
             <circle cx="36" cy="45" r="4.5" fill="#FFFFFF" />
             <circle cx="64" cy="45" r="4.5" fill="#FFFFFF" />
           </>
        )}
      </svg>
    </div>
  );
}