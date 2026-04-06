import React from 'react';
import { Globe2, ChevronRight, Check } from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

export default function CourseSelector({ onSelect, activeLangId }) {
  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col p-6 overflow-y-auto">
      <div className="mt-12 mb-8 text-center">
        <div className="w-20 h-20 bg-[#2A2A3B] rounded-3xl border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center mx-auto mb-6">
          <Globe2 size={40} className="text-[#00E5FF]" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2">Choose Course</h1>
        <p className="text-[#A1A1AA] font-bold">What do you want to learn today?</p>
      </div>

      <div className="space-y-4 flex-1">
        {Object.values(LANGUAGES).map((lang) => (
          <button 
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className={`w-full p-4 rounded-2xl border-4 border-black flex items-center gap-4 transition-all shadow-[6px_6px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${activeLangId === lang.id ? 'bg-white text-black' : 'bg-[#2A2A3B] text-white hover:bg-[#323246]'}`}
          >
            <span className="text-4xl flex-none">{lang.flag}</span>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-black text-xl uppercase tracking-wider truncate">{lang.name}</h3>
              <p className={`font-bold text-sm truncate ${activeLangId === lang.id ? 'text-[#7A7A9A]' : 'text-[#A1A1AA]'}`}>Guide: {lang.mascotName}</p>
            </div>
            {activeLangId === lang.id ? (
              <div className="w-8 h-8 rounded-full bg-[#00FF87] border-2 border-black flex items-center justify-center flex-none">
                <Check size={16} strokeWidth={4} className="text-black" />
              </div>
            ) : (
              <ChevronRight size={24} className="text-[#7A7A9A] flex-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}