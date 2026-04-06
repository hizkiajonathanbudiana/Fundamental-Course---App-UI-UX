// import React from 'react';
// import { ChevronLeft, BookA, CheckSquare, LayoutGrid, LayoutTemplate, Headphones } from 'lucide-react';

// export default function Subtopics({ onNavigate, topic }) {
//   const games = [
//     { name: "Vocabulary", icon: <BookA size={36} className="text-black" />, bg: "bg-[#00E5FF]" },
//     { name: "Match Phrase", icon: <CheckSquare size={36} className="text-black" />, bg: "bg-[#FF426A]" },
//     { name: "Audio Quiz", icon: <Headphones size={36} className="text-black" />, bg: "bg-[#FFD100]" },
//     { name: "Context Match", icon: <LayoutTemplate size={36} className="text-black" />, bg: "bg-[#00FF87]" },
//   ];

//   return (
//     <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative">
      
//       {/* Header */}
//       <div className="p-5 pt-8 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black z-10">
//         <button onClick={() => onNavigate('topics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//           <ChevronLeft size={28} strokeWidth={3} />
//         </button>
//         <h1 className="flex-1 text-2xl font-black text-white uppercase tracking-widest truncate">{topic || "Travel"}</h1>
//       </div>

//       <div className="flex-1 overflow-y-auto pb-32">
        
//         {/* Scenarios Horizontal Scroll */}
//         <div className="py-6 border-b-4 border-black bg-[#2A2A3B]">
//           <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-4">Select Scenario</h2>
//           <div className="flex overflow-x-auto px-6 gap-4 pb-4 scrollbar-hide">
//             {["Asking Directions", "Buying Tickets", "Taking the Train"].map((sub, i) => (
//               <div key={i} className="flex items-center gap-3 p-4 bg-[#1E1E2A] rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:bg-[#323246] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex-none min-w-[200px]">
//                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-black border-2 border-black">{i+1}</div>
//                 <span className="font-black text-white uppercase tracking-wide text-xs">{sub}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Exercises Grid */}
//         <div className="py-6">
//           <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-6">Exercises</h2>
//           <div className="grid grid-cols-2 gap-6 px-6">
//             {games.map((game, i) => (
//               <div key={i} onClick={() => onNavigate('gameplay', { game: game.name })} className="flex flex-col items-center gap-4 cursor-pointer group">
//                 <div className={`w-[100px] h-[100px] flex-none ${game.bg} rounded-3xl flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] group-active:translate-x-[6px] group-active:translate-y-[6px] group-active:shadow-none transition-all`}>
//                   {game.icon}
//                 </div>
//                 <span className="text-xs text-center text-white font-black uppercase tracking-wider leading-tight bg-[#2A2A3B] px-3 py-2 rounded-xl border-2 border-black">
//                   {game.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Floating Start Button */}
//       <div className="absolute bottom-8 left-6 right-6 z-30">
//         <button 
//           onClick={() => onNavigate('gameplay', { game: 'Quick Play' })}
//           className="w-full h-16 flex-none bg-[#00FF87] rounded-2xl flex items-center justify-center text-black font-black text-xl tracking-widest uppercase border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
//         >
//           START LESSON
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { ChevronLeft, BookA, CheckSquare, LayoutTemplate, Headphones } from 'lucide-react';

export default function Subtopics({ onNavigate, topic, lang }) {
  const games = [
    { name: "Vocabulary", icon: <BookA size={36} className="text-black" /> },
    { name: "Match Phrase", icon: <CheckSquare size={36} className="text-black" /> },
    { name: "Audio Quiz", icon: <Headphones size={36} className="text-black" /> },
    { name: "Context Match", icon: <LayoutTemplate size={36} className="text-black" /> },
  ];

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative">
      
      {/* Header */}
      <div className="p-5 pt-10 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black z-10 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('topics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="flex-1 text-2xl font-black text-white uppercase tracking-widest truncate">{topic || "Travel"}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        
        {/* Scenarios Horizontal Scroll */}
        <div className="py-6 border-b-4 border-black bg-[#2A2A3B]">
          <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-4">Select Scenario</h2>
          <div className="flex overflow-x-auto px-6 gap-4 pb-4 scrollbar-hide">
            {["Asking Directions", "Buying Tickets", "Taking the Train"].map((sub, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#1E1E2A] rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:bg-[#323246] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex-none min-w-[200px]">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-black border-4 border-black">{i+1}</div>
                <span className="font-black text-white uppercase tracking-wide text-xs">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="py-6">
          <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-6">Exercises</h2>
          <div className="grid grid-cols-2 gap-6 px-6">
            {games.map((game, i) => (
              <div key={i} onClick={() => onNavigate('gameplay', { game: game.name })} className="flex flex-col items-center gap-4 cursor-pointer group">
                <div 
                  className={`w-[100px] h-[100px] flex-none rounded-3xl flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] group-active:translate-x-[6px] group-active:translate-y-[6px] group-active:shadow-none transition-all`}
                  style={{ backgroundColor: i % 2 === 0 ? lang.primaryColor : lang.secondaryColor }}
                >
                  {game.icon}
                </div>
                <span className="text-xs text-center text-white font-black uppercase tracking-wider leading-tight bg-[#2A2A3B] px-3 py-2 rounded-xl border-4 border-black shadow-[4px_4px_0_#000]">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Start Button (Dynamic Color) */}
      <div className="absolute bottom-8 left-6 right-6 z-30">
        <button 
          onClick={() => onNavigate('gameplay', { game: 'Quick Play' })}
          className="w-full h-16 flex-none rounded-2xl flex items-center justify-center text-black font-black text-xl tracking-widest uppercase border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
          style={{ backgroundColor: lang.primaryColor }}
        >
          START LESSON
        </button>
      </div>
    </div>
  );
}