// import React, { useEffect } from 'react';
// import MomoMascot from '../components/MomoMascot'; // Pastikan path import sesuai!

// export default function Loading({ onNavigate }) {

//   // Simulasi proses loading AI selama 2.5 detik, terus pindah ke Result
//   useEffect(() => {
//     const timer = setTimeout(() => onNavigate('result'), 2500);
//     return () => clearTimeout(timer);
//   }, [onNavigate]);

//   return (
//     <div className="h-full w-full p-6 flex flex-col justify-center items-center bg-[#FFD100] relative overflow-hidden">
//       {/* Background motif polka dot ala komik */}
//       <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e5b400 4px, transparent 4px)', backgroundSize: '40px 40px', opacity: 0.4 }}></div>

//       <div className="relative z-10 flex flex-col items-center">
//         {/* Animated Momo */}
//         <MomoMascot mood="excited" className="w-48 h-48 mb-10 drop-shadow-[8px_8px_0_rgba(0,0,0,0.2)]" animated={true} />

//         {/* Chunky Loading Text */}
//         <h2 className="text-3xl font-black text-white tracking-widest uppercase text-center px-6 py-4 bg-black border-4 border-black rounded-2xl shadow-[6px_6px_0_#A25BFF] animate-pulse">
//           Translating...
//         </h2>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import MascotRenderer from '../components/MascotRenderer';

export default function Loading({ onNavigate, lang }) {
  const [progress, setProgress] = useState(0);

  // Simulasi proses AI 2.5 detik dengan progress
  useEffect(() => {
    const totalMs = 2500;
    const tickMs = 50;
    const maxStep = Math.ceil(totalMs / tickMs);
    let step = 0;

    const interval = setInterval(() => {
      step += 1;
      const next = Math.min(100, Math.round((step / maxStep) * 100));
      setProgress(next);

      if (next >= 100) {
        clearInterval(interval);
        onNavigate('result');
      }
    }, tickMs);

    return () => clearInterval(interval);
  }, [onNavigate]);

  const bgColor = lang?.secondaryColor || '#FFD100';
  const languageId = lang?.id || 'english';

  return (
    <div className="h-full w-full p-6 flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <button
        onClick={() => onNavigate('camera')}
        className="absolute top-6 left-6 z-20 w-12 h-12 bg-white border-4 border-black rounded-2xl flex items-center justify-center text-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        <ChevronLeft size={22} strokeWidth={3} />
      </button>

      {/* Background polka dots */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 4px, transparent 4px)', backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm">
        {/* Dynamic Mascot Loading */}
        <MascotRenderer languageId={languageId} mood="focused" className="w-44 h-44 mb-8 drop-shadow-[8px_8px_0_rgba(0,0,0,0.25)]" animated={true} />

        <div className="w-full bg-white border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0_#000]">
          <h2 className="text-2xl font-black text-black tracking-widest uppercase text-center animate-pulse">
            Translating...
          </h2>
          <p className="text-center text-xs mt-1 font-bold text-[#3B3B4D]">AI is analyzing text & context</p>

          <div className="mt-4 h-4 w-full bg-[#E9E9F4] border-4 border-black rounded-xl overflow-hidden">
            <div className="h-full bg-[#00E5FF] transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-right mt-2 text-xs font-black text-black">{progress}%</p>
        </div>
      </div>
    </div>
  );
}