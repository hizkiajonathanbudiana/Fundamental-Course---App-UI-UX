// import React from 'react';
// import { X, Volume2 } from 'lucide-react';

// export default function GamePlay({ onNavigate, game }) {
//   return (
//     <div className="h-full w-full bg-[#1E1E2A] flex flex-col">
      
//       {/* Top Header with Progress Bar */}
//       <div className="p-5 pt-8 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black z-10">
//         <button onClick={() => onNavigate('subtopics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//           <X size={28} strokeWidth={3} />
//         </button>
//         {/* Chunky Progress Bar */}
//         <div className="flex-1 h-6 bg-[#2A2A3B] rounded-full border-4 border-black overflow-hidden p-0.5">
//           <div className="w-1/3 h-full bg-[#00FF87] rounded-full border-r-2 border-black"></div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        
//         {/* Game Mode Title */}
//         <h2 className="text-3xl font-black text-[#00E5FF] mb-2 uppercase tracking-widest" style={{ WebkitTextStroke: '1px black' }}>
//           {game || "Practice"}
//         </h2>
//         <p className="text-white font-bold mb-10 text-sm uppercase tracking-widest bg-[#2A2A3B] px-4 py-2 rounded-xl border-2 border-black">
//           Select meaning
//         </p>
        
//         {/* Target Word Card */}
//         <div className="w-full bg-[#2A2A3B] border-4 border-black rounded-[3rem] p-10 mb-10 relative shadow-[8px_8px_0_#000]">
//           <p className="text-7xl font-serif text-white mb-8 tracking-widest">車站</p>
          
//           {/* Audio Button Overlapping */}
//           <button className="mx-auto w-16 h-16 flex-none rounded-full bg-[#FF426A] border-4 border-black text-white flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all absolute -bottom-8 left-1/2 -translate-x-1/2">
//             <Volume2 size={32} strokeWidth={3} />
//           </button>
//         </div>

//         {/* Answer Options */}
//         <button className="w-full mt-4 bg-white text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] hover:bg-[#00E5FF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest">
//           Train Station
//         </button>
//         <button className="w-full mt-4 bg-white text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] hover:bg-[#00E5FF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest">
//           Airport
//         </button>

//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { X, Volume2 } from 'lucide-react';

export default function GamePlay({ onNavigate, game, lang }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Kata dinamis berdasarkan bahasa yang dipilih
  const targetWord = lang.demoWord.split(' ')[0]; // Ambil kata utamanya aja

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col">
      
      {/* Top Header with Progress Bar */}
      <div className="p-5 pt-10 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black z-10 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('subtopics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <X size={28} strokeWidth={3} />
        </button>
        {/* Chunky Progress Bar (Dynamic Color) */}
        <div className="flex-1 h-6 bg-[#2A2A3B] rounded-full border-4 border-black overflow-hidden p-0.5">
          <div className="w-1/3 h-full rounded-full border-r-4 border-black" style={{ backgroundColor: lang.primaryColor }}></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        
        {/* Game Mode Title */}
        <h2 className="text-3xl font-black mb-2 uppercase tracking-widest" style={{ color: lang.primaryColor, WebkitTextStroke: '1px black' }}>
          {game || "Practice"}
        </h2>
        <p className="text-white font-bold mb-10 text-sm uppercase tracking-widest bg-[#2A2A3B] px-4 py-2 rounded-xl border-4 border-black shadow-[4px_4px_0_#000]">
          Select meaning
        </p>
        
        {/* Target Word Card */}
        <div className="w-full bg-white border-4 border-black rounded-[3rem] p-10 mb-10 relative shadow-[8px_8px_0_#000]">
          <p className={`${targetWord.length > 5 ? 'text-5xl' : 'text-7xl'} font-serif text-black font-black mb-8 tracking-widest`}>
            {targetWord}
          </p>
          
          {/* Audio Button Overlapping */}
          <button 
            className="mx-auto w-16 h-16 flex-none rounded-full border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all absolute -bottom-8 left-1/2 -translate-x-1/2"
            style={{ backgroundColor: lang.secondaryColor }}
          >
            <Volume2 size={32} strokeWidth={3} />
          </button>
        </div>

        {/* Answer Options */}
        <button 
          onClick={() => setSelectedOption(1)}
          className="w-full mt-4 text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest"
          style={{ backgroundColor: selectedOption === 1 ? lang.primaryColor : 'white' }}
        >
          Train Station
        </button>
        <button 
          onClick={() => setSelectedOption(2)}
          className="w-full mt-4 text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest"
          style={{ backgroundColor: selectedOption === 2 ? lang.primaryColor : 'white' }}
        >
          Airport
        </button>

      </div>
    </div>
  );
}