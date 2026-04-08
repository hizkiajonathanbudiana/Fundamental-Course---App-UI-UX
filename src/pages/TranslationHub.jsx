import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Camera,
  ChevronLeft,
  Eye,
  EyeOff,
  Images,
  Mic,
  PenTool,
  ScanLine,
  Send,
  Type,
  Volume2,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const INPUT_MODES = [
  { id: 'text', label: 'Text', icon: Type },
  { id: 'camera', label: 'Camera', icon: Camera },
  { id: 'voice', label: 'Voice', icon: Mic },
  { id: 'draw', label: 'Draw', icon: PenTool }
];

const SOURCE_LANGUAGE_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'id', label: 'Bahasa Indonesia' }
];

const TARGET_LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'ja', label: '日本語' },
  { value: 'id', label: 'Bahasa Indonesia' }
];

const DEFAULT_MOCK_TEXT = '科技讓人們的生活變得更方便。現在很多事情都可以用手機完成，比如查資料、聊天和學習。透過網路，我們可以很快找到需要的資訊。這讓學習變得更容易也更有效率。\n\n健康對每個人都很重要。每天運動可以讓身體更強壯，也可以減少生病的機會。吃均衡的食物和保持良好的作息也很重要。只要養成好習慣，就能擁有更好的生活品質。';

