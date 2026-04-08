import React, { useState } from 'react';
import { ChevronRight, ArrowRightLeft, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllLanguages } from '../constants/languages';

const REGION_TO_COUNTRY = {
  CN: 'China',
  TW: 'Taiwan',
  JP: 'Japan',
  KR: 'South Korea',
  TH: 'Thailand',
  VN: 'Vietnam',
  GB: 'United Kingdom',
  ES: 'Spain',
  FR: 'France',
  DE: 'Germany',
  BR: 'Brazil',
  IT: 'Italy',
  RU: 'Russia',
  PL: 'Poland',
  UA: 'Ukraine',
  SA: 'Saudi Arabia',
  IN: 'India',
  US: 'United States'
};

const getOriginCountry = (language) => {
  const region = language?.code?.split('-')?.[1];
  return REGION_TO_COUNTRY[region] || 'Global';
};

function LanguageCard({ language, selected, onClick, selectedColor }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-3 transition-all text-left flex items-center justify-between ${selected ? 'bg-opacity-10' : 'border-[#2A2A3E] hover:border-[#3A3A4E]'
        }`}
      style={
        selected
          ? {
            borderColor: selectedColor,
            backgroundColor: `${selectedColor}20`
          }
          : undefined
      }
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{language.flag}</span>
        <div>
          <p className="font-bold text-white">{language.name}</p>
          <p className="text-xs text-[#7A7A9A]">
            Native: {language.nativeName} • Origin: {getOriginCountry(language)}
          </p>
        </div>
      </div>
      {selected && <Check size={24} style={{ color: selectedColor }} strokeWidth={3} />}
    </button>
  );
}

export default function Settings({ onNavigate }) {
  const {
    completeFirstSetup,
    uiLanguage,
    nativeLanguage,
    learningLanguage,
    translationSourceLang,
    translationTargetLang,
    uiStrings
  } = useAppContext();

  const [step, setStep] = useState(1); // 1 UI, 2 Learning, 3 Native, 4 Translation, 5 Review
  const [tempUILang, setTempUILang] = useState(uiLanguage);
  const [tempLearningLang, setTempLearningLang] = useState(learningLanguage);
  const [tempNativeLang, setTempNativeLang] = useState(nativeLanguage);
  const [tempSourceLang, setTempSourceLang] = useState(translationSourceLang);
  const [tempTargetLang, setTempTargetLang] = useState(translationTargetLang);

  const languages = getAllLanguages();

  const uiLangObj = languages.find((l) => l.id === tempUILang);
  const learningLangObj = languages.find((l) => l.id === tempLearningLang);
  const nativeLangObj = languages.find((l) => l.id === tempNativeLang);
  const sourceLangObj = languages.find((l) => l.id === tempSourceLang);
  const targetLangObj = languages.find((l) => l.id === tempTargetLang);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    completeFirstSetup({
      uiLanguage: tempUILang,
      nativeLanguage: tempNativeLang,
      learningLanguage: tempLearningLang,
      translationSourceLang: tempSourceLang,
      translationTargetLang: tempTargetLang
    });
    onNavigate('home');
  };

  const renderFooter = ({ canGoBack = true, nextLabel = 'Next', onNext = handleNext }) => (
    <div className="px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] border-t-4 border-black bg-[#1E1E2A] flex gap-3">
      {canGoBack ? (
        <button
          onClick={handlePrev}
          className="flex-1 px-4 py-3 bg-[#3A3A4E] text-white font-bold rounded-2xl border-3 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Back
        </button>
      ) : (
        <div className="flex-1" />
      )}

      <button
        onClick={onNext}
        className="flex-1 px-4 py-3 bg-[#00FF87] text-black font-bold rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
      >
        {nextLabel} <ChevronRight size={20} strokeWidth={3} />
      </button>
    </div>
  );

  const renderStep1 = () => (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black mb-2">{uiStrings.settings}</h1>
        <p className="text-[#7A7A9A] text-sm">Choose your app interface language</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 space-y-3">
        {languages.map((language) => (
          <LanguageCard
            key={language.id}
            language={language}
            selected={tempUILang === language.id}
            selectedColor="#00FF87"
            onClick={() => setTempUILang(language.id)}
          />
        ))}
      </div>

      {renderFooter({ canGoBack: false, nextLabel: 'Next' })}
    </div>
  );

  const renderStep2 = () => (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black mb-2">Learning Language</h1>
        <p className="text-[#7A7A9A] text-sm">Choose language for your mascot and practice content</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 space-y-3">
        {languages.map((language) => (
          <LanguageCard
            key={language.id}
            language={language}
            selected={tempLearningLang === language.id}
            selectedColor={language.primaryColor}
            onClick={() => setTempLearningLang(language.id)}
          />
        ))}
      </div>

      {renderFooter({ nextLabel: 'Next' })}
    </div>
  );

  const renderStep3 = () => (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black mb-2">Native Language</h1>
        <p className="text-[#7A7A9A] text-sm">This will be used for your profile flag and origin country</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4 space-y-3">
        {languages.map((language) => (
          <LanguageCard
            key={language.id}
            language={language}
            selected={tempNativeLang === language.id}
            selectedColor={language.secondaryColor}
            onClick={() => setTempNativeLang(language.id)}
          />
        ))}
      </div>

      {renderFooter({ nextLabel: 'Next' })}
    </div>
  );

  const renderStep4 = () => (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black mb-2">Translation Mode</h1>
        <p className="text-[#7A7A9A] text-sm">Translate from → to what language?</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4">
        <div className="space-y-6">
          <div>
            <p className="font-bold text-sm mb-3 text-[#00FF87]">FROM</p>
            <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-hide">
              {languages.map((language) => (
                <button
                  key={`source-${language.id}`}
                  onClick={() => setTempSourceLang(language.id)}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left text-sm ${tempSourceLang === language.id ? 'border-[#00FF87] bg-[#00FF87]/10' : 'border-[#2A2A3E] hover:border-[#3A3A4E]'
                    }`}
                >
                  <span className="text-xl">{language.flag}</span> {language.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                const temp = tempSourceLang;
                setTempSourceLang(tempTargetLang);
                setTempTargetLang(temp);
              }}
              className="p-3 bg-[#3A3A4E] rounded-full hover:bg-[#4A4A5E] transition-all"
            >
              <ArrowRightLeft size={20} strokeWidth={2} />
            </button>
          </div>

          <div>
            <p className="font-bold text-sm mb-3 text-[#FFD100]">TO</p>
            <div className="space-y-2 max-h-[150px] overflow-y-auto scrollbar-hide">
              {languages.map((language) => (
                <button
                  key={`target-${language.id}`}
                  onClick={() => setTempTargetLang(language.id)}
                  className={`w-full p-3 rounded-xl border-2 transition-all text-left text-sm ${tempTargetLang === language.id ? 'border-[#FFD100] bg-[#FFD100]/10' : 'border-[#2A2A3E] hover:border-[#3A3A4E]'
                    }`}
                >
                  <span className="text-xl">{language.flag}</span> {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {renderFooter({ nextLabel: 'Review' })}
    </div>
  );

  const renderStep5 = () => (
    <div className="flex flex-col h-full min-h-0">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-3xl font-black mb-2">Ready!</h1>
        <p className="text-[#7A7A9A] text-sm">Review your settings</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-4">
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border-3 border-[#2A2A3E] bg-[#272734]">
            <p className="text-xs font-bold text-[#7A7A9A] mb-2">APP INTERFACE LANGUAGE</p>
            <p className="font-bold text-white">{uiLangObj?.flag} {uiLangObj?.name}</p>
            <p className="text-sm text-[#7A7A9A]">Native: {uiLangObj?.nativeName} • Origin: {getOriginCountry(uiLangObj)}</p>
          </div>

          <div className="p-4 rounded-2xl border-3 bg-opacity-10" style={{ borderColor: learningLangObj?.primaryColor, backgroundColor: `${learningLangObj?.primaryColor}20` }}>
            <p className="text-xs font-bold text-[#7A7A9A] mb-2">LEARNING LANGUAGE (MASCOT)</p>
            <p className="font-bold text-white">{learningLangObj?.flag} {learningLangObj?.name}</p>
            <p className="text-sm text-[#7A7A9A]">Native: {learningLangObj?.nativeName} • Origin: {getOriginCountry(learningLangObj)}</p>
          </div>

          <div className="p-4 rounded-2xl border-3 border-[#2A2A3E] bg-[#272734]">
            <p className="text-xs font-bold text-[#7A7A9A] mb-2">NATIVE LANGUAGE (FLAG)</p>
            <p className="font-bold text-white">{nativeLangObj?.flag} {nativeLangObj?.name}</p>
            <p className="text-sm text-[#7A7A9A]">Native: {nativeLangObj?.nativeName} • Origin: {getOriginCountry(nativeLangObj)}</p>
          </div>

          <div className="p-4 rounded-2xl border-3 border-[#2A2A3E] bg-[#272734]">
            <p className="text-xs font-bold text-[#7A7A9A] mb-3">TRANSLATION</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <span className="text-2xl">{sourceLangObj?.flag}</span>
                <p className="text-sm font-bold text-white mt-1">{sourceLangObj?.name}</p>
              </div>
              <ArrowRightLeft size={20} strokeWidth={2} className="text-[#00FF87]" />
              <div className="flex-1 text-right">
                <span className="text-2xl">{targetLangObj?.flag}</span>
                <p className="text-sm font-bold text-white mt-1">{targetLangObj?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] border-t-4 border-black bg-[#1E1E2A] flex gap-3">
        <button
          onClick={handlePrev}
          className="flex-1 px-4 py-3 bg-[#3A3A4E] text-white font-bold rounded-2xl border-3 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Back
        </button>
        <button
          onClick={handleFinish}
          className="flex-1 px-4 py-3 bg-[#00FF87] text-black font-bold rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Check size={20} strokeWidth={3} /> Done
        </button>
      </div>
    </div>
  );

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5];

  return (
    <div className="w-full h-full flex flex-col bg-[#1E1E2A] overflow-hidden">
      <div className="px-6 pt-4 pb-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`flex-1 h-1 rounded-full transition-all ${index <= step ? 'bg-[#00FF87]' : 'bg-[#2A2A3E]'}`}
          />
        ))}
      </div>

      {steps[step - 1]()}
    </div>
  );
}
