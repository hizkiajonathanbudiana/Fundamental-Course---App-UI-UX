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

import React, { useEffect } from 'react';
import MascotRenderer from '../components/MascotRenderer';

export default function Loading({ onNavigate, lang }) {
  
  // Simulasi proses AI 2.5 detik
  useEffect(() => {
    const timer = setTimeout(() => onNavigate('result'), 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="h-full w-full p-6 flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: lang.secondaryColor }}>
      
      {/* Background polka dots */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 4px, transparent 4px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Dynamic Mascot Loading */}
        <MascotRenderer languageId={lang.id} mood="focused" className="w-48 h-48 mb-10 drop-shadow-[8px_8px_0_rgba(0,0,0,0.3)]" animated={true} />
        
        <h2 className="text-3xl font-black text-black tracking-widest uppercase text-center px-6 py-4 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0_#000] animate-pulse">
          Translating...
        </h2>
      </div>
    </div>
  );
}