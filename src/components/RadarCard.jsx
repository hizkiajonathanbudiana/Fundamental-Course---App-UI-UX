import React, { useState } from 'react';
import MascotRenderer from './MascotRenderer';
import { LANGUAGES } from '../constants/languages';

function FlagBadge({ language, size = 'sm' }) {
  const [imageError, setImageError] = useState(false);
  const countryCode = language?.code?.split('-')?.[1]?.toLowerCase();
  const sizeClass = size === 'lg' ? 'w-6 h-6 text-sm' : 'w-4 h-4 text-[10px]';

  return (
    <span className={`${sizeClass} rounded-full bg-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0_#000] overflow-hidden`}>
      {countryCode && !imageError ? (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${language?.name || 'Language'} flag`}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="leading-none">{language?.flag || '🏳️'}</span>
      )}
    </span>
  );
}

export default function RadarCard({ lang, learningLang, nativeLang, nearbyLearners, radarLabel = 'Live Radar', subtitle = null, onClick = null }) {
  const activeLearningLang = learningLang || lang;
  const activeNativeLang = nativeLang || lang;
  const isClickable = typeof onClick === 'function';
  const maxRangeKm = Math.max(...nearbyLearners.map((item) => item.distanceKm || 0), 0);

  return (
    <div
      onClick={onClick || undefined}
      className={`mb-6 w-full bg-[#2A2A3B] border-4 border-black shadow-[8px_8px_0_#000] rounded-[2rem] p-4 relative overflow-hidden transition-all ${isClickable ? 'cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none' : ''}`}
    >
      <div className="flex justify-between items-center mb-2 relative z-10">
        <span className="bg-white text-black font-black text-[10px] px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse"></span> {radarLabel}
        </span>
        <span className="text-white font-bold text-xs bg-black/50 px-2 py-1 rounded-lg border border-black backdrop-blur-sm">
          {subtitle || `${nearbyLearners.length} Learners Nearby`}
        </span>
      </div>

      <div className="relative z-10 mb-1">
        <span className="inline-flex text-[10px] font-black uppercase tracking-widest text-white bg-black/70 border border-black rounded-lg px-2 py-1">
          Range: {maxRangeKm.toFixed(1)} km
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-24 h-24 rounded-full border-2 border-white animate-ping"></div>
        <div className="w-48 h-48 rounded-full border border-white absolute"></div>
        <div className="w-80 h-80 rounded-full border border-white absolute"></div>
      </div>

      <div className="relative h-44 w-full mt-2 z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="relative w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000]">
            <MascotRenderer languageId={activeLearningLang?.id} animated={true} className="w-12 h-12" />
            <span className="absolute -top-2 -right-2 z-30">
              <FlagBadge language={activeNativeLang} size="lg" />
            </span>
          </div>
          <span className="bg-black text-white text-[10px] font-black px-3 py-0.5 rounded-full mt-2 border-2 border-black uppercase tracking-widest shadow-[2px_2px_0_#000]">You</span>
        </div>

        {nearbyLearners.map((learner) => {
          const learnerLearningLang = LANGUAGES[learner.learningLangId || learner.langId];
          const learnerNativeLang = LANGUAGES[learner.nativeLangId || learner.langId];

          return (
            <div
              key={learner.id}
              className="absolute flex flex-col items-center animate-bop"
              style={{ left: learner.x, top: learner.y, animationDelay: learner.delay }}
            >
              <div className="relative w-10 h-10">
                <div className={`bg-[#1E1E2A] border-2 rounded-full flex items-center justify-center shadow-[2px_2px_0_#000] w-10 h-10 overflow-hidden ${learner.recommended ? 'border-[#FFD100] ring-2 ring-[#FFD100]' : 'border-black'}`}>
                  <MascotRenderer languageId={learnerLearningLang?.id || learner.langId} animated={false} className="w-7 h-7" />
                </div>
                <span className="absolute -top-1 -right-1 z-30">
                  <FlagBadge language={learnerNativeLang || learnerLearningLang} size="sm" />
                </span>
              </div>
              {!!learner.distanceKm && (
                <span className={`mt-1 text-[9px] font-black text-white px-1.5 py-0.5 rounded-md border ${learner.recommended ? 'bg-[#FFD100] text-black border-black' : 'bg-black/60 border-black'}`}>
                  {learner.distanceKm} km
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
