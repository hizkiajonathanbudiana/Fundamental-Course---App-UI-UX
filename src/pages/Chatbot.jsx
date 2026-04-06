import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, Mic, Send, Volume2, X } from 'lucide-react';
import MascotRenderer from '../components/MascotRenderer';
import { useAppContext } from '../context/AppContext';
import {
  CHATBOT_DATA,
  getBotResponse,
  getChatbotSubtopics,
  getChatbotTopics,
  getSuggestedResponses
} from '../constants/chatbotData';

const LEVEL_HINTS = {
  beginner: ['beginner', 'pemula', 'dasar'],
  intermediate: ['intermediate', 'menengah'],
  advanced: ['advanced', 'lanjut', 'mahir']
};

const SPEECH_LOCALES = {
  zh_tw: 'zh-TW',
  zh_cn: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  th: 'th-TH',
  vi: 'vi-VN',
  en: 'en-US',
  es: 'es-ES',
  ru: 'ru-RU'
};

const WORD_BANK = {
  '你好': { pinyin: 'nǐ hǎo', meaning: 'hello' },
  '很高兴': { pinyin: 'hěn gāoxìng', meaning: 'very happy' },
  '见到': { pinyin: 'jiàndào', meaning: 'to meet' },
  '你': { pinyin: 'nǐ', meaning: 'you' },
  '嗨': { pinyin: 'hāi', meaning: 'hi' },
  '今天': { pinyin: 'jīntiān', meaning: 'today' },
  '怎么样': { pinyin: 'zěnmeyàng', meaning: 'how is it' },
  '我': { pinyin: 'wǒ', meaning: 'I / me' },
  '叫': { pinyin: 'jiào', meaning: 'to be called' },
  '可以': { pinyin: 'kěyǐ', meaning: 'can / may' },
  '今年': { pinyin: 'jīnnián', meaning: 'this year' },
  '岁': { pinyin: 'suì', meaning: 'years old' },
  '最': { pinyin: 'zuì', meaning: 'most' },
  '喜欢': { pinyin: 'xǐhuān', meaning: 'to like' },
  '吃': { pinyin: 'chī', meaning: 'to eat' },
  '面条': { pinyin: 'miàntiáo', meaning: 'noodles' },
  '我们': { pinyin: 'wǒmen', meaning: 'we / us' },
  '去哪裡': { pinyin: 'qù nǎlǐ', meaning: 'where to go' },
  '去哪': { pinyin: 'qù nǎ', meaning: 'where to go' },
  '再见': { pinyin: 'zàijiàn', meaning: 'goodbye' },
  '谢谢': { pinyin: 'xièxie', meaning: 'thank you' },
  '是': { pinyin: 'shì', meaning: 'yes / to be' },
  '不是': { pinyin: 'búshì', meaning: 'not / no' }
};

const FALLBACK_SUBTOPICS = [
  { id: 'warmup', name: 'Warm-up Chat', emoji: '💬' },
  { id: 'smalltalk', name: 'Small Talk', emoji: '🗨️' },
  { id: 'roleplay', name: 'Mini Roleplay', emoji: '🎭' }
];

const normalize = (value) => value.toLowerCase().trim();

const findByInput = (options, value) => {
  const text = normalize(value);
  return options.find((option) => {
    const optionText = normalize(option.name);
    return optionText.includes(text) || text.includes(optionText);
  });
};

const inferLevel = (value) => {
  const text = normalize(value);
  return Object.keys(LEVEL_HINTS).find((key) => LEVEL_HINTS[key].some((hint) => text.includes(hint)));
};

const isHanCharacter = (char) => {
  const code = char.charCodeAt(0);
  return code >= 0x3400 && code <= 0x9fff;
};

const DICTIONARY_KEYS = Object.keys(WORD_BANK).sort((a, b) => b.length - a.length);

const parseRichSentence = (content) => {
  const cleaned = content.trim();
  const richMatch = cleaned.match(/^(.*?)\s*\(([^()]*)\)\s*-\s*(.*)$/);

  if (richMatch) {
    return {
      sentence: richMatch[1].trim(),
      pinyin: richMatch[2].trim(),
      meaning: richMatch[3].trim()
    };
  }

  return {
    sentence: cleaned,
    pinyin: '',
    meaning: ''
  };
};

