import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES } from '../constants/languages';
import { UI_STRINGS } from '../constants/data';

const AppContext = createContext();

const DEFAULT_CHAT_THREADS = [
  {
    id: 'ai-momo',
    type: 'ai',
    name: 'Momo (AI)',
    preview: 'Ready for your daily speaking practice?',
    time: '4:51 PM',
    unread: 1
  },
  {
    id: 'david-wong',
    type: 'friend',
    name: 'David Wong',
    preview: 'Want to do a short roleplay tonight?',
    time: '4:48 PM',
    unread: 2
  },
  {
    id: 'chen-wei',
    type: 'friend',
    name: 'Chen Wei',
    preview: 'I can help you with tone pronunciation.',
    time: '4:23 PM',
    unread: 0
  },
  {
    id: 'nicho',
    type: 'friend',
    name: 'Nicho',
    preview: 'We can review unit 3 after class.',
    time: '4:09 PM',
    unread: 0
  }
];

export const AppProvider = ({ children }) => {
  // ============= STATES =============
  const [uiLanguage, setUiLanguage] = useState('en'); // Bahasa interface app
  const [nativeLanguage, setNativeLanguage] = useState('en'); // Bahasa native / asal user
  const [learningLanguage, setLearningLanguage] = useState('zh_tw'); // Bahasa yg sedang dipelajari
  const [translationSourceLang, setTranslationSourceLang] = useState('zh_tw'); // Dari bahasa apa
  const [translationTargetLang, setTranslationTargetLang] = useState('en'); // Ke bahasa apa
  const [savedWords, setSavedWords] = useState([]);
  const [chatThreads, setChatThreads] = useState(DEFAULT_CHAT_THREADS);
  const [isFirstTime, setIsFirstTime] = useState(true); // Untuk check first setup
  const [hasSeenSettings, setHasSeenSettings] = useState(false);

  // ============= EFFECTS =============
  // Load dari localStorage saat app start
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    const savedWordEntries = localStorage.getItem('savedWords');
    const savedChatThreads = localStorage.getItem('chatThreads');

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setUiLanguage(settings.uiLanguage || 'en');
        setNativeLanguage(settings.nativeLanguage || 'en');
        setLearningLanguage(settings.learningLanguage || 'zh_tw');
        setTranslationSourceLang(settings.translationSourceLang || 'zh_tw');
        setTranslationTargetLang(settings.translationTargetLang || 'en');
        setIsFirstTime(false);
        setHasSeenSettings(true);
      } catch (e) {
        console.log('Failed to load settings');
      }
    }

    if (savedWordEntries) {
      try {
        const parsed = JSON.parse(savedWordEntries);
        if (Array.isArray(parsed)) {
          setSavedWords(parsed);
        }
      } catch (e) {
        console.log('Failed to load saved words');
      }
    }

    if (savedChatThreads) {
      try {
        const parsedThreads = JSON.parse(savedChatThreads);
        if (Array.isArray(parsedThreads)) {
          setChatThreads(parsedThreads);
        }
      } catch (e) {
        console.log('Failed to load chat threads');
      }
    }
  }, []);

  // Save ke localStorage setiap kali settings berubah
  useEffect(() => {
    if (!isFirstTime) {
      const settings = {
        uiLanguage,
        nativeLanguage,
        learningLanguage,
        translationSourceLang,
        translationTargetLang
      };
      localStorage.setItem('appSettings', JSON.stringify(settings));
    }
  }, [uiLanguage, nativeLanguage, learningLanguage, translationSourceLang, translationTargetLang, isFirstTime]);

  useEffect(() => {
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem('chatThreads', JSON.stringify(chatThreads));
  }, [chatThreads]);

  // ============= FUNGSI UPDATE =============
  const updateSettings = (newSettings) => {
    if (newSettings.uiLanguage) setUiLanguage(newSettings.uiLanguage);
    if (newSettings.nativeLanguage) setNativeLanguage(newSettings.nativeLanguage);
    if (newSettings.learningLanguage) setLearningLanguage(newSettings.learningLanguage);
    if (newSettings.translationSourceLang) setTranslationSourceLang(newSettings.translationSourceLang);
    if (newSettings.translationTargetLang) setTranslationTargetLang(newSettings.translationTargetLang);
    setIsFirstTime(false);
    setHasSeenSettings(true);
  };

  const completeFirstSetup = (settings) => {
    updateSettings(settings);
  };

  const updateTranslationPair = (source, target) => {
    setTranslationSourceLang(source);
    setTranslationTargetLang(target);
  };

  const toggleSavedWord = (word) => {
    const normalizedWord = {
      token: word.token,
      pinyin: word.pinyin || '-',
      meaning: word.meaning || 'context word',
      languageId: word.languageId || learningLanguage,
      languageName: word.languageName || (LANGUAGES[word.languageId || learningLanguage]?.name || 'Unknown Language'),
      flag: word.flag || (LANGUAGES[word.languageId || learningLanguage]?.flag || '🏳️')
    };

    setSavedWords((prev) => {
      const exists = prev.some(
        (item) => item.token === normalizedWord.token && item.languageId === normalizedWord.languageId
      );

      if (exists) {
        return prev.filter(
          (item) => !(item.token === normalizedWord.token && item.languageId === normalizedWord.languageId)
        );
      }

      return [{ ...normalizedWord, savedAt: Date.now() }, ...prev];
    });
  };

  const isWordSaved = (token, languageId) => {
    return savedWords.some((item) => item.token === token && item.languageId === languageId);
  };

  const getChatThreadById = (threadId) => {
    return chatThreads.find((thread) => thread.id === threadId) || null;
  };

  const openChatThread = (threadId) => {
    setChatThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              unread: 0
            }
          : thread
      )
    );
  };

  const updateChatThreadPreview = (threadId, nextPreview) => {
    setChatThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              preview: nextPreview,
              time: 'Now'
            }
          : thread
      )
    );
  };

  // ============= GETTERS =============
  const getActiveLearningLang = () => LANGUAGES[learningLanguage] || LANGUAGES.zh_tw;
  const getNativeLanguage = () => LANGUAGES[nativeLanguage] || LANGUAGES.en;
  const getUILanguage = () => LANGUAGES[uiLanguage] || LANGUAGES.en;
  const getSourceLang = () => LANGUAGES[translationSourceLang] || LANGUAGES.zh_tw;
  const getTargetLang = () => LANGUAGES[translationTargetLang] || LANGUAGES.en;
  const getUIStrings = () => {
    if (uiLanguage.startsWith('id')) return UI_STRINGS.indonesian;
    if (uiLanguage.startsWith('es')) return UI_STRINGS.spanish;
    return UI_STRINGS.english;
  };

  const value = {
    // States
    uiLanguage,
    nativeLanguage,
    learningLanguage,
    translationSourceLang,
    translationTargetLang,
    savedWords,
    chatThreads,
    isFirstTime,
    hasSeenSettings,

    // Setters
    setUiLanguage,
    setNativeLanguage,
    setLearningLanguage,
    setTranslationSourceLang,
    setTranslationTargetLang,
    setSavedWords,

    // Functions
    updateSettings,
    completeFirstSetup,
    updateTranslationPair,
    toggleSavedWord,
    isWordSaved,
    openChatThread,
    getChatThreadById,
    updateChatThreadPreview,

    // Getters
    getActiveLearningLang,
    getNativeLanguage,
    getUILanguage,
    getUIStrings,
    getSourceLang,
    getTargetLang,

    // Raw objects for convenience
    activeLearningLang: LANGUAGES[learningLanguage] || LANGUAGES.zh_tw,
    nativeLang: LANGUAGES[nativeLanguage] || LANGUAGES.en,
    uiLang: LANGUAGES[uiLanguage] || LANGUAGES.en,
    uiStrings: getUIStrings(),
    sourceLang: LANGUAGES[translationSourceLang] || LANGUAGES.zh_tw,
    targetLang: LANGUAGES[translationTargetLang] || LANGUAGES.en
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
