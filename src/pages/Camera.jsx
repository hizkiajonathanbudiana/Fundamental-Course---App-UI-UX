// import React from 'react';
// import { ChevronLeft, Image as ImageIcon, ScanLine, Zap } from 'lucide-react';

// export default function Camera({ onNavigate }) {
//   return (
//     <div className="h-full w-full bg-[#0B0A10] relative flex flex-col">
      
//       {/* Top Bar */}
//       <div className="absolute top-0 w-full p-6 pt-8 flex justify-between items-center z-10 gap-4">
//         <button 
//           onClick={() => onNavigate('home')} 
//           className="bg-[#1E1E2A] w-14 h-14 flex-none border-4 border-black rounded-2xl text-white flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
//         >
//           <ChevronLeft size={32} strokeWidth={3} />
//         </button>
        
//         <div className="bg-[#00E5FF] border-4 border-black shadow-[4px_4px_0_#000] px-5 py-3 rounded-2xl text-sm font-black text-black tracking-widest uppercase truncate">
//           Scan Text
//         </div>
        
//         <button className="bg-[#1E1E2A] w-14 h-14 flex-none border-4 border-black rounded-2xl text-[#FFD100] flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//           <Zap size={24} strokeWidth={3} />
//         </button>
//       </div>

//       {/* Viewfinder Area (Simulasi Kamera) */}
//       <div className="flex-1 flex items-center justify-center relative bg-[#1E1E2A]/50 overflow-hidden">
//         {/* Efek grid background biar kerasa kayak UI mesin */}
//         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#4B4B5A 2px, transparent 2px)', backgroundSize: '30px 30px', opacity: 0.3 }}></div>
        
//         {/* Kotak Fokus (Scanner) */}
//         <div className="w-[85%] h-[55%] border-8 border-dashed border-[#00FF87] rounded-[3rem] relative bg-[#00FF87]/10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,255,135,0.2)] z-10">
//           <ScanLine size={80} className="text-[#00FF87] animate-pulse mb-4" strokeWidth={3} />
//           <p className="text-[#00FF87] font-black tracking-widest uppercase text-sm px-4 py-2 bg-black border-2 border-[#00FF87] rounded-xl">Align Text Here</p>
//         </div>
//       </div>

//       {/* Bottom Controls */}
//       <div className="h-44 bg-[#1E1E2A] border-t-4 border-black flex items-center justify-around pb-8 px-6 rounded-t-[3rem] relative -mt-8 z-20">
        
//         {/* Gallery Button */}
//         <button className="w-16 h-16 flex-none bg-[#2A2A3B] border-4 border-black rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all hover:bg-[#00E5FF] hover:text-black">
//           <ImageIcon size={32} strokeWidth={2.5}/>
//         </button>
        
//         {/* Massive Shutter Button -> Arahkan ke Loading */}
//         <button 
//           onClick={() => onNavigate('loading')} 
//           className="w-24 h-24 flex-none rounded-full border-4 border-black shadow-[6px_6px_0_#000] bg-[#00FF87] flex items-center justify-center active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all group"
//         >
//           <div className="w-16 h-16 bg-white rounded-full border-4 border-black group-active:scale-90 transition-transform"></div>
//         </button>
        
//         <div className="w-16 h-16 flex-none"></div> {/* Spacer buat seimbangin posisi tombol shutter */}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { ChevronLeft, Globe2, Image as ImageIcon, ScanLine, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import LanguagePairSelector from '../components/LanguagePairSelector';

export default function Camera({ onNavigate, lang }) {
  const { translationSourceLang, translationTargetLang, updateTranslationPair, uiStrings } = useAppContext();
  const [showSelector, setShowSelector] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);

  const handleLanguageSelect = ({ source, target }) => {
    updateTranslationPair(source, target);
  };
  return (
    <div className="h-full w-full bg-[#1E1E2A] relative flex flex-col">
      
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-6 pt-10 flex justify-between items-center z-10 gap-4">
        <button 
          onClick={() => onNavigate('home')} 
          className="bg-[#2A2A3B] w-14 h-14 flex-none border-4 border-black rounded-2xl text-white flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </button>
        
        <div 
          className="border-4 border-black shadow-[4px_4px_0_#000] px-5 py-3 rounded-2xl text-sm font-black text-black tracking-widest uppercase truncate"
          style={{ backgroundColor: lang.primaryColor }}
        >
          {uiStrings.scan}
        </div>
        
        <button
          onClick={() => setShowSelector(true)}
          className="bg-[#2A2A3B] w-14 h-14 flex-none border-4 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all hover:bg-[#3A3A4B]"
          title="Change translation language"
          style={{ color: lang.secondaryColor }}
        >
          <Globe2 size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 flex items-center justify-center relative bg-[#0B0A10]/50 overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#4B4B5A 2px, transparent 2px)', backgroundSize: '30px 30px', opacity: 0.3 }}></div>

        {isFlashOn && (
          <div className="absolute inset-0 bg-white/10 pointer-events-none z-[1]"></div>
        )}
        
        {/* Scanner Box */}
        <div 
          className="w-[80%] h-[50%] border-8 border-dashed rounded-[3rem] relative flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] z-10"
          style={{ borderColor: lang.primaryColor, backgroundColor: `${lang.primaryColor}15` }}
        >
          <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-black bg-white border-2 border-black px-2 py-1 rounded-lg">
            {isFlashOn ? 'Flash On' : 'Flash Off'}
          </span>
          <ScanLine size={80} className="animate-pulse mb-4" strokeWidth={3} color={lang.primaryColor} />
          <p className="font-black tracking-widest uppercase text-sm px-4 py-2 bg-black text-white border-4 border-black rounded-xl" style={{ borderColor: lang.primaryColor }}>
            {uiStrings.scan} {lang.name}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="h-44 bg-[#2A2A3B] border-t-4 border-black flex items-center justify-around pb-8 px-6 rounded-t-[3rem] relative -mt-8 z-20">
        
        <button className="w-16 h-16 flex-none bg-[#1E1E2A] border-4 border-black rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all hover:text-black hover:bg-white">
          <ImageIcon size={32} strokeWidth={2.5}/>
        </button>
        
        {/* Shutter Button */}
        <button 
          onClick={() => onNavigate('loading')} 
          className="w-24 h-24 flex-none rounded-full border-4 border-black shadow-[6px_6px_0_#000] flex items-center justify-center active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all group"
          style={{ backgroundColor: lang.primaryColor }}
        >
          <div className="w-12 h-12 bg-black rounded-full group-active:scale-90 transition-transform"></div>
        </button>
        
        <button
          onClick={() => setIsFlashOn((prev) => !prev)}
          className="w-16 h-16 flex-none border-4 border-black rounded-2xl flex items-center justify-center text-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          style={{ backgroundColor: isFlashOn ? '#FFD100' : '#FFFFFF' }}
          title={isFlashOn ? 'Turn flash off' : 'Turn flash on'}
        >
          <Zap size={26} strokeWidth={3} fill={isFlashOn ? '#000' : 'none'} />
        </button>
      </div>

      {/* Language Pair Selector Modal */}
      <LanguagePairSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        sourceLang={translationSourceLang}
        targetLang={translationTargetLang}
        onSelect={handleLanguageSelect}
      />
    </div>
  );
}
