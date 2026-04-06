import React from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { getAllLanguages } from '../constants/languages';

export default function LanguagePairSelector({ 
  isOpen, 
  onClose, 
  sourceLang, 
  targetLang, 
  onSelect 
}) {
  const [tempSource, setTempSource] = React.useState(sourceLang);
  const [tempTarget, setTempTarget] = React.useState(targetLang);
  const languages = getAllLanguages();

  const handleConfirm = () => {
    onSelect({ source: tempSource, target: tempTarget });
    onClose();
  };

  const handleSwap = () => {
    const temp = tempSource;
    setTempSource(tempTarget);
    setTempTarget(temp);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end">
      <div className="w-full max-w-[400px] mx-auto bg-[#1E1E2A] rounded-t-[2rem] border-t-4 border-l-4 border-r-4 border-black shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-4 border-black">
          <h2 className="text-2xl font-black text-white">Translation Pair</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-[#2A2A3B] border-3 border-black rounded-lg flex items-center justify-center hover:bg-[#3A3A4B] transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <div className="space-y-4">
            {/* Source Language Section */}
            <div>
              <label className="text-xs font-black text-[#00FF87] uppercase tracking-widest mb-3 block">From Language</label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={`source-${lang.id}`}
                    onClick={() => setTempSource(lang.id)}
                    className={`p-3 rounded-xl border-3 transition-all text-left flex flex-col items-start gap-1 ${
                      tempSource === lang.id
                        ? 'border-[#00FF87] bg-[#00FF87]/10'
                        : 'border-[#2A2A3E] hover:border-[#3A3A4E] bg-[#2A2A3B]'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs font-bold text-white">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center py-2">
              <button
                onClick={handleSwap}
                className="p-3 bg-[#3A3A4E] hover:bg-[#4A4A5E] border-3 border-black rounded-full shadow-[2px_2px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                title="Swap languages"
              >
                <ArrowRightLeft size={20} strokeWidth={3} className="text-[#00FF87]" />
              </button>
            </div>

            {/* Target Language Section */}
            <div>
              <label className="text-xs font-black text-[#FFD100] uppercase tracking-widest mb-3 block">To Language</label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={`target-${lang.id}`}
                    onClick={() => setTempTarget(lang.id)}
                    className={`p-3 rounded-xl border-3 transition-all text-left flex flex-col items-start gap-1 ${
                      tempTarget === lang.id
                        ? 'border-[#FFD100] bg-[#FFD100]/10'
                        : 'border-[#2A2A3E] hover:border-[#3A3A4E] bg-[#2A2A3B]'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs font-bold text-white">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-4 border-black flex gap-3 bg-[#1E1E2A]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-[#3A3A4E] text-white font-bold rounded-2xl border-3 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 bg-[#00FF87] text-black font-bold rounded-2xl border-3 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
