// import React, { useState } from 'react';
// import { ChevronLeft, X, Undo2, PenTool } from 'lucide-react';

// export default function Search({ onNavigate }) {
//   const [query, setQuery] = useState('');

//   return (
//     <div className="h-full w-full bg-[#1E1E2A] flex flex-col font-sans relative">
      
//       {/* Top Bar - Search Input */}
//       <div className="flex items-center bg-[#2A2A3B] p-4 pt-8 gap-3 border-b-4 border-black z-20">
//         <button 
//           onClick={() => onNavigate('home')} 
//           className="bg-[#1E1E2A] w-14 h-14 flex-none rounded-2xl flex items-center justify-center text-white font-bold border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
//         >
//           <ChevronLeft size={32} strokeWidth={3} />
//         </button>
        
//         <div className="flex-1 relative min-w-0">
//           <input 
//             autoFocus 
//             value={query} 
//             onChange={(e) => setQuery(e.target.value)}
//             type="text" 
//             placeholder="Search or Draw..." 
//             className="w-full bg-[#1E1E2A] text-white font-black text-lg rounded-2xl py-3 px-4 focus:outline-none border-4 border-black focus:border-[#00E5FF] shadow-inner transition-colors placeholder:text-[#7A7A9A]"
//           />
//         </div>
        
//         <button 
//           onClick={() => setQuery('')} 
//           className="bg-[#FF426A] flex-none text-white font-black w-14 h-14 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
//         >
//           <X size={28} strokeWidth={4} />
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex bg-[#2A2A3B] text-white font-black text-xs uppercase tracking-widest border-b-4 border-black z-10">
//         <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] active:bg-[#1E1E2A] transition-colors">History</button>
//         <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] active:bg-[#1E1E2A] transition-colors">Radical</button>
//         <button className="flex-1 py-4 text-black bg-[#00E5FF] border-b-4 border-black flex justify-center items-center gap-2">
//           <PenTool size={16} strokeWidth={3} /> Canvas
//         </button>
//       </div>

//       {/* Canvas Area (Drawing Interface) */}
//       <div className="flex-1 relative flex items-center justify-center bg-[#1E1E2A] p-6">
        
//         <div className="w-full h-full border-4 border-dashed border-[#7A7A9A] bg-[#2A2A3B] rounded-[3rem] relative overflow-hidden flex items-center justify-center shadow-inner">
          
//           {/* Chinese Grid Guide (Mi Zi Ge / 米字格) */}
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
//             <div className="w-full h-1 bg-[#7A7A9A] absolute"></div>
//             <div className="h-full w-1 bg-[#7A7A9A] absolute"></div>
//             <div className="w-[150%] h-1 bg-[#7A7A9A] absolute rotate-45"></div>
//             <div className="w-[150%] h-1 bg-[#7A7A9A] absolute -rotate-45"></div>
//             {/* Outer Box */}
//             <div className="absolute inset-8 border-4 border-[#7A7A9A] rounded-3xl"></div>
//           </div>

//           <div className="text-center text-[#7A7A9A] font-black uppercase tracking-widest px-6 relative z-10">
//             Draw Character<br/>With Your Finger
//           </div>
          
//         </div>
//       </div>

//       {/* Bottom Bar - Results & Actions */}
//       <div className="bg-[#2A2A3B] p-5 flex justify-between items-center border-t-4 border-black pb-8 gap-4 z-20">
        
//         {/* Mockup Detected Character */}
//         <div className="bg-[#1E1E2A] border-4 border-black px-6 py-2 rounded-2xl shadow-inner">
//           <span className="text-5xl text-white font-serif tracking-widest">總</span>
//         </div>
        
//         <div className="flex gap-3">
//           <button className="bg-[#FFD100] text-black w-16 h-16 flex-none rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//             <Undo2 size={28} strokeWidth={3} />
//           </button>
          
//           <button 
//             onClick={() => onNavigate('home')} 
//             className="bg-[#00FF87] text-black px-8 h-16 rounded-2xl font-black text-xl border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-widest"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { ChevronLeft, X, Undo2, PenTool } from 'lucide-react';

export default function Search({ onNavigate, lang }) {
  const [query, setQuery] = useState('');

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col font-sans relative">
      <div className="flex items-center bg-[#2A2A3B] p-4 pt-8 gap-3 border-b-4 border-black z-20 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('home')} className="bg-[#1E1E2A] w-12 h-12 flex-none rounded-2xl flex items-center justify-center text-white font-bold border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <div className="flex-1 relative min-w-0">
          <input 
            autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
            type="text" placeholder={`Search in ${lang.name}...`} 
            className="w-full bg-white text-black font-black text-base rounded-2xl py-3 px-4 focus:outline-none border-4 border-black shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)] transition-colors placeholder:text-[#7A7A9A]"
          />
        </div>
        <button onClick={() => setQuery('')} className="flex-none text-black font-black w-12 h-12 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all" style={{ backgroundColor: lang.secondaryColor }}>
          <X size={24} strokeWidth={4} />
        </button>
      </div>

      <div className="flex bg-[#2A2A3B] text-white font-black text-xs uppercase tracking-widest border-b-4 border-black">
        <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] transition-colors">History</button>
        <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] transition-colors">Radical</button>
        <button className="flex-1 py-4 text-black border-b-4 border-black" style={{ backgroundColor: lang.primaryColor }}>
          Canvas
        </button>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-[#1E1E2A] p-6">
        <div className="w-full h-full border-4 border-dashed bg-white rounded-[3rem] relative overflow-hidden flex items-center justify-center shadow-[inset_8px_8px_0_rgba(0,0,0,0.05)]" style={{ borderColor: lang.primaryColor }}>
          {/* Guide Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-1 bg-black absolute"></div>
            <div className="h-full w-1 bg-black absolute"></div>
            <div className="absolute inset-6 border-4 border-black rounded-3xl"></div>
          </div>
          <div className="text-center text-[#A1A1AA] font-black uppercase tracking-widest px-6 relative z-10">
            Draw Character<br/>With Your Finger
          </div>
        </div>
      </div>

      <div className="bg-[#2A2A3B] p-5 flex justify-between items-center border-t-4 border-black pb-8 gap-4">
        <div className="bg-white border-4 border-black px-6 py-2 rounded-2xl shadow-[4px_4px_0_#000]">
          <span className="text-4xl text-black font-serif font-black">{lang.id === 'spanish' ? 'A' : '總'}</span>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#1E1E2A] text-white w-14 h-14 flex-none rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
            <Undo2 size={24} strokeWidth={3} />
          </button>
          <button onClick={() => onNavigate('home')} className="text-black px-8 h-14 rounded-2xl font-black text-lg border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide" style={{ backgroundColor: lang.primaryColor }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}