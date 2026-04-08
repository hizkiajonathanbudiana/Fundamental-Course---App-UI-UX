import React, { useMemo, useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
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

const RECOMMENDATION_STYLES = {
  learning: 'border-[#FFD100] ring-2 ring-[#FFD100]',
  native: 'border-[#00E5FF] ring-2 ring-[#00E5FF]',
  both: 'border-[#00FF87] ring-2 ring-[#00FF87]'
};

const ZOOM_DISTANCE_LEVELS_KM = [2, 5, 8, 12, 18, 26, 40, 55];

const getInitialZoomIndex = (initialRangeKm, nearbyLearners) => {
  if (initialRangeKm === 'auto' && nearbyLearners && nearbyLearners.length >= 5) {
    const sortedLearners = [...nearbyLearners].sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
    const fifthNearest = sortedLearners[4]; // Find the 5th nearest friend (0-based index)
    const requiredDistance = fifthNearest.distanceKm || 5;

    // Find the smallest zoom level that covers this distance
    const autoIndex = ZOOM_DISTANCE_LEVELS_KM.findIndex((dist) => dist >= requiredDistance);
    return autoIndex !== -1 ? autoIndex : ZOOM_DISTANCE_LEVELS_KM.length - 1;
  }

  const closest = ZOOM_DISTANCE_LEVELS_KM.reduce(
    (acc, value, index) => {
      const distance = Math.abs(value - (initialRangeKm === 'auto' ? 5 : initialRangeKm));
      if (distance < acc.distance) {
        return { index, distance };
      }
      return acc;
    },
    { index: 1, distance: Infinity }
  );

  return closest.index;
};

export default function RadarCard({
  lang,
  learningLang,
  nativeLang,
  nearbyLearners,
  radarLabel = 'Live Radar',
  subtitle = null,
  onClick = null,
  showRangeControls = false,
  showRecommendationToggle = false,
  initialRangeKm = 5,
  compact = false,
  enableMarkerPopup = true,
  onAddFriendClick = null,
  requestedUserIds = [],
  radarHeightClass = null
}) {
  const activeLearningLang = learningLang || lang;
  const activeNativeLang = nativeLang || lang;
  const isClickable = typeof onClick === 'function';
  const [zoomIndex, setZoomIndex] = useState(getInitialZoomIndex(initialRangeKm, nearbyLearners));
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [highlightRecommendations, setHighlightRecommendations] = useState(false);

  const selectedRangeKm = ZOOM_DISTANCE_LEVELS_KM[zoomIndex];

  const visibleLearners = useMemo(() => {
    const sorted = [...nearbyLearners]
      .filter((learner) => (learner.distanceKm || 0) <= selectedRangeKm)
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));

    if (compact) {
      return sorted.slice(0, 10);
    }

    const dynamicLimit = Math.min(30, Math.max(10, Math.round(selectedRangeKm / 2)));
    return sorted.slice(0, dynamicLimit);
  }, [nearbyLearners, selectedRangeKm, compact]);

  const maxRangeKm = useMemo(() => {
    if (!visibleLearners.length) return 0;
    return Math.max(...visibleLearners.map((item) => item.distanceKm || 0), 0);
  }, [visibleLearners]);

  const mapScale = useMemo(() => {
    const ratio = zoomIndex / (ZOOM_DISTANCE_LEVELS_KM.length - 1);
    return +(1.4 - ratio * 0.6).toFixed(2);
  }, [zoomIndex]);

  const selectedLearningLang = useMemo(() => {
    if (!selectedLearner) return null;
    return LANGUAGES[selectedLearner.learningLangId || selectedLearner.langId] || null;
  }, [selectedLearner]);

  const selectedNativeLang = useMemo(() => {
    if (!selectedLearner) return null;
    return LANGUAGES[selectedLearner.nativeLangId || selectedLearner.langId] || null;
  }, [selectedLearner]);

  const selectedLearnerRequested = !!selectedLearner && requestedUserIds.includes(selectedLearner.id);
  const resolvedRadarHeightClass = radarHeightClass || (compact ? 'h-44' : 'h-64');

  const canZoomIn = zoomIndex > 0;
  const canZoomOut = zoomIndex < ZOOM_DISTANCE_LEVELS_KM.length - 1;

  const handleZoomIn = (event) => {
    event.stopPropagation();
    if (!canZoomIn) return;
    setZoomIndex((prev) => prev - 1);
  };

  const handleZoomOut = (event) => {
    event.stopPropagation();
    if (!canZoomOut) return;
    setZoomIndex((prev) => prev + 1);
  };

  return (
    <div
      onClick={onClick || undefined}
      className={`mb-6 w-full bg-[#2A2A3B] border-4 border-black shadow-[8px_8px_0_#000] rounded-[2rem] relative overflow-hidden transition-all ${isClickable ? 'cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none' : ''}`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-24 h-24 rounded-full border-2 border-white animate-ping"></div>
        <div className="w-48 h-48 rounded-full border border-white absolute"></div>
        <div className="w-80 h-80 rounded-full border border-white absolute"></div>
      </div>

      <div className={`relative ${resolvedRadarHeightClass} w-full z-10 overflow-hidden`}>
        <div className="absolute top-3 left-3 right-3 z-40 pointer-events-none">
          <div className="flex items-center justify-between gap-2">
            <span className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
              {radarLabel}
            </span>

            <span className="pointer-events-auto inline-flex rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {subtitle || `${visibleLearners.length} Friends Nearby`}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="pointer-events-auto inline-flex rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1">
              Range: {showRangeControls || compact ? selectedRangeKm : maxRangeKm.toFixed(1)} km
            </span>

            <div className="pointer-events-auto flex items-center gap-1">
              {showRecommendationToggle && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setHighlightRecommendations((prev) => !prev);
                  }}
                  className={`h-8 rounded-lg border border-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-2 transition-all ${highlightRecommendations ? 'bg-[#FFD100] text-black' : 'bg-black/45 text-white'
                    }`}
                  title="Highlight recommendations"
                >
                  Recommend
                </button>
              )}

              {showRangeControls && (
                <>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={!canZoomIn}
                    className={`w-8 h-8 rounded-lg border border-white/20 backdrop-blur-md flex items-center justify-center transition-all ${canZoomIn ? 'bg-black/45 text-white' : 'bg-black/20 text-[#9A9AA7]'
                      }`}
                    title="Zoom in"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={!canZoomOut}
                    className={`w-8 h-8 rounded-lg border border-white/20 backdrop-blur-md flex items-center justify-center transition-all ${canZoomOut ? 'bg-black/45 text-white' : 'bg-black/20 text-[#9A9AA7]'
                      }`}
                    title="Zoom out"
                  >
                    <Minus size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute inset-0" style={{ transform: `scale(${mapScale})`, transformOrigin: 'center center', transition: 'transform 220ms ease' }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
            <div className="relative w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000]">
              <MascotRenderer languageId={activeLearningLang?.id} animated={true} className="w-12 h-12" />
              <span className="absolute -top-2 -right-2 z-30">
                <FlagBadge language={activeNativeLang} size="lg" />
              </span>
            </div>
            <span className="bg-black text-white text-[10px] font-black px-3 py-0.5 rounded-full mt-2 border-2 border-black uppercase tracking-widest shadow-[2px_2px_0_#000]">You</span>
          </div>

          {visibleLearners.map((learner) => {
            const learnerLearningLang = LANGUAGES[learner.learningLangId || learner.langId];
            const learnerNativeLang = LANGUAGES[learner.nativeLangId || learner.langId];
            const recommendationClass = RECOMMENDATION_STYLES[learner.recommendationType] || 'border-black';
            const markerOpacity = highlightRecommendations && !learner.recommended ? 'opacity-25 grayscale' : 'opacity-100';

            return (
              <div
                key={learner.id}
                className={`absolute flex flex-col items-center animate-bop transition-all ${markerOpacity}`}
                style={{ left: learner.x, top: learner.y, animationDelay: learner.delay }}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    if (!enableMarkerPopup) return;
                    event.stopPropagation();
                    setSelectedLearner(learner);
                  }}
                  className="relative w-10 h-10"
                  title={`View ${learner.name}`}
                >
                  <div className={`bg-[#1E1E2A] border-2 rounded-full flex items-center justify-center shadow-[2px_2px_0_#000] w-10 h-10 overflow-hidden ${highlightRecommendations && learner.recommended ? recommendationClass : 'border-black'}`}>
                    <MascotRenderer languageId={learnerLearningLang?.id || learner.langId} animated={false} className="w-7 h-7" />
                  </div>
                  <span className="absolute -top-1 -right-1 z-30">
                    <FlagBadge language={learnerNativeLang || learnerLearningLang} size="sm" />
                  </span>
                </button>
                {!!learner.distanceKm && (
                  <span className={`mt-1 text-[9px] font-black text-white px-1.5 py-0.5 rounded-md border ${highlightRecommendations && learner.recommended ? 'bg-[#FFD100] text-black border-black' : 'bg-black/60 border-black'}`}>
                    {learner.distanceKm} km
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!compact && enableMarkerPopup && selectedLearner && (
        <div
          className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedLearner(null);
          }}
        >
          <div
            className="w-full max-w-[320px] p-4 rounded-3xl border-4 border-black bg-white text-black shadow-[8px_8px_0_#000] relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedLearner(null);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-xl border-2 border-black bg-[#F3F3F3] flex items-center justify-center"
              title="Close"
            >
              <X size={16} />
            </button>

            <p className="font-black text-lg pr-10">{selectedLearner.name}</p>
            <p className="text-xs font-black uppercase tracking-widest text-[#4B4B5A] mt-1">{selectedLearner.distanceKm} km away</p>
            <div className="mt-3 text-xs font-bold space-y-1.5">
              <p>Learning: {selectedLearningLang?.flag} {selectedLearningLang?.name || 'Unknown'}</p>
              <p>Native: {selectedNativeLang?.flag} {selectedNativeLang?.name || 'Unknown'}</p>
              {selectedLearner.status && <p>Status: {selectedLearner.status}</p>}
            </div>

            {selectedLearner.recommendationReason && (
              <span className={`inline-block mt-3 border-2 border-black rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-widest ${selectedLearner.recommendationType === 'native'
                  ? 'bg-[#00E5FF] text-black'
                  : selectedLearner.recommendationType === 'learning'
                    ? 'bg-[#FFD100] text-black'
                    : 'bg-[#00FF87] text-black'
                }`}>
                {selectedLearner.recommendationReason}
              </span>
            )}

            {typeof onAddFriendClick === 'function' && (
              <button
                type="button"
                onClick={() => onAddFriendClick(selectedLearner)}
                disabled={selectedLearnerRequested}
                className={`mt-4 w-full h-10 rounded-xl border-2 border-black text-xs font-black uppercase tracking-widest transition-all ${selectedLearnerRequested
                    ? 'bg-[#FFD100] text-black'
                    : 'bg-[#00FF87] text-black active:translate-y-[1px]'
                  }`}
              >
                {selectedLearnerRequested ? 'Requested' : 'Add Friend'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