const tokenizeSentence = (sentence) => {
  const cleaned = sentence.replace(/[，。！？,.!?]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];

  const tokens = [];
  let index = 0;

  while (index < cleaned.length) {
    const char = cleaned[index];

    if (char === ' ') {
      index += 1;
      continue;
    }

    if (isHanCharacter(char)) {
      let matched = null;
      for (const key of DICTIONARY_KEYS) {
        if (cleaned.startsWith(key, index)) {
          matched = key;
          break;
        }
      }

      if (matched) {
        tokens.push(matched);
        index += matched.length;
      } else {
        tokens.push(char);
        index += 1;
      }
      continue;
    }

    const latinMatch = cleaned.slice(index).match(/^[A-Za-z0-9']+/);
    if (latinMatch) {
      tokens.push(latinMatch[0]);
      index += latinMatch[0].length;
      continue;
    }

    index += 1;
  }

  return tokens;
};

const buildMessageBreakdown = (message) => {
  const { sentence, pinyin, meaning } = parseRichSentence(message.content);
  const tokens = tokenizeSentence(sentence);

  const rows = tokens.map((token) => {
    const dictionary = WORD_BANK[token];
    return {
      token,
      pinyin: dictionary?.pinyin || '-',
      meaning: dictionary?.meaning || 'context word'
    };
  });

  if (!rows.length) {
    rows.push({
      token: sentence || message.content,
      pinyin: pinyin || '-',
      meaning: meaning || (message.type === 'bot' ? 'bot response' : 'user response')
    });
  }

  return {
    sentence: sentence || message.content,
    pinyin: pinyin || 'Pinyin not detected',
    meaning: meaning || (message.type === 'bot' ? 'Tap listening or speaking to practice this sentence.' : 'Free-form learner response.'),
    rows
  };
};

const normalizeForCompare = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\u3400-\u9fff]+/g, '')
    .trim();