const TOKEN_BANK = {
  請: { pinyin: 'qǐng', bopomofo: 'ㄑㄧㄥˇ', meaning: 'please / may I' },
  問: { pinyin: 'wèn', bopomofo: 'ㄨㄣˋ', meaning: 'to ask' },
  廁所: { pinyin: 'cè suǒ', bopomofo: 'ㄘㄜˋ ㄙㄨㄛˇ', meaning: 'restroom / toilet' },
  在: { pinyin: 'zài', bopomofo: 'ㄗㄞˋ', meaning: 'at / in' },
  哪裡: { pinyin: 'nǎ lǐ', bopomofo: 'ㄋㄚˇ ㄌㄧˇ', meaning: 'where' },
  生活: { pinyin: 'shēng huó', bopomofo: 'ㄕㄥ ㄏㄨㄛˊ', meaning: 'daily life' },
  情境: { pinyin: 'qíng jìng', bopomofo: 'ㄎㄧㄥˊ ㄐㄧㄥˋ', meaning: 'context / situation' },
  可用: { pinyin: 'kě yòng', bopomofo: 'ㄎㄜˇ ㄩㄥˋ', meaning: 'usable / can be used' },
  禮貌: { pinyin: 'lǐ mào', bopomofo: 'ㄌㄧˇ ㄇㄠˋ', meaning: 'polite' },
  謝謝: { pinyin: 'xiè xie', bopomofo: 'ㄒㄧㄝˋ ˙ㄒㄧㄝ', meaning: 'thank you' },
  謝: { pinyin: 'xiè', bopomofo: 'ㄒㄧㄝˋ', meaning: 'thank' },
  科技: { pinyin: 'kē jì', bopomofo: 'ㄎㄜ ㄐㄧˋ', meaning: 'technology' },
  讓: { pinyin: 'ràng', bopomofo: 'ㄖㄤˋ', meaning: 'to let / make' },
  人們: { pinyin: 'rén men', bopomofo: 'ㄖㄣˊ ㄇㄣ˙', meaning: 'people' },
  的: { pinyin: 'de', bopomofo: 'ㄉㄜ˙', meaning: 'grammar particle' },
  變得: { pinyin: 'biàn de', bopomofo: 'ㄅㄧㄢˋ ㄉㄜ˙', meaning: 'to become' },
  更: { pinyin: 'gèng', bopomofo: 'ㄍㄥˋ', meaning: 'more' },
  方便: { pinyin: 'fāng biàn', bopomofo: 'ㄈㄤ ㄅㄧㄢˋ', meaning: 'convenient' },
  現在: { pinyin: 'xiàn zài', bopomofo: 'ㄒㄧㄢˋ ㄗㄞˋ', meaning: 'now' },
  很: { pinyin: 'hěn', bopomofo: 'ㄏㄣˇ', meaning: 'very' },
  多: { pinyin: 'duō', bopomofo: 'ㄉㄨㄛ', meaning: 'many / much' },
  事情: { pinyin: 'shì qing', bopomofo: 'ㄕˋ ㄑㄧㄥ˙', meaning: 'things / matters' },
  都: { pinyin: 'dōu', bopomofo: 'ㄉㄡ', meaning: 'all / both' },
  可以: { pinyin: 'kě yǐ', bopomofo: 'ㄎㄜˇ ㄧˇ', meaning: 'can / may' },
  用: { pinyin: 'yòng', bopomofo: 'ㄩㄥˋ', meaning: 'to use' },
  手機: { pinyin: 'shǒu jī', bopomofo: 'ㄕㄡˇ ㄐㄧ', meaning: 'mobile phone' },
  完成: { pinyin: 'wán chéng', bopomofo: 'ㄨㄢˊ ㄔㄥˊ', meaning: 'to complete' },
  比如: { pinyin: 'bǐ rú', bopomofo: 'ㄅㄧˇ ㄖㄨˊ', meaning: 'for example' },
  查: { pinyin: 'chá', bopomofo: 'ㄔㄚˊ', meaning: 'to check / search' },
  資料: { pinyin: 'zī liào', bopomofo: 'ㄗ ㄌㄧㄠˋ', meaning: 'data / info' },
  聊天: { pinyin: 'liáo tiān', bopomofo: 'ㄌㄧㄠˊ ㄊㄧㄢ', meaning: 'to chat' },
  和: { pinyin: 'hé', bopomofo: 'ㄏㄜˊ', meaning: 'and / with' },
  學習: { pinyin: 'xué xí', bopomofo: 'ㄒㄩㄝˊ ㄒㄧˊ', meaning: 'to learn' },
  透過: { pinyin: 'tòu guò', bopomofo: 'ㄊㄡˋ ㄍㄨㄛˋ', meaning: 'through / via' },
  網路: { pinyin: 'wǎng lù', bopomofo: 'ㄨㄤˇ ㄌㄨˋ', meaning: 'network / internet' },
  我們: { pinyin: 'wǒ men', bopomofo: 'ㄨㄛˇ ㄇㄣ˙', meaning: 'we / us' },
  快: { pinyin: 'kuài', bopomofo: 'ㄎㄨㄞˋ', meaning: 'fast / quick' },
  找到: { pinyin: 'zhǎo dào', bopomofo: 'ㄓㄠˇ ㄉㄠˋ', meaning: 'to find' },
  需要: { pinyin: 'xū yào', bopomofo: 'ㄒㄩ ㄧㄠˋ', meaning: 'to need' },
  資訊: { pinyin: 'zī xùn', bopomofo: 'ㄗ ㄒㄩㄣˋ', meaning: 'information' },
  這: { pinyin: 'zhè', bopomofo: 'ㄓㄜˋ', meaning: 'this' },
  容易: { pinyin: 'róng yì', bopomofo: 'ㄖㄨㄥˊ ㄧˋ', meaning: 'easy' },
  也: { pinyin: 'yě', bopomofo: 'ㄧㄝˇ', meaning: 'also' },
  有效率: { pinyin: 'yǒu xiào lǜ', bopomofo: 'ㄧㄡˇ ㄒㄧㄠˋ ㄌㄩˋ', meaning: 'efficient' },
  健康: { pinyin: 'jiàn kāng', bopomofo: 'ㄐㄧㄢˋ ㄎㄤ', meaning: 'health' },
  對: { pinyin: 'duì', bopomofo: 'ㄉㄨㄟˋ', meaning: 'towards / correct' },
  每個: { pinyin: 'měi gè', bopomofo: 'ㄇㄟˇ ㄍㄜˋ', meaning: 'every' },
  人: { pinyin: 'rén', bopomofo: 'ㄖㄣˊ', meaning: 'person' },
  重要: { pinyin: 'zhòng yào', bopomofo: 'ㄓㄨㄥˋ ㄧㄠˋ', meaning: 'important' },
  每天: { pinyin: 'měi tiān', bopomofo: 'ㄇㄟˇ ㄊㄧㄢ', meaning: 'every day' },
  運動: { pinyin: 'yùn dòng', bopomofo: 'ㄩㄣˋ ㄉㄨㄥˋ', meaning: 'exercise' },
  身體: { pinyin: 'shēn tǐ', bopomofo: 'ㄕㄣ ㄊㄧˇ', meaning: 'body' },
  強壯: { pinyin: 'qiáng zhuàng', bopomofo: 'ㄑㄧㄤˊ ㄓㄨㄤˋ', meaning: 'strong' },
  減少: { pinyin: 'jiǎn shǎo', bopomofo: 'ㄐㄧㄢˇ ㄕㄠˇ', meaning: 'to reduce' },
  生病: { pinyin: 'shēng bìng', bopomofo: 'ㄕㄥ ㄅㄧㄥˋ', meaning: 'to get sick' },
  機會: { pinyin: 'jī huì', bopomofo: 'ㄐㄧ ㄏㄨㄟˋ', meaning: 'chance / opportunity' },
  吃: { pinyin: 'chī', bopomofo: 'ㄔ', meaning: 'to eat' },
  均衡: { pinyin: 'jūn héng', bopomofo: 'ㄐㄩㄣ ㄏㄥˊ', meaning: 'balanced' },
  食物: { pinyin: 'shí wù', bopomofo: 'ㄕˊ ㄨˋ', meaning: 'food' },
  保持: { pinyin: 'bǎo chí', bopomofo: 'ㄅㄠˇ ㄔˊ', meaning: 'to maintain / keep' },
  良好: { pinyin: 'liáng hǎo', bopomofo: 'ㄌㄧㄤˊ ㄏㄠˇ', meaning: 'good / sound' },
  作息: { pinyin: 'zuò xí', bopomofo: 'ㄗㄨㄛˋ ㄒㄧˊ', meaning: 'work & rest routine' },
  只要: { pinyin: 'zhǐ yào', bopomofo: 'ㄓˇ ㄧㄠˋ', meaning: 'as long as' },
  養成: { pinyin: 'yǎng chéng', bopomofo: 'ㄧㄤˇ ㄔㄥˊ', meaning: 'to cultivate / develop' },
  好: { pinyin: 'hǎo', bopomofo: 'ㄏㄠˇ', meaning: 'good' },
  習慣: { pinyin: 'xí guàn', bopomofo: 'ㄒㄧˊ ㄍㄨㄢˋ', meaning: 'habit' },
  就: { pinyin: 'jiù', bopomofo: 'ㄐㄧㄡˋ', meaning: 'then / just' },
  能: { pinyin: 'néng', bopomofo: 'ㄋㄥˊ', meaning: 'can / able to' },
  擁有: { pinyin: 'yǒng yǒu', bopomofo: 'ㄩㄥˇ ㄧㄡˇ', meaning: 'to have / possess' },
  品質: { pinyin: 'pǐn zhí', bopomofo: 'ㄆㄧㄣˇ ㄓˊ', meaning: 'quality' }
};

