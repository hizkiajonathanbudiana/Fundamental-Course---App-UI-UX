// import React from 'react';
// import { ChevronLeft, Bookmark } from 'lucide-react';

// export default function SavedWords({ onNavigate }) {
//   return (
//     <div className="h-full w-full flex flex-col bg-[#1E1E2A]">
       
//        {/* Header */}
//        <div className="p-5 pt-8 flex items-center bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 gap-4">
//         <button onClick={() => onNavigate('home')} className="w-12 h-12 flex-none bg-[#1E1E2A] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//           <ChevronLeft size={28} strokeWidth={3} />
//         </button>
//         <h1 className="text-2xl font-black text-white uppercase tracking-wider truncate">Word Vault</h1>
//       </div>

//       {/* List */}
//       <div className="flex-1 p-6 space-y-6">
//          <div className="bg-white border-4 border-black p-5 rounded-[1.5rem] flex justify-between items-center gap-4 shadow-[6px_6px_0_#000]">
//             <div className="min-w-0">
//               <div className="flex items-center gap-4 mb-3">
//                 <span className="text-4xl font-black font-serif text-black flex-none">載具</span>
//                 <span className="text-white bg-[#FF426A] border-2 border-black text-xs font-black px-2 py-1 rounded-lg truncate uppercase tracking-widest">zàijù</span>
//               </div>
//               <p className="text-[#4B4B5A] font-bold text-base truncate">Digital Receipt</p>
//             </div>
//             <button className="w-16 h-16 flex-none rounded-2xl bg-[#FFD100] border-4 border-black shadow-[4px_4px_0_#000] text-black flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//               <Bookmark size={32} strokeWidth={3} fill="#000" />
//             </button>
//           </div>
//       </div>

//     </div>
//   );
// }

import React from 'react';
import { ChevronLeft, Bookmark, MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LANGUAGES } from '../constants/languages';

export default function SavedWords({ onNavigate, lang }) {
  const { savedWords, toggleSavedWord } = useAppContext();

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A]">
       <div className="p-5 pt-8 flex items-center bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 gap-4 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('home')} className="w-12 h-12 flex-none bg-[#1E1E2A] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider truncate">Word Vault</h1>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto pb-28">
        {savedWords.length === 0 && (
          <div className="bg-white border-4 border-black p-6 rounded-[1.5rem] shadow-[6px_6px_0_#000]">
            <p className="text-black font-black text-lg mb-2">No saved words yet.</p>
            <p className="text-[#4B4B5A] font-bold text-sm mb-4">Tap any chat bubble in Chatbot and bookmark words from the meaning breakdown.</p>
            <button
              onClick={() => onNavigate('chatbot')}
              className="h-12 px-4 rounded-xl border-4 border-black bg-[#FFD100] text-black font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <MessageCircle size={18} strokeWidth={3} /> Go to Chatbot
            </button>
          </div>
        )}

        {savedWords.map((word, index) => {
          const wordLang = LANGUAGES[word.languageId] || lang;

          return (
            <div key={`${word.token}-${word.languageId}-${index}`} className="bg-white border-4 border-black p-5 rounded-[1.5rem] flex justify-between items-center gap-4 transition-all shadow-[6px_6px_0_#000]">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-black font-serif text-black flex-none">{word.token}</span>
                  <span className="text-white border-2 border-black text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest" style={{ backgroundColor: wordLang.primaryColor }}>
                    {word.pinyin || '-'}
                  </span>
                </div>
                <p className="text-[#4B4B5A] font-bold text-sm mb-1 truncate">{word.meaning}</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#6B7280] truncate">
                  {word.flag || wordLang.flag} {word.languageName || wordLang.name}
                </p>
              </div>
              <button
                onClick={() => toggleSavedWord(word)}
                className="w-14 h-14 flex-none rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] text-black flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                style={{ backgroundColor: wordLang.secondaryColor }}
                title="Remove from saved"
              >
                <Bookmark size={26} strokeWidth={3} fill="#000" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}