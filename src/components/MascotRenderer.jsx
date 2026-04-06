import React from 'react';
import MomoMascot from './MomoMascot';

export default function MascotRenderer({ languageId, mood = "happy", className = "w-24 h-24", animated = true }) {
  const floatClass = animated ? "animate-bop" : "";

  // Taiwan - Formosan black bear
  if (languageId === 'zh_tw') {
    return <MomoMascot className={className} mood={mood} animated={animated} />;
  }

  // China - panda
  if (languageId === 'zh_cn') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <circle cx="24" cy="28" r="12" fill="#111" stroke="#000" strokeWidth="3" />
          <circle cx="76" cy="28" r="12" fill="#111" stroke="#000" strokeWidth="3" />
          <ellipse cx="50" cy="56" rx="34" ry="31" fill="#FFF" stroke="#000" strokeWidth="4" />
          <ellipse cx="35" cy="50" rx="8" ry="10" fill="#111" />
          <ellipse cx="65" cy="50" rx="8" ry="10" fill="#111" />
          <circle cx="35" cy="51" r="3" fill="#FFF" />
          <circle cx="65" cy="51" r="3" fill="#FFF" />
          <ellipse cx="50" cy="61" rx="6" ry="4" fill="#111" />
          <path d="M43 68 Q50 74 57 68" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  // Spain/Portuguese family - bull
  if (languageId === 'es' || languageId === 'pt') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <path d="M25 40 Q10 20 5 35" stroke="#F5E6D3" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M75 40 Q90 20 95 35" stroke="#F5E6D3" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="15" cy="45" rx="8" ry="4" fill="#8B4513" transform="rotate(-20 15 45)" stroke="#000" strokeWidth="3" />
          <ellipse cx="85" cy="45" rx="8" ry="4" fill="#8B4513" transform="rotate(20 85 45)" stroke="#000" strokeWidth="3" />
          <path d="M20 30 Q50 10 80 30 L75 70 Q50 90 25 70 Z" fill="#D2691E" stroke="#000" strokeWidth="4" />
          <ellipse cx="50" cy="70" rx="22" ry="14" fill="#F5E6D3" stroke="#000" strokeWidth="3" />
          <ellipse cx="42" cy="68" rx="4" ry="6" fill="#000" />
          <ellipse cx="58" cy="68" rx="4" ry="6" fill="#000" />
          <path d="M35 45 Q40 40 45 45" stroke="#FFF" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M55 45 Q60 40 65 45" stroke="#FFF" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  // Japan - fox
  if (languageId === 'ja') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <path d="M20 50 L15 15 L45 35" fill="#F4A460" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <path d="M80 50 L85 15 L55 35" fill="#F4A460" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <path d="M22 45 L18 22 L40 36" fill="#FFF" />
          <path d="M78 45 L82 22 L60 36" fill="#FFF" />
          <ellipse cx="50" cy="55" rx="35" ry="30" fill="#F4A460" stroke="#000" strokeWidth="4" />
          <path d="M20 55 Q50 35 80 55 Q80 80 50 85 Q20 80 20 55" fill="#FFF" />
          <ellipse cx="50" cy="55" rx="5" ry="3" fill="#000" />
          <path d="M45 60 Q50 65 55 60" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="35" cy="45" r="4" fill="#000" />
          <circle cx="65" cy="45" r="4" fill="#000" />
        </svg>
      </div>
    );
  }

  // Korea/Thailand/Vietnam - tiger cub
  if (languageId === 'ko' || languageId === 'th' || languageId === 'vi') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <circle cx="24" cy="31" r="10" fill="#F59E0B" stroke="#000" strokeWidth="3" />
          <circle cx="76" cy="31" r="10" fill="#F59E0B" stroke="#000" strokeWidth="3" />
          <ellipse cx="50" cy="56" rx="34" ry="31" fill="#FBBF24" stroke="#000" strokeWidth="4" />
          <ellipse cx="50" cy="64" rx="17" ry="11" fill="#FFF7ED" stroke="#000" strokeWidth="3" />
          <path d="M36 45 L31 40 M42 42 L37 37 M64 45 L69 40 M58 42 L63 37" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <circle cx="37" cy="54" r="4" fill="#111" />
          <circle cx="63" cy="54" r="4" fill="#111" />
          <ellipse cx="50" cy="59" rx="6" ry="4" fill="#111" />
          <path d="M44 67 Q50 72 56 67" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  // Russia/Ukraine/Poland - brown bear
  if (languageId === 'ru' || languageId === 'uk' || languageId === 'pl') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <circle cx="22" cy="29" r="11" fill="#7C3F1B" stroke="#000" strokeWidth="3" />
          <circle cx="78" cy="29" r="11" fill="#7C3F1B" stroke="#000" strokeWidth="3" />
          <ellipse cx="50" cy="57" rx="34" ry="31" fill="#8B5A2B" stroke="#000" strokeWidth="4" />
          <ellipse cx="50" cy="63" rx="18" ry="12" fill="#E8D0B8" stroke="#000" strokeWidth="3" />
          <circle cx="38" cy="53" r="4" fill="#111" />
          <circle cx="62" cy="53" r="4" fill="#111" />
          <ellipse cx="50" cy="58" rx="6" ry="4" fill="#111" />
          <path d="M44 66 Q50 70 56 66" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  // English/French/German/Italian/Arabic/Hindi fallback group - owl
  if (languageId === 'en' || languageId === 'fr' || languageId === 'de' || languageId === 'it' || languageId === 'ar' || languageId === 'hi') {
    return (
      <div className={`relative ${floatClass} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <path d="M30 32 L42 18 L50 30 L58 18 L70 32" fill="#9CA3AF" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="50" cy="58" rx="30" ry="34" fill="#9CA3AF" stroke="#000" strokeWidth="4" />
          <circle cx="40" cy="53" r="10" fill="#FFF" stroke="#000" strokeWidth="3" />
          <circle cx="60" cy="53" r="10" fill="#FFF" stroke="#000" strokeWidth="3" />
          <circle cx="40" cy="53" r="4" fill="#111" />
          <circle cx="60" cy="53" r="4" fill="#111" />
          <path d="M50 58 L45 66 L55 66 Z" fill="#F59E0B" stroke="#000" strokeWidth="2" />
          <path d="M42 77 Q50 82 58 77" stroke="#111" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }

  // Legacy ID fallback
  if (languageId === 'spanish' || languageId === 'japanese' || languageId === 'chinese') {
    return <MascotRenderer languageId={languageId === 'spanish' ? 'es' : languageId === 'japanese' ? 'ja' : 'zh_tw'} mood={mood} className={className} animated={animated} />;
  }

  return (
    <div className={`relative ${floatClass} ${className}`}>
      <div className="w-full h-full rounded-full border-4 border-black bg-white text-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0_#000]">
        ?
      </div>
    </div>
  );
}