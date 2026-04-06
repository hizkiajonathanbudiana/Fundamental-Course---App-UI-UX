import React, { useState } from 'react';
import { ChevronLeft, Volume2, Bookmark, Mic, Eye, EyeOff, X } from 'lucide-react';

export default function Result({ onNavigate }) {
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // DATA YANG SUDAH DIGABUNG (Compound Words)
  const paragraphData = [
    { word: "請注意", pinyin: "Qǐng zhùyì", meaning: "Please pay attention", isSaved: false },
    { word: "，", pinyin: "", meaning: "", isPunctuation: true },
    { word: "前往", pinyin: "qiánwǎng", meaning: "Heading to", isSaved: true },
    { word: "台北", pinyin: "Táiběi", meaning: "Taipei", isSaved: false },
    { word: "車站", pinyin: "chēzhàn", meaning: "Train Station", isSaved: false },
    { word: "的", pinyin: "de", meaning: "Possessive particle", isSaved: true },
    { word: "乘客", pinyin: "chéngkè", meaning: "Passenger(s)", isSaved: false },
    { word: "，", pinyin: "", meaning: "", isPunctuation: true },
    { word: "請在", pinyin: "qǐng zài", meaning: "Please (wait) at", isSaved: false },
    { word: "第三", pinyin: "dì sān", meaning: "Number three / 3rd", isSaved: false },
    { word: "月台", pinyin: "yuètái", meaning: "Platform", isSaved: true },
    { word: "候車", pinyin: "hòuchē", meaning: "Wait for the train", isSaved: false },
    { word: "。", pinyin: "", meaning: "", isPunctuation: true },
  ];

  const fullTranslation = "Attention please, passengers heading to Taipei Main Station, please wait at platform 3.";

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A] relative">
      
      {/* Header */}
      <div className="p-5 pt-8 flex justify-between items-center bg-[#1E1E2A] border-b-4 border-black gap-4 z-20 shadow-[0_4px_0_#000]">
        <button 
          onClick={() => onNavigate('home')} 
          className="w-12 h-12 flex-none bg-[#2A2A3B] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <span className="text-lg font-black text-white tracking-widest uppercase truncate bg-black px-4 py-2 rounded-xl">Analysis</span>
        <button className="text-black bg-[#00E5FF] border-4 border-black shadow-[4px_4px_0_#000] shrink-0 text-sm font-black flex items-center gap-1 py-3 px-4 rounded-xl uppercase tracking-wider active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          Save All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-8 space-y-6">
        
        {/* Control Toggles (Show Pinyin & Audio) */}
        <div className="flex gap-4">
          <button 
            onClick={() => setShowPinyin(!showPinyin)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] font-black uppercase tracking-widest active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${showPinyin ? 'bg-[#FF426A] text-white' : 'bg-white text-black'}`}
          >
            {showPinyin ? <EyeOff size={20} strokeWidth={3}/> : <Eye size={20} strokeWidth={3}/>}
            Pinyin
          </button>
          
          <button className="w-16 flex-none bg-[#FFD100] border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all rounded-2xl">
            <Volume2 size={24} strokeWidth={3}/>
          </button>
        </div>

        {/* Interactive Reading Canvas - TEXT WRAPPING FIX */}
        <div className="bg-white border-4 border-black rounded-[2rem] p-6 shadow-[8px_8px_0_#000] min-h-[250px]">
          
          {/* Menggunakan flex-wrap biar teksnya turun ke bawah dengan rapi kalau kepanjangan */}
          <div className="flex flex-wrap gap-x-2 gap-y-4 items-end leading-none">
            {paragraphData.map((item, index) => (
              <div 
                key={index} 
                onClick={() => !item.isPunctuation && setSelectedWord(item)}
                className={`flex flex-col items-center justify-end ${item.isPunctuation ? 'pointer-events-none pb-2' : 'cursor-pointer hover:bg-[#00E5FF]/20 rounded-lg px-1 py-1 transition-colors'}`}
              >
                {/* Pinyin Inline (Muncul kalau ditoggle ATAU kalau kata lagi diklik) */}
                <span className={`text-[#A25BFF] font-black text-[11px] sm:text-xs mb-1 transition-opacity whitespace-nowrap ${showPinyin || selectedWord?.word === item.word ? 'opacity-100' : 'opacity-0'}`}>
                  {item.pinyin}
                </span>
                
                {/* Hanzi Word (Digabung) */}
                <span className={`text-3xl sm:text-4xl font-serif font-black tracking-tight ${item.isPunctuation ? 'text-black' : 'text-black'} ${selectedWord?.word === item.word ? 'text-[#FF426A]' : ''}`}>
                  {item.word}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Hidden Translation Block */}
        <div className="bg-[#2A2A3B] border-4 border-black rounded-[2rem] p-6 shadow-[6px_6px_0_#000]">
          {!showTranslation ? (
            <button 
              onClick={() => setShowTranslation(true)}
              className="w-full flex items-center justify-center gap-2 py-4 border-4 border-dashed border-[#7A7A9A] rounded-xl text-[#A1A1AA] font-black uppercase tracking-widest hover:bg-[#323246] hover:border-white hover:text-white transition-all"
            >
              <Eye size={24} strokeWidth={3} /> Show English
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowTranslation(false)}
                className="absolute -top-2 -right-2 text-[#7A7A9A] hover:text-[#FF426A] transition-colors"
              >
                <EyeOff size={24} strokeWidth={3} />
              </button>
              <h3 className="text-[#00FF87] font-black uppercase tracking-widest mb-2 text-sm">Translation</h3>
              <p className="text-white text-lg font-bold leading-relaxed">
                {fullTranslation}
              </p>
            </div>
          )}
        </div>

        {/* Practice Speaking Button */}
        <button className="w-full mt-2 bg-[#00FF87] border-4 border-black text-black font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest">
          <Mic size={28} strokeWidth={3} /> Practice Speaking
        </button>

      </div>

      {/* POPUP MODAL: Compound Word Dictionary */}
      {selectedWord && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-[#0B0A10]/80 backdrop-blur-sm" onClick={() => setSelectedWord(null)}></div>
          
          <div className="bg-white border-4 border-black rounded-[2rem] p-6 w-full relative z-10 shadow-[12px_12px_0_#A25BFF] animate-bop-fast" style={{ animationIterationCount: 1 }}>
            
            <button onClick={() => setSelectedWord(null)} className="absolute top-4 right-4 w-10 h-10 bg-[#FF426A] border-4 border-black rounded-xl flex items-center justify-center text-white shadow-[2px_2px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <X size={20} strokeWidth={4} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <span className="text-[#A25BFF] font-black text-lg uppercase tracking-widest mb-1">{selectedWord.pinyin}</span>
              {/* Ukuran font Hanzi disesuaikan kalau katanya panjang */}
              <span className={`${selectedWord.word.length > 3 ? 'text-5xl' : 'text-6xl'} font-serif font-black text-black mb-4 tracking-widest`}>
                {selectedWord.word}
              </span>
              <span className="text-black font-black text-xl px-4 py-2 border-4 border-black rounded-xl bg-[#00FF87] shadow-[4px_4px_0_#000]">
                {selectedWord.meaning}
              </span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#2A2A3B] border-4 border-black text-white font-black py-4 rounded-xl shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex justify-center items-center gap-2 uppercase tracking-widest">
                <Volume2 size={20} strokeWidth={3} /> Audio
              </button>
              <button className={`w-16 flex-none border-4 border-black rounded-xl shadow-[4px_4px_0_#000] flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${selectedWord.isSaved ? 'bg-[#FFD100] text-black' : 'bg-white text-black'}`}>
                <Bookmark size={24} strokeWidth={3} fill={selectedWord.isSaved ? "#000" : "none"} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}