const WORD_KEYS = Object.keys(TOKEN_BANK).sort((a, b) => b.length - a.length);

const isHanCharacter = (char) => {
  const code = char.charCodeAt(0);
  return code >= 0x3400 && code <= 0x9fff;
};

const tokenizeSentence = (sentence = '') => {
  const tokens = [];
  let index = 0;

  while (index < sentence.length) {
    const char = sentence[index];

    if (char === ' ') {
      tokens.push({ text: char, punctuation: true });
      index += 1;
      continue;
    }

    if (char === '\n') {
      tokens.push({ text: char, isNewline: true });
      index += 1;
      continue;
    }

    const rest = sentence.slice(index);
    const match = WORD_KEYS.find((word) => rest.startsWith(word));
    if (match) {
      tokens.push({ text: match, ...TOKEN_BANK[match] });
      index += match.length;
      continue;
    }

    if (isHanCharacter(char)) {
      tokens.push({ text: char, pinyin: '-', bopomofo: '-', meaning: 'context token' });
      index += 1;
      continue;
    }

    tokens.push({ text: char, punctuation: true });
    index += 1;
  }

  return tokens;
};

const buildPronunciationLine = (sentence = '', key = 'pinyin') =>
  tokenizeSentence(sentence)
    .map((token) => {
      if (token.punctuation) return token.text;
      return token[key] && token[key] !== '-' ? token[key] : token.text;
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

const getDefaultEnglishTranslation = (source = '') => {
  const normalized = source.trim();
  if (normalized.includes('謝謝')) return 'Thank you.';
  if (normalized.includes('廁所') && normalized.includes('哪裡')) return 'Where is the restroom?';
  if (!normalized || normalized.includes('科技讓人們的生活')) return 'Technology makes people\'s lives more convenient. Now many things can be done with mobile phones...';
  return 'English translation preview for testing layout.';
};

// --- MODIFIED: MOCK 2 PARAGRAPHS OR SINGLE ---
const getMockTranslationParagraphs = (source = '') => {
  const normalized = source.trim();

  if (normalized.includes('謝謝')) {
    return ['Thank you.'];
  }

  if (normalized.includes('廁所') && normalized.includes('哪裡')) {
    return [
      'Where is the restroom?',
      'Could you tell me where the restroom is?'
    ];
  }

  if (!normalized || normalized.includes('科技讓人們的生活')) {
    return [
      'Technology makes people\'s lives more convenient. Now many things can be done with mobile phones, such as searching for information, chatting, and learning. Through the internet, we can quickly find the information we need. This makes learning easier and more efficient.',
      'Health is very important to everyone. Exercising every day can make the body stronger and reduce the chance of getting sick. Eating a balanced diet and maintaining a good routine are also very important. As long as you develop good habits, you can have a better quality of life.'
    ];
  }

  // Handle actual multi-paragraph input by splitting newlines
  const lines = normalized.split('\n').filter(line => line.trim());
  if (lines.length > 1) {
    return lines.map(line => `Translated: ${line.trim()}`);
  }

  return [
    `This is the primary translation for your input: "${source}". It is designed to show how the first paragraph of the result looks in this UI.`,
    `This is the second paragraph. Use this for cultural context, alternative meanings, or secondary examples to ensure the layout handles multiple blocks of text correctly.`
  ];
};

const getMockResult = (sourceText) => {
  const source = sourceText.trim() || DEFAULT_MOCK_TEXT;

  return {
    sourceText: source,
    translatedText: getDefaultEnglishTranslation(source),
    translationParagraphs: getMockTranslationParagraphs(source),
    pinyin: buildPronunciationLine(source, 'pinyin'),
    bopomofo: buildPronunciationLine(source, 'bopomofo')
  };
};

export default function TranslationHub({ onNavigate, lang }) {
  const { targetLang, sourceLang, toggleSavedWord, isWordSaved, updateChatThreadPreview } = useAppContext();

  const [mode, setMode] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const [cameraLastAction, setCameraLastAction] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const [showPinyin, setShowPinyin] = useState(true);
  const [showBopomofo, setShowBopomofo] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('auto');
  const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('en');

  const [resultData, setResultData] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [clipboardPrompt, setClipboardPrompt] = useState('');

  const canvasRef = useRef(null);
  const drawContainerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (targetLang?.code) {
      setSelectedTargetLanguage(targetLang.code);
    }
  }, [targetLang?.code]);

  useEffect(() => {
    const checkClipboard = async () => {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.readText) return;
      try {
        const text = (await navigator.clipboard.readText()).trim();
        if (text && text.length <= 60) setClipboardPrompt(text);
      } catch {
        // Ignore permission errors
      }
    };

    checkClipboard();
  }, []);

  useEffect(() => {
    if (mode !== 'draw' || !canvasRef.current || !drawContainerRef.current) return;

    const canvas = canvasRef.current;
    const rect = drawContainerRef.current.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.fillStyle = '#0B0A10';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = lang?.primaryColor || '#00E5FF';
  }, [mode, lang?.primaryColor]);

  const translateNow = async (seed = inputValue) => {
    const source = seed.trim() || DEFAULT_MOCK_TEXT;
    setIsTranslating(true);
    setShowTranslation(true);

    const endpoint = import.meta.env.VITE_TRANSLATE_API_URL;

    try {
      if (!endpoint) {
        setResultData(getMockResult(source));
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: source,
          source: selectedSourceLanguage === 'auto' ? 'auto' : selectedSourceLanguage.split('-')[0],
          target: selectedTargetLanguage.split('-')[0],
          format: 'text'
        })
      });

      const payload = await response.json();
      const translated = payload?.translatedText || payload?.translation || getDefaultEnglishTranslation(source);
      const fallback = getMockResult(source);
      fallback.translatedText = translated;
      // Ensure we keep the 2-paragraph layout even for API results in mock mode
      fallback.translationParagraphs = [
        translated,
        "Second paragraph placeholder for layout testing."
      ];
      setResultData(fallback);
    } catch {
      setResultData(getMockResult(source));
    } finally {
      setIsTranslating(false);
    }
  };

  // --- START RECOVERED FEATURES: CAMERA, VOICE, DRAW ---
  const startVoiceInput = () => {
    const SpeechRecognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
    if (!SpeechRecognition) return;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLang?.code || 'zh-TW';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };
    recognition.onerror = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (!transcript) return;
      setInputValue(transcript);
      translateNow(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const runMockCameraTranslate = (action = 'camera') => {
    setMode('camera');
    setCameraLastAction(action);
    const mockOCR = DEFAULT_MOCK_TEXT;
    setInputValue(mockOCR);
    translateNow(mockOCR);
  };

  const startDrawing = (event) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    isDrawingRef.current = true;
  };

  const draw = (event) => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearDrawing = () => {
    if (!canvasRef.current || !drawContainerRef.current) return;
    const rect = drawContainerRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');
    ctx.fillStyle = '#0B0A10';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  const recognizeDrawing = () => {
    const mockHanzi = '謝謝';
    setInputValue(mockHanzi);
    translateNow(mockHanzi);
  };
  // --- END RECOVERED FEATURES ---

  const saveCurrentSource = () => {
    if (!resultData?.sourceText) return;
    toggleSavedWord({
      token: resultData.sourceText,
      pinyin: 'auto-generated',
      meaning: resultData.translationParagraphs?.[0] || resultData.translatedText || 'translation',
      languageId: sourceLang?.id,
      languageName: sourceLang?.name,
      flag: sourceLang?.flag
    });
  };

  const sendToChat = () => {
    if (!resultData?.sourceText) return;
    const preview = `${resultData.sourceText} → ${resultData.translatedText || ''}`;
    updateChatThreadPreview('ai-momo', preview);
    onNavigate('direct-chat', { threadId: 'ai-momo' });
  };

  const sourceTokens = useMemo(() => tokenizeSentence(resultData?.sourceText || ''), [resultData?.sourceText]);
  const isCurrentSaved = !!(resultData?.sourceText && isWordSaved(resultData.sourceText, sourceLang?.id));
  const canShowResult = !!resultData?.translatedText;

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-hidden">
      {/* HEADER: Added padding top to prevent overlap */}
      <div className="p-4 pt-10 flex items-center bg-[#1E1E2A] border-b-4 border-black gap-2 z-20 shadow-[0_4px_0_#000]">
        <button
          onClick={() => onNavigate('home')}
          className="w-12 h-12 flex-none bg-[#2A2A3B] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000]"
        >
          <ChevronLeft size={28} strokeWidth={3} />
        </button>

        <div className="flex-1 min-w-0 bg-[#2A2A3B] border-4 border-black rounded-2xl px-3 py-1.5 shadow-[4px_4px_0_#000] flex items-center justify-center gap-3">
          <span className="text-white font-black text-xs uppercase tracking-widest text-center truncate">Chinese (Tra)</span>
          <ArrowRight size={14} className="text-[#00E5FF] shrink-0" />
          <span className="text-white font-black text-xs uppercase tracking-widest text-center truncate">English</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={saveCurrentSource}
            className="w-12 h-12 bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-2xl flex items-center justify-center"
            title="Save"
          >
            <Bookmark size={18} strokeWidth={3} className="text-[#FFD100]" fill="#FFD100" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-5">
        <div className="grid grid-cols-4 gap-2">
          {INPUT_MODES.map((item) => {
            const Icon = item.icon;
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id)}
                className={`py-3 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] font-black uppercase text-[10px] tracking-widest flex flex-col items-center gap-1 ${active ? 'bg-[#FFD100] text-black' : 'bg-white text-black'
                  }`}
              >
                <Icon size={16} strokeWidth={3} />
                {item.label}
              </button>
            );
          })}
        </div>

        {mode === 'text' && (
          <div className="bg-white border-4 border-black rounded-[2rem] p-4 shadow-[8px_8px_0_#000]">
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Type, paste, or write your sentence..."
              className="w-full h-32 bg-[#F4F4F5] border-4 border-black rounded-2xl px-4 py-3 text-black font-bold resize-none mb-3"
            />
            {clipboardPrompt && (
              <div className="bg-white border-4 border-black rounded-xl p-3 mb-3 shadow-[4px_4px_0_#000]">
                <p className="text-[10px] uppercase font-black tracking-widest text-[#7A7A9A]">Clipboard</p>
                <p className="text-sm font-bold text-black mt-1">Translate “{clipboardPrompt}” ?</p>
                <button
                  onClick={() => {
                    // MODIFIED: Only set the text from clipboard, not the "Translate..." string
                    setInputValue(clipboardPrompt);
                    setClipboardPrompt('');
                    translateNow(clipboardPrompt);
                  }}
                  className="mt-3 h-8 px-3 rounded-xl bg-[#00E5FF] border-2 border-black text-black text-xs font-black uppercase tracking-widest"
                >
                  Use
                </button>
              </div>
            )}
            <button
              onClick={() => translateNow()}
              className="w-full h-12 bg-[#00FF87] border-4 border-black text-black font-black uppercase tracking-widest rounded-2xl shadow-[4px_4px_0_#000]"
            >
              {isTranslating ? 'Translating...' : 'Translate now'}
            </button>
          </div>
        )}

        {/* RE-INSERTED: CAMERA MODE UI */}
        {mode === 'camera' && (
          <div className="bg-[#0B0A10] border-4 border-black rounded-[2rem] p-4 shadow-[8px_8px_0_#000] text-white">
            <div className="relative h-44 rounded-2xl border-4 border-dashed border-[#00E5FF] overflow-hidden flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-[#A1A1AA]">
                <ScanLine size={42} className="animate-pulse" />
                <p className="text-xs font-black uppercase tracking-widest">Camera OCR Frame</p>
              </div>
            </div>
            <div className="mt-4 relative flex items-center justify-center">
              <button onClick={() => runMockCameraTranslate('Gallery')} className="absolute left-0 w-14 h-14 rounded-2xl bg-[#2A2A3B] border-4 border-white/60 text-white flex items-center justify-center"><Images size={24} /></button>
              <button onClick={() => runMockCameraTranslate('AR Camera')} className="w-20 h-20 rounded-full bg-white border-4 border-black text-black shadow-[4px_4px_0_#000] flex items-center justify-center"><Camera size={30} /></button>
            </div>
          </div>
        )}

        {/* RE-INSERTED: VOICE MODE UI */}
        {mode === 'voice' && (
          <div className="bg-white border-4 border-black rounded-[2rem] p-4 shadow-[8px_8px_0_#000]">
            <div className="h-44 rounded-2xl border-4 border-black bg-[#2A2A3B] flex flex-col items-center justify-center gap-4">
              <button onClick={startVoiceInput} className={`w-20 h-20 rounded-full border-4 border-black flex items-center justify-center ${isRecording ? 'bg-[#FF426A] text-white animate-pulse' : 'bg-[#00E5FF] text-black'}`}><Mic size={30} /></button>
              <p className="text-xs font-black uppercase tracking-widest text-white">{isRecording ? 'Listening...' : 'Tap to start voice input'}</p>
            </div>
          </div>
        )}

        {/* RE-INSERTED: DRAW MODE UI */}
        {mode === 'draw' && (
          <div className="bg-white border-4 border-black rounded-[2rem] p-4 shadow-[8px_8px_0_#000]">
            <div ref={drawContainerRef} className="relative h-44 rounded-2xl border-4 border-black bg-[#0B0A10] overflow-hidden" onPointerDown={startDrawing} onPointerMove={draw} onPointerUp={stopDrawing} onPointerLeave={stopDrawing}>
              <canvas ref={canvasRef} className="absolute inset-0" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={clearDrawing} className="h-10 rounded-xl bg-white border-4 border-black text-black font-black text-xs uppercase">Clear</button>
              <button onClick={recognizeDrawing} className="h-10 rounded-xl bg-[#FFD100] border-4 border-black text-black font-black text-xs uppercase">Recognize</button>
            </div>
          </div>
        )}

        {canShowResult && (
          <>
            {/* TOGGLE BUTTONS */}
            <div className="flex gap-3">
              <button onClick={() => setShowPinyin(!showPinyin)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] font-black uppercase tracking-widest text-[9px] ${showPinyin ? 'bg-[#FF426A] text-white' : 'bg-white text-black'}`}>{showPinyin ? <EyeOff size={14} /> : <Eye size={14} />} Pinyin</button>
              <button onClick={() => setShowBopomofo(!showBopomofo)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] font-black uppercase tracking-widest text-[9px] ${showBopomofo ? 'bg-[#A25BFF] text-white' : 'bg-white text-black'}`}>{showBopomofo ? <EyeOff size={14} /> : <Eye size={14} />} Zhuyin</button>
              <button onClick={() => setShowTranslation(!showTranslation)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] font-black uppercase tracking-widest text-[9px] ${showTranslation ? 'bg-[#00E5FF] text-black' : 'bg-white text-black'}`}>{showTranslation ? <EyeOff size={14} /> : <Eye size={14} />} English</button>
            </div>

            <div className="bg-white border-4 border-black rounded-[2rem] p-5 shadow-[8px_8px_0_#000] space-y-3">
              <div className="flex flex-wrap gap-x-[1px] gap-y-2 items-end">
                {sourceTokens.map((token, index) => (
                  token.isNewline ? (
                    <div key={index} className="w-full h-2" />
                  ) : token.punctuation ? (
                    <span key={index} className="text-xl font-serif font-black text-black leading-none">{token.text}</span>
                  ) : (
                    <button key={index} onClick={() => setSelectedToken(token)} className="flex flex-col items-center text-black">
                      {showBopomofo && <span className="text-[9px] font-black text-[#FF426A] leading-tight mb-0.5">{token.bopomofo !== '-' ? token.bopomofo : '\u00A0'}</span>}
                      {showPinyin && <span className="text-[9px] font-black text-[#A25BFF] leading-tight mb-0.5">{token.pinyin !== '-' ? token.pinyin : '\u00A0'}</span>}
                      <span className="text-xl font-serif font-black leading-none">{token.text}</span>
                    </button>
                  )
                ))}
              </div>

              {/* MODIFIED: Mapping paragraphs to ensure 2 paragraphs show up */}
              {showTranslation && (
                <div className="bg-[#F4F4F5] border-4 border-black rounded-2xl p-3">
                  <p className="text-[10px] uppercase tracking-widest font-black text-[#7A7A9A]">English Translation</p>
                  {resultData.translationParagraphs.map((paragraph, idx) => (
                    <p key={idx} className={`text-base font-black text-[#2A2A3B] leading-snug ${idx > 0 ? 'mt-3 pt-3 border-t-2 border-dashed border-gray-300' : 'mt-1'}`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="absolute bottom-0 w-full bg-[#2A2A3B] border-t-4 border-black p-4 pb-8 z-10">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { /* Audio Logic */ }} className="bg-white border-4 border-black text-black font-black py-3 rounded-xl shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 uppercase text-[10px]"><Volume2 size={18} /> Audio</button>
          <button onClick={saveCurrentSource} className="bg-[#FFD100] border-4 border-black text-black font-black py-3 rounded-xl shadow-[4px_4px_0_#000] flex items-center justify-center gap-2 uppercase text-[10px]"><Bookmark size={18} /> Save</button>
        </div>
      </div>

      {/* TOKEN MODAL */}
      {selectedToken && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-[#0B0A10]/80 backdrop-blur-sm" onClick={() => setSelectedToken(null)} />
          <div className="bg-white border-4 border-black rounded-[2rem] p-6 w-full max-w-sm relative z-10 shadow-[12px_12px_0_#A25BFF]">
            <button onClick={() => setSelectedToken(null)} className="absolute top-4 right-4 w-10 h-10 bg-[#FF426A] border-4 border-black rounded-xl flex items-center justify-center text-white"><X size={20} strokeWidth={4} /></button>
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <span className="text-[#FF426A] font-black text-xs uppercase mb-0.5">{selectedToken.bopomofo !== '-' ? selectedToken.bopomofo : ''}</span>
              <span className="text-[#A25BFF] font-black text-lg uppercase mb-1">{selectedToken.pinyin}</span>
              <span className="text-6xl font-serif font-black text-black mb-4">{selectedToken.text}</span>
              <span className="text-black font-black text-xl px-4 py-2 border-4 border-black rounded-xl bg-[#00FF87]">{selectedToken.meaning}</span>
            </div>
            <button
              onClick={() => { /* UI-only audio button */ }}
              className="w-full flex items-center justify-center gap-2 py-3 mb-3 bg-white border-4 border-black shadow-[4px_4px_0_#000] rounded-xl font-black text-black uppercase tracking-widest text-xs"
            >
              <Volume2 size={18} strokeWidth={3} /> Audio
            </button>
            <button
              onClick={() => {
                // Implement save logic here later
                setSelectedToken(null);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#FFD100] border-4 border-black shadow-[4px_4px_0_#000] rounded-xl font-black text-black uppercase tracking-widest text-sm"
            >
              <Bookmark size={20} strokeWidth={3} /> Save Word
            </button>
          </div>
        </div>
      )}
    </div>
  );
}