const getSimilarityScore = (source, target) => {
  if (!source && !target) return 1;
  if (!source || !target) return 0;

  const matrix = Array.from({ length: source.length + 1 }, () => Array(target.length + 1).fill(0));

  for (let i = 0; i <= source.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= target.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= source.length; i += 1) {
    for (let j = 1; j <= target.length; j += 1) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[source.length][target.length];
  return 1 - distance / Math.max(source.length, target.length);
};

export default function Chatbot({ onNavigate, lang }) {
  const { toggleSavedWord, isWordSaved } = useAppContext();

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `Hi! I'm ${lang.mascotName}. What's your level now?`,
      helper: 'Choose an option below or type your own answer.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('ask_level');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [practiceStatus, setPracticeStatus] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const recognitionRef = useRef(null);
  const quickOptionsScrollerRef = useRef(null);

  const topicOptions = selectedLevel ? getChatbotTopics(selectedLevel) : [];
  const rawSubtopics = selectedLevel && selectedTopic ? getChatbotSubtopics(selectedLevel, selectedTopic) : [];
  const subtopicOptions = rawSubtopics.length ? rawSubtopics : FALLBACK_SUBTOPICS;

  const quickOptions = useMemo(() => {
    if (step === 'ask_level') {
      return CHATBOT_DATA.levels.map((level) => ({
        label: `${level.emoji} ${level.name}`,
        value: level.name
      }));
    }

    if (step === 'ask_topic') {
      return topicOptions.map((topic) => ({
        label: `${topic.emoji} ${topic.name}`,
        value: topic.name
      }));
    }

    if (step === 'ask_subtopic') {
      return subtopicOptions.map((subtopic) => ({
        label: `${subtopic.emoji} ${subtopic.name}`,
        value: subtopic.name
      }));
    }

    if (step === 'free_chat' && selectedLevel && selectedTopic && selectedSubtopic) {
      return getSuggestedResponses(selectedLevel, selectedTopic, selectedSubtopic).map((option) => ({
        label: option.text,
        value: option.chinese || option.text
      }));
    }

    return [];
  }, [selectedLevel, selectedSubtopic, selectedTopic, step, subtopicOptions, topicOptions]);

  const selectedMessage = selectedMessageIndex === null ? null : messages[selectedMessageIndex] || null;

  const selectedBreakdown = useMemo(() => {
    if (!selectedMessage) return null;
    return buildMessageBreakdown(selectedMessage);
  }, [selectedMessage]);

  const lastBotMessageIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].type === 'bot') return i;
    }
    return null;
  }, [messages]);

  const pushBotMessage = (content, helper = '') => {
    setMessages((prev) => [...prev, { type: 'bot', content, helper }]);
  };

  const handleConversation = (userInput) => {
    const userText = userInput.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { type: 'user', content: userText }]);

    if (step === 'ask_level') {
      const inferred = inferLevel(userText);
      if (!inferred) {
        pushBotMessage('I could not detect your level yet.', 'Try typing beginner, intermediate, or advanced.');
        return;
      }

      setSelectedLevel(inferred);
      setStep('ask_topic');
      pushBotMessage(`Great, your level is ${inferred}. Which topic do you want?`, 'You can tap an option or type your own topic.');
      return;
    }

    if (step === 'ask_topic') {
      const topic = findByInput(topicOptions, userText);
      if (!topic) {
        pushBotMessage('I cannot find that topic in the list yet.', 'Pick one of the options above or type a similar topic name.');
        return;
      }

      setSelectedTopic(topic.id);
      setStep('ask_subtopic');
      pushBotMessage(`Nice, topic ${topic.name}. Which subtopic do you want?`, 'After this, we will jump into free chat.');
      return;
    }

    if (step === 'ask_subtopic') {
      const subtopic = findByInput(subtopicOptions, userText);
      if (!subtopic) {
        pushBotMessage('I cannot find that subtopic yet.', 'Pick a subtopic from the options above or type a similar one.');
        return;
      }

      setSelectedSubtopic(subtopic.id);
      setStep('free_chat');

      const starter = getBotResponse(selectedLevel, selectedTopic, subtopic.id)[0] || 'Let us start chatting.';
      pushBotMessage(starter, 'Now you can type freely or use quick replies.');
      return;
    }

    if (step === 'free_chat') {
      const responses = getBotResponse(selectedLevel, selectedTopic, selectedSubtopic);
      const randomReply = responses[Math.floor(Math.random() * responses.length)] || 'Great. Keep going!';
      pushBotMessage(randomReply, 'Type another message or choose a quick reply.');
    }
  };

  const sendFromInput = () => {
    handleConversation(inputValue);
    setInputValue('');
  };

  const speakText = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LOCALES[lang.id] || 'zh-TW';
    utterance.rate = 0.92;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  const handleListeningPractice = (preferredIndex = selectedMessageIndex) => {
    const targetIndex = preferredIndex ?? lastBotMessageIndex;
    if (targetIndex === null || targetIndex === undefined) {
      setPracticeStatus('Pick or send a target sentence for listening practice first.');
      return;
    }

    setSelectedMessageIndex(targetIndex);
    const details = buildMessageBreakdown(messages[targetIndex]);
    const success = speakText(details.sentence);
    setPracticeStatus(success ? 'Listening mode is on: listen and repeat the sentence.' : 'Your browser does not support text-to-speech yet.');
  };

  const handleSpeakingPractice = (preferredIndex = selectedMessageIndex) => {
    const targetIndex = preferredIndex ?? lastBotMessageIndex;
    if (targetIndex === null || targetIndex === undefined) {
      setPracticeStatus('Pick or send a target sentence for speaking practice first.');
      return;
    }

    setSelectedMessageIndex(targetIndex);

    const SpeechRecognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
    if (!SpeechRecognition) {
      setPracticeStatus('Speech recognition is not available in this browser.');
      return;
    }

    const targetSentence = buildMessageBreakdown(messages[targetIndex]).sentence;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LOCALES[lang.id] || 'zh-TW';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecognizing(true);
      setPracticeStatus('Speaking mode is on: say the target sentence now.');
    };

    recognition.onerror = (event) => {
      setIsRecognizing(false);
      setPracticeStatus(`Voice capture failed (${event.error}). Please try again.`);
    };

    recognition.onend = () => {
      setIsRecognizing(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';

      if (!transcript) {
        setPracticeStatus('No voice detected. Please repeat speaking practice.');
        return;
      }

      setInputValue(transcript);

      const score = getSimilarityScore(normalizeForCompare(targetSentence), normalizeForCompare(transcript));
      const percent = Math.max(0, Math.round(score * 100));

      pushBotMessage(`I heard: "${transcript}"`, `Your speaking match is around ${percent}%. Press Send if you want to post it as chat.`);
      setPracticeStatus(`Speaking result: ${percent}% similarity to target sentence.`);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleToggleSavedWord = (row) => {
    toggleSavedWord({
      token: row.token,
      pinyin: row.pinyin,
      meaning: row.meaning,
      languageId: lang.id,
      languageName: lang.name,
      flag: lang.flag
    });
  };

  const handleQuickOptionsWheel = (event) => {
    const scroller = quickOptionsScrollerRef.current;
    if (!scroller) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      scroller.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A] relative">
      <div className="p-4 pt-8 border-b-4 border-black flex items-center bg-[#2A2A3B] z-20 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('home')} className="p-2 flex-none text-white hover:text-white transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <div className="relative w-14 h-14 flex-none ml-2 border-4 border-black rounded-2xl overflow-hidden" style={{ backgroundColor: lang.primaryColor }}>
          <MascotRenderer languageId={lang.id} mood="happy" animated={true} />
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="text-white font-black text-xl leading-tight uppercase tracking-wider truncate">{lang.mascotName} (AI)</h3>
          <span className="text-black px-2 rounded-md text-xs font-black flex items-center gap-1.5 uppercase tracking-widest mt-1 w-max border-2 border-black" style={{ backgroundColor: lang.secondaryColor }}>
            <span className="w-2 h-2 bg-black rounded-full flex-none animate-pulse"></span> Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-[26rem] scrollbar-hide">
        {messages.map((message, index) => (
          <div key={`${message.type}-${index}`} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div
              onClick={() => {
                setSelectedMessageIndex(index);
                setPracticeStatus('');
              }}
              className={`text-left max-w-[86%] border-4 border-black p-4 rounded-[1.5rem] shadow-[6px_6px_0_#000] cursor-pointer active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all ${message.type === 'bot' ? 'rounded-tl-none bg-white text-black' : 'rounded-tr-none text-black'}`}
              style={message.type === 'user' ? { backgroundColor: lang.secondaryColor } : undefined}
            >
              <p className="font-black text-sm leading-relaxed break-words">{message.content}</p>
              {!!message.helper && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">{message.helper}</p>}
              <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-[#111827]">Tap for meaning breakdown</p>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleListeningPractice(index);
                  }}
                  className="h-8 px-2 rounded-lg border-2 border-black bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                >
                  <Volume2 size={12} strokeWidth={3} /> Listen
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleSpeakingPractice(index);
                  }}
                  className="h-8 px-2 rounded-lg border-2 border-black bg-[#FFD100] text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                >
                  <Mic size={12} strokeWidth={3} /> Speak
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[85px] w-full bg-[#2A2A3B] border-t-4 border-black p-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] z-10">
        <div
          ref={quickOptionsScrollerRef}
          onWheel={handleQuickOptionsWheel}
          className="overflow-x-auto scrollbar-hide mb-3"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
        >
          <div className="flex w-max gap-2 pr-2">
            {quickOptions.map((option, index) => (
              <button
                key={`${option.value}-${index}`}
                onClick={() => handleConversation(option.value)}
                className="flex-none snap-start px-3 py-2 rounded-xl border-4 border-black bg-white text-black text-xs font-black uppercase tracking-widest shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {practiceStatus && <p className="mb-3 text-xs font-black text-white uppercase tracking-widest">{practiceStatus}</p>}

        <div className="flex gap-3 items-center">
          <button
            onClick={handleSpeakingPractice}
            className="w-14 h-14 flex-none rounded-2xl bg-white text-black flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <Mic size={28} strokeWidth={3} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendFromInput();
            }}
            placeholder="Type your reply..."
            className="flex-1 min-w-0 h-14 bg-white border-4 border-black rounded-2xl px-4 text-black font-black focus:outline-none shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]"
          />
          <button
            onClick={sendFromInput}
            className="w-14 h-14 flex-none rounded-2xl text-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            style={{ backgroundColor: lang.primaryColor }}
          >
            <Send size={24} strokeWidth={3} />
          </button>
        </div>
      </div>

      {selectedMessage && selectedBreakdown && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedMessageIndex(null)}
          />

          <div className="relative bg-[#1E1E2A] border-t-8 border-black rounded-t-[2.5rem] p-6 max-h-[75%] overflow-y-auto">
            <button
              onClick={() => setSelectedMessageIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white border-4 border-black text-black flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD100] mb-2">
              {selectedMessage.type === 'bot' ? 'Bot message' : 'Your message'}
            </p>
            <h3 className="text-white font-black text-xl leading-snug pr-12 mb-3">{selectedBreakdown.sentence}</h3>
            <p className="text-xs font-black uppercase tracking-widest text-black bg-[#00E5FF] border-2 border-black rounded-lg px-3 py-2 inline-block mb-2">
              {selectedBreakdown.pinyin}
            </p>
            <p className="text-sm font-bold text-white mb-5">{selectedBreakdown.meaning}</p>

            <div className="grid grid-cols-1 gap-3 mb-5">
              {selectedBreakdown.rows.map((row, index) => {
                const isSaved = isWordSaved(row.token, lang.id);

                return (
                  <div key={`${row.token}-${index}`} className="bg-white border-4 border-black rounded-2xl p-3 shadow-[3px_3px_0_#000] flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-black text-black truncate">{row.token}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] truncate">{row.pinyin}</p>
                      <p className="text-sm font-bold text-black truncate">{row.meaning}</p>
                    </div>
                    <button
                      onClick={() => handleToggleSavedWord(row)}
                      className={`w-10 h-10 rounded-xl border-4 border-black flex items-center justify-center ${isSaved ? 'bg-[#FFD100]' : 'bg-[#F3F4F6]'} active:translate-y-[2px] transition-all`}
                    >
                      <Bookmark size={18} strokeWidth={3} fill={isSaved ? '#000' : 'none'} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleListeningPractice(selectedMessageIndex)}
                className="h-12 rounded-xl bg-white border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <Volume2 size={18} strokeWidth={3} /> Listen
              </button>
              <button
                onClick={handleSpeakingPractice}
                className="h-12 rounded-xl border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                style={{ backgroundColor: lang.secondaryColor }}
              >
                <Mic size={18} strokeWidth={3} /> Speak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
