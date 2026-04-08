import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, Languages, Mic, Send, Volume2, WandSparkles, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const STARTER_MESSAGES = {
  'chen-wei': [
    { id: 'm1', sender: 'friend', text: '我可以幫你練習聲調，你現在方便嗎？' }
  ],
  'sarah-k': [
    { id: 'm1', sender: 'friend', text: '我剛寫好一段自我介紹，你可以幫我修正嗎？' },
    { id: 'm2', sender: 'you', text: '可以，我們一起改成更自然的說法。' }
  ],
  kenji: [
    { id: 'm1', sender: 'friend', text: '這週末要不要一起做旅遊情境對話？' }
  ],
  luna: [
    { id: 'm1', sender: 'friend', text: '我們今天來練習問路句型吧！' }
  ],
  mika: [
    { id: 'm1', sender: 'friend', text: '我想每天用繁體中文聊十分鐘，你覺得如何？' }
  ],
  anya: [
    { id: 'm1', sender: 'friend', text: '這句話的語氣夠禮貌嗎？我怕太直接。' }
  ],
  rika: [
    { id: 'm1', sender: 'friend', text: '通勤中，我們來做一句一句跟讀練習。' }
  ],
  soojin: [
    { id: 'm1', sender: 'friend', text: '今天目標：聊天全程只用繁體中文！' }
  ]
};

const FALLBACK_REPLY = [
  '好啊，我們就這樣練習。',
  '這句很自然，我學到了！',
  '好主意，我們繼續用繁體中文聊。',
  '收到，我來試著回覆看看。'
];

const SENTENCE_TRANSLATION_BANK = {
  '我可以幫你練習聲調你現在方便嗎': 'I can help you practice tones. Are you available now?',
  '我剛寫好一段自我介紹你可以幫我修正嗎': 'I just wrote a self-introduction. Can you help me revise it?',
  '可以我們一起改成更自然的說法': 'Sure, let’s make it sound more natural together.',
  '這週末要不要一起做旅遊情境對話': 'Do you want to practice travel scenario dialogue this weekend?',
  '我們今天來練習問路句型吧': 'Let’s practice asking-for-directions sentence patterns today.',
  '我想每天用繁體中文聊十分鐘你覺得如何': 'I want to chat in Traditional Chinese for ten minutes every day. What do you think?',
  '這句話的語氣夠禮貌嗎我怕太直接': 'Is this sentence polite enough? I am worried it sounds too direct.',
  '通勤中我們來做一句一句跟讀練習': 'During commute, let’s do sentence-by-sentence shadowing practice.',
  '今天目標聊天全程只用繁體中文': 'Today’s goal: use only Traditional Chinese for the whole chat.',
  '好啊我們就這樣練習': 'Sure, let’s practice like this.',
  '這句很自然我學到了': 'This sentence sounds natural. I learned something new!',
  '好主意我們繼續用繁體中文聊': 'Great idea. Let’s continue chatting in Traditional Chinese.',
  '收到我來試著回覆看看': 'Got it, I’ll try to reply now.'
};

const normalizeSentenceKey = (text = '') => text.replace(/[^a-zA-Z0-9\u3400-\u9fff]+/g, '').trim();

const SENTENCE_TRANSLATION_BANK_NORMALIZED = Object.fromEntries(
  Object.entries(SENTENCE_TRANSLATION_BANK).map(([key, value]) => [normalizeSentenceKey(key), value])
);

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
  '我可以': { pinyin: 'wǒ kě yǐ', bopomofo: 'ㄨㄛˇ ㄎㄜˇ ㄧˇ', meaning: 'I can' },
  '幫你': { pinyin: 'bāng nǐ', bopomofo: 'ㄅㄤ ㄋㄧˇ', meaning: 'help you' },
  '練習': { pinyin: 'liàn xí', bopomofo: 'ㄌㄧㄢˋ ㄒㄧˊ', meaning: 'practice' },
  '聲調': { pinyin: 'shēng diào', bopomofo: 'ㄕㄥ ㄉㄧㄠˋ', meaning: 'tones' },
  '你現在': { pinyin: 'nǐ xiàn zài', bopomofo: 'ㄋㄧˇ ㄒㄧㄢˋ ㄗㄞˋ', meaning: 'you now' },
  '方便嗎': { pinyin: 'fāng biàn ma', bopomofo: 'ㄈㄤ ㄅㄧㄢˋ ㄇㄚ˙', meaning: 'is it convenient?' },
  '這週末': { pinyin: 'zhè zhōu mò', bopomofo: 'ㄓㄜˋ ㄓㄡ ㄇㄛˋ', meaning: 'this weekend' },
  '要不要': { pinyin: 'yào bú yào', bopomofo: 'ㄧㄠˋ ㄅㄨˊ ㄧㄠˋ', meaning: 'want to or not' },
  '旅遊': { pinyin: 'lǚ yóu', bopomofo: 'ㄌㄩˇ ㄧㄡˊ', meaning: 'travel' },
  '情境': { pinyin: 'qíng jìng', bopomofo: 'ㄑㄧㄥˊ ㄐㄧㄥˋ', meaning: 'scenario' },
  '對話': { pinyin: 'duì huà', bopomofo: 'ㄉㄨㄟˋ ㄏㄨㄚˋ', meaning: 'dialogue' },
  '繁體中文': { pinyin: 'fán tǐ zhōng wén', bopomofo: 'ㄈㄢˊ ㄊㄧˇ ㄓㄨㄥ ㄨㄣˊ', meaning: 'Traditional Chinese' },
  '自我介紹': { pinyin: 'zì wǒ jiè shào', bopomofo: 'ㄗˋ ㄨㄛˇ ㄐㄧㄝˋ ㄕㄠˋ', meaning: 'self introduction' },
  '修正': { pinyin: 'xiū zhèng', bopomofo: 'ㄒㄧㄡ ㄓㄥˋ', meaning: 'revise / correct' },
  '更自然': { pinyin: 'gèng zì rán', bopomofo: 'ㄍㄥˋ ㄗˋ ㄖㄢˊ', meaning: 'more natural' },
  '說法': { pinyin: 'shuō fǎ', bopomofo: 'ㄕㄨㄛ ㄈㄚˇ', meaning: 'expression / phrasing' },
  '問路': { pinyin: 'wèn lù', bopomofo: 'ㄨㄣˋ ㄌㄨˋ', meaning: 'ask for directions' },
  '句型': { pinyin: 'jù xíng', bopomofo: 'ㄐㄩˋ ㄒㄧㄥˊ', meaning: 'sentence pattern' },
  '十分鐘': { pinyin: 'shí fēn zhōng', bopomofo: 'ㄕˊ ㄈㄣ ㄓㄨㄥ', meaning: 'ten minutes' },
  '你覺得如何': { pinyin: 'nǐ jué de rú hé', bopomofo: 'ㄋㄧˇ ㄐㄩㄝˊ ㄉㄜ˙ ㄖㄨˊ ㄏㄜˊ', meaning: 'what do you think' },
  '禮貌': { pinyin: 'lǐ mào', bopomofo: 'ㄌㄧˇ ㄇㄠˋ', meaning: 'polite' },
  '太直接': { pinyin: 'tài zhí jiē', bopomofo: 'ㄊㄞˋ ㄓˊ ㄐㄧㄝ', meaning: 'too direct' },
  '通勤': { pinyin: 'tōng qín', bopomofo: 'ㄊㄨㄥ ㄑㄧㄣˊ', meaning: 'commute' },
  '跟讀': { pinyin: 'gēn dú', bopomofo: 'ㄍㄣ ㄉㄨˊ', meaning: 'shadow reading' },
  '今天目標': { pinyin: 'jīn tiān mù biāo', bopomofo: 'ㄐㄧㄣ ㄊㄧㄢ ㄇㄨˋ ㄅㄧㄠ', meaning: 'today goal' },
  '聊天全程': { pinyin: 'liáo tiān quán chéng', bopomofo: 'ㄌㄧㄠˊ ㄊㄧㄢ ㄑㄩㄢˊ ㄔㄥˊ', meaning: 'whole chat session' },
  '這樣練習': { pinyin: 'zhè yàng liàn xí', bopomofo: 'ㄓㄜˋ ㄧㄤˋ ㄌㄧㄢˋ ㄒㄧˊ', meaning: 'practice like this' },
  '我學到了': { pinyin: 'wǒ xué dào le', bopomofo: 'ㄨㄛˇ ㄒㄩㄝˊ ㄉㄠˋ ㄌㄜ˙', meaning: 'I learned it' },
  '好主意': { pinyin: 'hǎo zhǔ yì', bopomofo: 'ㄏㄠˇ ㄓㄨˇ ㄧˋ', meaning: 'great idea' },
  '我': { pinyin: 'wǒ', bopomofo: 'ㄨㄛˇ', meaning: 'I / me' },
  '可': { pinyin: 'kě', bopomofo: 'ㄎㄜˇ', meaning: 'can' },
  '以': { pinyin: 'yǐ', bopomofo: 'ㄧˇ', meaning: 'to / by' },
  '幫': { pinyin: 'bāng', bopomofo: 'ㄅㄤ', meaning: 'help' },
  '你': { pinyin: 'nǐ', bopomofo: 'ㄋㄧˇ', meaning: 'you' },
  '練': { pinyin: 'liàn', bopomofo: 'ㄌㄧㄢˋ', meaning: 'practice' },
  '習': { pinyin: 'xí', bopomofo: 'ㄒㄧˊ', meaning: 'practice / learn' },
  '聲': { pinyin: 'shēng', bopomofo: 'ㄕㄥ', meaning: 'sound / tone' },
  '調': { pinyin: 'diào', bopomofo: 'ㄉㄧㄠˋ', meaning: 'tone' },
  '現': { pinyin: 'xiàn', bopomofo: 'ㄒㄧㄢˋ', meaning: 'current / now' },
  '在': { pinyin: 'zài', bopomofo: 'ㄗㄞˋ', meaning: 'at / now' },
  '方': { pinyin: 'fāng', bopomofo: 'ㄈㄤ', meaning: 'way / side' },
  '便': { pinyin: 'biàn', bopomofo: 'ㄅㄧㄢˋ', meaning: 'convenient' },
  '嗎': { pinyin: 'ma', bopomofo: 'ㄇㄚ˙', meaning: 'question particle' },
  '這': { pinyin: 'zhè', bopomofo: 'ㄓㄜˋ', meaning: 'this' },
  '句': { pinyin: 'jù', bopomofo: 'ㄐㄩˋ', meaning: 'sentence' },
  '話': { pinyin: 'huà', bopomofo: 'ㄏㄨㄚˋ', meaning: 'speech / sentence' },
  '語': { pinyin: 'yǔ', bopomofo: 'ㄩˇ', meaning: 'language' },
  '氣': { pinyin: 'qì', bopomofo: 'ㄑㄧˋ', meaning: 'tone / mood' },
  '夠': { pinyin: 'gòu', bopomofo: 'ㄍㄡˋ', meaning: 'enough' },
  '禮': { pinyin: 'lǐ', bopomofo: 'ㄌㄧˇ', meaning: 'polite / etiquette' },
  '貌': { pinyin: 'mào', bopomofo: 'ㄇㄠˋ', meaning: 'manner' },
  '怕': { pinyin: 'pà', bopomofo: 'ㄆㄚˋ', meaning: 'afraid' },
  '太': { pinyin: 'tài', bopomofo: 'ㄊㄞˋ', meaning: 'too' },
  '直': { pinyin: 'zhí', bopomofo: 'ㄓˊ', meaning: 'direct / straight' },
  '接': { pinyin: 'jiē', bopomofo: 'ㄐㄧㄝ', meaning: 'connect / direct' },
  '週': { pinyin: 'zhōu', bopomofo: 'ㄓㄡ', meaning: 'week' },
  '末': { pinyin: 'mò', bopomofo: 'ㄇㄛˋ', meaning: 'end' },
  '要': { pinyin: 'yào', bopomofo: 'ㄧㄠˋ', meaning: 'want / need' },
  '不': { pinyin: 'bù', bopomofo: 'ㄅㄨˋ', meaning: 'not' },
  '一': { pinyin: 'yì', bopomofo: 'ㄧˋ', meaning: 'one' },
  '起': { pinyin: 'qǐ', bopomofo: 'ㄑㄧˇ', meaning: 'together' },
  '做': { pinyin: 'zuò', bopomofo: 'ㄗㄨㄛˋ', meaning: 'do' },
  '旅': { pinyin: 'lǚ', bopomofo: 'ㄌㄩˇ', meaning: 'travel' },
  '遊': { pinyin: 'yóu', bopomofo: 'ㄧㄡˊ', meaning: 'travel' },
  '情': { pinyin: 'qíng', bopomofo: 'ㄑㄧㄥˊ', meaning: 'situation / feeling' },
  '境': { pinyin: 'jìng', bopomofo: 'ㄐㄧㄥˋ', meaning: 'context / environment' },
  '對': { pinyin: 'duì', bopomofo: 'ㄉㄨㄟˋ', meaning: 'toward / pair' },
  '今': { pinyin: 'jīn', bopomofo: 'ㄐㄧㄣ', meaning: 'today' },
  '天': { pinyin: 'tiān', bopomofo: 'ㄊㄧㄢ', meaning: 'day' },
  '來': { pinyin: 'lái', bopomofo: 'ㄌㄞˊ', meaning: 'come' },
  '問': { pinyin: 'wèn', bopomofo: 'ㄨㄣˋ', meaning: 'ask' },
  '路': { pinyin: 'lù', bopomofo: 'ㄌㄨˋ', meaning: 'road / way' },
  '型': { pinyin: 'xíng', bopomofo: 'ㄒㄧㄥˊ', meaning: 'pattern' },
  '吧': { pinyin: 'ba', bopomofo: 'ㄅㄚ˙', meaning: 'suggestive particle' }
};

const CHAR_FALLBACK_BANK = {
  '剛': { pinyin: 'gāng', bopomofo: 'ㄍㄤ', meaning: 'just now' },
  '寫': { pinyin: 'xiě', bopomofo: 'ㄒㄧㄝˇ', meaning: 'write' },
  '好': { pinyin: 'hǎo', bopomofo: 'ㄏㄠˇ', meaning: 'good / finish' },
  '段': { pinyin: 'duàn', bopomofo: 'ㄉㄨㄢˋ', meaning: 'section' },
  '自': { pinyin: 'zì', bopomofo: 'ㄗˋ', meaning: 'self' },
  '介': { pinyin: 'jiè', bopomofo: 'ㄐㄧㄝˋ', meaning: 'introduce' },
  '紹': { pinyin: 'shào', bopomofo: 'ㄕㄠˋ', meaning: 'introduce' },
  '修': { pinyin: 'xiū', bopomofo: 'ㄒㄧㄡ', meaning: 'fix' },
  '正': { pinyin: 'zhèng', bopomofo: 'ㄓㄥˋ', meaning: 'correct' },
  '成': { pinyin: 'chéng', bopomofo: 'ㄔㄥˊ', meaning: 'become' },
  '更': { pinyin: 'gèng', bopomofo: 'ㄍㄥˋ', meaning: 'more' },
  '然': { pinyin: 'rán', bopomofo: 'ㄖㄢˊ', meaning: 'natural / so' },
  '說': { pinyin: 'shuō', bopomofo: 'ㄕㄨㄛ', meaning: 'speak / say' },
  '法': { pinyin: 'fǎ', bopomofo: 'ㄈㄚˇ', meaning: 'method / expression' },
  '每': { pinyin: 'měi', bopomofo: 'ㄇㄟˇ', meaning: 'every' },
  '用': { pinyin: 'yòng', bopomofo: 'ㄩㄥˋ', meaning: 'use' },
  '繁': { pinyin: 'fán', bopomofo: 'ㄈㄢˊ', meaning: 'traditional / complex' },
  '體': { pinyin: 'tǐ', bopomofo: 'ㄊㄧˇ', meaning: 'style / body' },
  '文': { pinyin: 'wén', bopomofo: 'ㄨㄣˊ', meaning: 'language / text' },
  '聊': { pinyin: 'liáo', bopomofo: 'ㄌㄧㄠˊ', meaning: 'chat' },
  '十': { pinyin: 'shí', bopomofo: 'ㄕˊ', meaning: 'ten' },
  '分': { pinyin: 'fēn', bopomofo: 'ㄈㄣ', meaning: 'minute / divide' },
  '鐘': { pinyin: 'zhōng', bopomofo: 'ㄓㄨㄥ', meaning: 'clock / minute' },
  '覺': { pinyin: 'jué', bopomofo: 'ㄐㄩㄝˊ', meaning: 'feel / think' },
  '得': { pinyin: 'de', bopomofo: 'ㄉㄜ˙', meaning: 'particle' },
  '如': { pinyin: 'rú', bopomofo: 'ㄖㄨˊ', meaning: 'as' },
  '何': { pinyin: 'hé', bopomofo: 'ㄏㄜˊ', meaning: 'how' },
  '通': { pinyin: 'tōng', bopomofo: 'ㄊㄨㄥ', meaning: 'through / commute' },
  '勤': { pinyin: 'qín', bopomofo: 'ㄑㄧㄣˊ', meaning: 'commute / diligent' },
  '中': { pinyin: 'zhōng', bopomofo: 'ㄓㄨㄥ', meaning: 'middle' },
  '跟': { pinyin: 'gēn', bopomofo: 'ㄍㄣ', meaning: 'follow' },
  '讀': { pinyin: 'dú', bopomofo: 'ㄉㄨˊ', meaning: 'read aloud' },
  '目': { pinyin: 'mù', bopomofo: 'ㄇㄨˋ', meaning: 'target' },
  '標': { pinyin: 'biāo', bopomofo: 'ㄅㄧㄠ', meaning: 'goal' },
  '全': { pinyin: 'quán', bopomofo: 'ㄑㄩㄢˊ', meaning: 'whole' },
  '程': { pinyin: 'chéng', bopomofo: 'ㄔㄥˊ', meaning: 'process' },
  '只': { pinyin: 'zhǐ', bopomofo: 'ㄓˇ', meaning: 'only' },
  '意': { pinyin: 'yì', bopomofo: 'ㄧˋ', meaning: 'idea / meaning' },
  '續': { pinyin: 'xù', bopomofo: 'ㄒㄩˋ', meaning: 'continue' },
  '收': { pinyin: 'shōu', bopomofo: 'ㄕㄡ', meaning: 'receive' },
  '到': { pinyin: 'dào', bopomofo: 'ㄉㄠˋ', meaning: 'arrive / receive' },
  '試': { pinyin: 'shì', bopomofo: 'ㄕˋ', meaning: 'try' },
  '著': { pinyin: 'zhe', bopomofo: 'ㄓㄜ˙', meaning: 'particle / ongoing' },
  '回': { pinyin: 'huí', bopomofo: 'ㄏㄨㄟˊ', meaning: 'return / reply' },
  '覆': { pinyin: 'fù', bopomofo: 'ㄈㄨˋ', meaning: 'reply' }
};

const isHanCharacter = (char) => {
  const code = char.charCodeAt(0);
  return code >= 0x3400 && code <= 0x9fff;
};

const DICTIONARY_KEYS = Object.keys(WORD_BANK).sort((a, b) => b.length - a.length);

const parseRichSentence = (content) => {
  const cleaned = (content || '').trim();
  const richMatch = cleaned.match(/^(.*?)\s*\(([^()]*)\)\s*-\s*(.*)$/);

  if (richMatch) {
    return {
      sentence: richMatch[1].trim(),
      meaning: richMatch[3].trim()
    };
  }

  return {
    sentence: cleaned,
    meaning: ''
  };
};

const tokenizeSentence = (sentence) => {
  const cleaned = (sentence || '').replace(/[，。！？,.!?]/g, ' ').replace(/\s+/g, ' ').trim();
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

    const latinChunk = cleaned.slice(index).match(/^[A-Za-z0-9']+/);
    if (latinChunk) {
      tokens.push(latinChunk[0]);
      index += latinChunk[0].length;
      continue;
    }

    index += 1;
  }

  return tokens;
};

const deriveTokenInfo = (token) => {
  if (WORD_BANK[token]) return WORD_BANK[token];

  if (/^[\u3400-\u9fff]+$/.test(token)) {
    const chars = Array.from(token);
    const charData = chars.map((ch) => WORD_BANK[ch] || CHAR_FALLBACK_BANK[ch]).filter(Boolean);

    if (charData.length) {
      return {
        pinyin: charData.map((item) => item.pinyin).join(' '),
        bopomofo: charData.map((item) => item.bopomofo).join(' '),
        meaning: charData.map((item) => item.meaning).join(' / ')
      };
    }
  }

  if (/^[A-Za-z]+$/.test(token)) {
    return { pinyin: '', bopomofo: '', meaning: 'loanword / name' };
  }

  return { pinyin: '', bopomofo: '', meaning: 'context word' };
};

const buildMessageBreakdown = (text, translatedText = '') => {
  const { sentence, meaning } = parseRichSentence(text);
  const tokens = tokenizeSentence(sentence);
  const rows = tokens.map((token) => ({
    token,
    ...deriveTokenInfo(token)
  }));

  const fallbackMeaning = rows
    .map((row) => row.meaning)
    .filter((item) => item && item !== 'context word' && item !== 'loanword / name')
    .slice(0, 8)
    .join(' · ');

  const normalizedKey = normalizeSentenceKey(sentence);
  const mappedMeaning = SENTENCE_TRANSLATION_BANK_NORMALIZED[normalizedKey] || SENTENCE_TRANSLATION_BANK[normalizedKey];

  return {
    sentence,
    rows,
    pinyin: rows.map((row) => row.pinyin).filter(Boolean).join(' '),
    bopomofo: rows.map((row) => row.bopomofo).filter(Boolean).join(' '),
    meaning: meaning || translatedText || mappedMeaning || fallbackMeaning || 'Full translation is being prepared.'
  };
};

const getQuickTranslation = (text) => {
  const normalized = normalizeSentenceKey(text);
  if (!normalized) return 'Translation unavailable.';

  const mapped = SENTENCE_TRANSLATION_BANK[normalized];
  if (mapped) return mapped;

  const normalizedMapped = SENTENCE_TRANSLATION_BANK_NORMALIZED[normalized];
  if (normalizedMapped) return normalizedMapped;

  if (/^[A-Za-z0-9\s'".,!?-]+$/.test(text)) {
    return text;
  }

  return 'English translation is not available for this sentence yet.';
};

const getAiAssist = (text, langName) => {
  const trimmed = text.trim();
  if (!trimmed) return { suggestion: '', note: '' };

  const politePrefix = ['請', '不好意思', '麻煩', 'could you', 'please'];
  const hasPoliteCue = politePrefix.some((cue) => trimmed.toLowerCase().includes(cue.toLowerCase()));

  let suggestion = trimmed;
  if (!/^[A-Z\u3400-\u9FFF]/.test(trimmed)) {
    suggestion = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
  if (!/[.!?。！？]$/.test(suggestion)) {
    suggestion = `${suggestion}。`;
  }

  const note = hasPoliteCue
    ? `語氣很有禮貌，繼續用 ${langName} 聊天。`
    : `可加入「請 / 麻煩」讓句子更有禮貌，並多用 ${langName}。`;

  return { suggestion, note };
};

const MOCK_REPLY_OPTIONS = {
  default: ['好啊，我們開始練習吧。', '可以，請你先說一個例句。', '我先試著回答看看。'],
  greeting: ['你好！很高興跟你聊天。', '我今天很好，你呢？', '可以，我們來練習打招呼句型。'],
  travel: ['這週末我想去台北走走。', '你推薦哪個景點？', '我們可以練習旅遊對話。'],
  polite: ['不好意思，可以請你再說一次嗎？', '麻煩你幫我看看這句話。', '謝謝你，我學到了。']
};

export default function DirectChat({ onNavigate, lang, threadId }) {
  const { getChatThreadById, openChatThread, updateChatThreadPreview, targetLang, toggleSavedWord, isWordSaved } = useAppContext();
  const thread = getChatThreadById(threadId);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(() => STARTER_MESSAGES[threadId] || []);
  const [translatedMessageIds, setTranslatedMessageIds] = useState([]);
  const [translationByMessage, setTranslationByMessage] = useState({});
  const [translatingMessageIds, setTranslatingMessageIds] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isAiAssistOpen, setIsAiAssistOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [speakPracticeData, setSpeakPracticeData] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showZhuyin, setShowZhuyin] = useState(true);
  const translationCacheRef = useRef(new Map());
  const prefetchTimeoutRef = useRef(null);

  useEffect(() => {
    if (threadId) {
      openChatThread(threadId);
      setMessages(STARTER_MESSAGES[threadId] || []);
    }
  }, [threadId, openChatThread]);

  const placeholder = useMemo(() => {
    if (!thread) return 'Type message...';
    return `Message ${thread.name}...`;
  }, [thread]);

  const aiAssist = useMemo(() => getAiAssist(inputValue, lang.name), [inputValue, lang.name]);

  const mockReplyOptions = useMemo(() => {
    const lastFriend = [...messages].reverse().find((m) => m.sender === 'friend');
    const text = (lastFriend?.text || '').toLowerCase();

    if (text.match(/你好|hello|見到你|how are you/)) return MOCK_REPLY_OPTIONS.greeting;
    if (text.match(/旅遊|travel|景點/)) return MOCK_REPLY_OPTIONS.travel;
    if (text.match(/禮貌|不好意思|麻煩|sorry|please/)) return MOCK_REPLY_OPTIONS.polite;
    return MOCK_REPLY_OPTIONS.default;
  }, [messages]);

  const speakText = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = SPEECH_LOCALES[lang.id] || 'zh-TW';
    utterance.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const translateMessage = async (messageId, text, options = {}) => {
    const { showLoading = true } = options;
    const cacheKey = `${targetLang?.id || lang.id}:${text}`;
    if (translationCacheRef.current.has(cacheKey)) {
      const cachedValue = translationCacheRef.current.get(cacheKey);
      setTranslationByMessage((prev) => ({ ...prev, [messageId]: cachedValue }));
      return;
    }

    if (showLoading) {
      setTranslatingMessageIds((prev) => [...prev, messageId]);
    }

    const targetCode = 'en';
    const endpoint = import.meta.env.VITE_TRANSLATE_API_URL;

    try {
      if (!endpoint) {
        const fallback = getQuickTranslation(text);
        translationCacheRef.current.set(cacheKey, fallback);
        setTranslationByMessage((prev) => ({ ...prev, [messageId]: fallback }));
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: targetCode,
          format: 'text'
        })
      });

      const payload = await response.json();
      const translated = payload?.translatedText || payload?.translation || getQuickTranslation(text);
      translationCacheRef.current.set(cacheKey, translated);
      setTranslationByMessage((prev) => ({ ...prev, [messageId]: translated }));
    } catch {
      const fallback = getQuickTranslation(text);
      translationCacheRef.current.set(cacheKey, fallback);
      setTranslationByMessage((prev) => ({ ...prev, [messageId]: fallback }));
    } finally {
      if (showLoading) {
        setTranslatingMessageIds((prev) => prev.filter((id) => id !== messageId));
      }
    }
  };

  useEffect(() => {
    if (!messages.length) return;

    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }

    prefetchTimeoutRef.current = window.setTimeout(() => {
      const recentMessages = [...messages].slice(-8);
      const missingTranslations = recentMessages.filter((message) => !translationByMessage[message.id]);

      missingTranslations.forEach((message) => {
        translateMessage(message.id, message.text, { showLoading: false });
      });
    }, 250);

    return () => {
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current);
      }
    };
  }, [messages, translationByMessage, targetLang?.id]);

  useEffect(() => {
    if (!messages.length) return;
    setTranslatedMessageIds((prev) => {
      const allIds = messages.map((message) => message.id);
      const merged = new Set([...prev, ...allIds]);
      return Array.from(merged);
    });
  }, [messages]);

  const toggleTranslateMessage = async (message) => {
    if (translatedMessageIds.includes(message.id)) {
      setTranslatedMessageIds((prev) => prev.filter((id) => id !== message.id));
      return;
    }

    if (!translationByMessage[message.id]) {
      await translateMessage(message.id, message.text);
    }

    setTranslatedMessageIds((prev) => [...prev, message.id]);
  };

  const selectedMessage = selectedMessageId ? messages.find((message) => message.id === selectedMessageId) : null;
  const selectedBreakdown = selectedMessage
    ? buildMessageBreakdown(selectedMessage.text, translationByMessage[selectedMessage.id])
    : null;

  const openMessageDetail = async (message) => {
    if (!translationByMessage[message.id]) {
      await translateMessage(message.id, message.text);
    }
    setSelectedToken(null);
    setSelectedMessageId(message.id);
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

  const handleSpeakingPractice = (message = selectedMessage) => {
    if (!message) return;

    const breakdown = buildMessageBreakdown(message.text, translationByMessage[message.id]);
    const targetZhuyin = breakdown.rows.map((row) => row.bopomofo).filter(Boolean).join(' · ');

    setSpeakPracticeData({
      targetSentence: breakdown.sentence,
      targetPinyin: breakdown.pinyin,
      targetZhuyin,
      targetMeaning: translationByMessage[message.id] || breakdown.meaning || getQuickTranslation(breakdown.sentence),
      resultPercent: null,
      resultFeedback: null,
      mockTranscript: '',
      isRecognizing: false,
      isPlaybackActive: false
    });
  };

  const startFakeSpeakingRecording = () => {
    if (!speakPracticeData) return;

    setSpeakPracticeData((prev) => ({
      ...prev,
      isRecognizing: true,
      resultPercent: null,
      resultFeedback: null,
      mockTranscript: '',
      isPlaybackActive: false
    }));

    setTimeout(() => {
      const targetTokens = Array.from(speakPracticeData.targetSentence || '');
      const hanIndexes = targetTokens
        .map((char, idx) => ({ char, idx }))
        .filter((item) => isHanCharacter(item.char))
        .map((item) => item.idx);

      const wrongIndexSet = new Set();
      if (hanIndexes.length > 0) {
        const minWrong = 1;
        const maxWrong = Math.min(3, hanIndexes.length);
        const wrongCount = Math.max(minWrong, Math.floor(Math.random() * maxWrong) + 1);

        while (wrongIndexSet.size < wrongCount) {
          const pick = hanIndexes[Math.floor(Math.random() * hanIndexes.length)];
          wrongIndexSet.add(pick);
        }
      }

      const feedback = targetTokens.map((char, idx) => {
        if (char === ' ' || !isHanCharacter(char)) return { char, ok: true };
        return { char, ok: !wrongIndexSet.has(idx) };
      });

      const wrongTotal = feedback.filter((item) => isHanCharacter(item.char) && !item.ok).length;
      const randomPenalty = Math.floor(Math.random() * 7);
      const percent = Math.max(68, Math.min(97, 96 - wrongTotal * 8 - randomPenalty));

      const mockTranscript = feedback
        .map((item) => (item.ok ? item.char : '□'))
        .join('');

      setSpeakPracticeData((prev) => ({
        ...prev,
        isRecognizing: false,
        resultPercent: percent,
        resultFeedback: feedback,
        mockTranscript
      }));
    }, 2500);
  };

  const toggleMockPlayback = () => {
    if (!speakPracticeData?.resultFeedback) return;

    setSpeakPracticeData((prev) => ({ ...prev, isPlaybackActive: true }));
    setTimeout(() => {
      setSpeakPracticeData((prev) => (prev ? { ...prev, isPlaybackActive: false } : prev));
    }, 1800);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LOCALES[lang.id] || 'zh-TW';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (!transcript) return;
      setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
  };

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'you',
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    if (thread?.id) {
      updateChatThreadPreview?.(thread.id, text);
    }

    const randomReply = FALLBACK_REPLY[Math.floor(Math.random() * FALLBACK_REPLY.length)];
    const botMessage = {
      id: `f-${Date.now() + 1}`,
      sender: 'friend',
      text: randomReply
    };

    window.setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      if (thread?.id) {
        updateChatThreadPreview?.(thread.id, randomReply);
      }
    }, 400);
  };

  if (!thread) {
    return (
      <div className="h-full w-full bg-[#1E1E2A] flex items-center justify-center p-6">
        <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0_#000]">
          <p className="text-black font-black text-base mb-3">Chat thread not found.</p>
          <button
            onClick={() => onNavigate('chats')}
            className="h-10 px-4 rounded-xl bg-[#FFD100] border-4 border-black text-black font-black text-xs uppercase tracking-widest"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-hidden">
      <div className="p-4 pt-8 border-b-4 border-black flex items-center bg-[#2A2A3B] z-20 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('chats')} className="p-2 flex-none text-white transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>

        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${thread.name}`}
          alt={thread.name}
          className="w-12 h-12 rounded-xl border-4 border-black bg-white ml-2"
        />

        <div className="ml-3 min-w-0">
          <h3 className="text-white font-black text-xl leading-tight uppercase tracking-wider truncate">{thread.name}</h3>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: lang.secondaryColor }}>
            Online now
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 pb-44">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div
              onClick={() => openMessageDetail(message)}
              className={`max-w-[86%] border-4 border-black rounded-[1.5rem] p-4 font-black text-sm leading-relaxed shadow-[6px_6px_0_#000] cursor-pointer active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all ${message.sender === 'you' ? 'text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}
              style={message.sender === 'you' ? { backgroundColor: lang.secondaryColor } : undefined}
            >
              <div className="flex flex-wrap items-end mb-1">
                {buildMessageBreakdown(message.text, translationByMessage[message.id]).rows.map((row, idx) => (
                  <span key={`${message.id}-${idx}`} className="text-xl font-serif font-black">{row.token}</span>
                ))}
              </div>

              {translatedMessageIds.includes(message.id) && (
                <p className="mt-2 text-xs font-bold text-[#6B7280]">
                  {translationByMessage[message.id] || buildMessageBreakdown(message.text).meaning || getQuickTranslation(message.text)}
                </p>
              )}

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleTranslateMessage(message);
                  }}
                  className="h-8 px-3 rounded-lg border-2 border-black bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                  title="Instant Translate"
                >
                  <Languages size={12} />
                  {translatingMessageIds.includes(message.id)
                    ? 'Loading...'
                    : translatedMessageIds.includes(message.id)
                      ? 'Hide Translation'
                      : 'Translate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[85px] w-full bg-[#2A2A3B] border-t-4 border-black p-4 z-10">
        <div className="mb-3 bg-white border-2 border-black rounded-xl px-3 py-2">
          <button
            onClick={() => setIsAiAssistOpen((prev) => !prev)}
            className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#4B4B5A]"
          >
            <span className="flex items-center gap-1"><WandSparkles size={12} /> AI Assist</span>
            <span>{isAiAssistOpen ? 'Hide' : 'Show'}</span>
          </button>

          {isAiAssistOpen && (
            <>
              <p className="text-xs font-bold text-black mt-2">{aiAssist.note}</p>
              {aiAssist.suggestion && aiAssist.suggestion !== inputValue.trim() && (
                <button
                  onClick={() => setInputValue(aiAssist.suggestion)}
                  className="mt-2 h-7 px-2 rounded-lg border-2 border-black bg-[#00FF87] text-black text-[10px] font-black uppercase tracking-widest"
                >
                  Apply Suggestion
                </button>
              )}

              <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide">
                {mockReplyOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setInputValue(option)}
                    className="flex-none h-8 px-3 rounded-lg border-2 border-black bg-[#F4F4F5] text-black text-[10px] font-black uppercase tracking-widest"
                    title="Fill input with this reply"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={startVoiceInput}
            className={`w-14 h-14 flex-none rounded-2xl border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] ${isRecording ? 'bg-[#FFD100] text-black' : 'bg-white text-black'}`}
            title="Speak"
          >
            <Mic size={20} strokeWidth={3} />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendMessage();
            }}
            placeholder={placeholder}
            className="flex-1 min-w-0 h-14 bg-white border-4 border-black rounded-2xl px-4 text-black font-black focus:outline-none shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]"
          />

          <button
            onClick={sendMessage}
            className="w-14 h-14 flex-none rounded-2xl text-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            style={{ backgroundColor: lang.primaryColor }}
          >
            <Send size={22} strokeWidth={3} />
          </button>
        </div>
      </div>

  {selectedMessage && selectedBreakdown && !selectedToken && !speakPracticeData && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedMessageId(null)}
          />

          <div className="relative bg-[#1E1E2A] border-t-8 border-black rounded-t-[2.5rem] p-6 max-h-[75%] overflow-y-auto pb-24">
            <button
              onClick={() => setSelectedMessageId(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white border-4 border-black text-black flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD100] mb-2">
              {selectedMessage.sender === 'friend' ? `${thread?.name || 'Friend'} Message` : 'Your Message'}
            </p>

            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setShowPinyin((prev) => !prev)}
                className={`h-9 px-3 rounded-xl border-4 border-black shadow-[3px_3px_0_#000] text-[10px] font-black uppercase tracking-widest ${showPinyin ? 'bg-[#A25BFF] text-white' : 'bg-white text-black'}`}
              >
                {showPinyin ? 'Hide Pinyin' : 'Show Pinyin'}
              </button>
              <button
                onClick={() => setShowZhuyin((prev) => !prev)}
                className={`h-9 px-3 rounded-xl border-4 border-black shadow-[3px_3px_0_#000] text-[10px] font-black uppercase tracking-widest ${showZhuyin ? 'bg-[#FF426A] text-white' : 'bg-white text-black'}`}
              >
                {showZhuyin ? 'Hide Zhuyin' : 'Show Zhuyin'}
              </button>
            </div>

            <div className="bg-white border-4 border-black rounded-[2rem] p-5 shadow-[8px_8px_0_#000] mb-4 space-y-3">
              <div className="flex flex-wrap gap-x-1.5 gap-y-3 items-end">
                {selectedBreakdown.rows.map((row, index) => (
                  <button
                    key={`${selectedMessage.id}-token-${index}`}
                    onClick={() => setSelectedToken(row)}
                    className="flex flex-col items-center text-black"
                  >
                    {showZhuyin && row.bopomofo && <span className="text-[9px] font-black text-[#FF426A] leading-tight mb-0.5">{row.bopomofo}</span>}
                    {showPinyin && row.pinyin && <span className="text-[9px] font-black text-[#A25BFF] leading-tight mb-0.5">{row.pinyin}</span>}
                    <span className="text-xl font-serif font-black leading-none">{row.token}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#F4F4F5] border-4 border-black rounded-2xl p-3">
                <p className="text-[10px] uppercase tracking-widest font-black text-[#7A7A9A]">English Translation</p>
                <p className="text-base font-black text-[#2A2A3B] leading-snug mt-1">{translationByMessage[selectedMessage.id] || selectedBreakdown.meaning || getQuickTranslation(selectedBreakdown.sentence)}</p>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-[#1E1E2A] pt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => speakText(selectedMessage.text)}
                  className="h-12 rounded-xl bg-white border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000]"
                >
                  <Volume2 size={16} strokeWidth={3} /> Listen
                </button>
                <button
                  onClick={() => handleSpeakingPractice(selectedMessage)}
                  className="h-12 rounded-xl border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000]"
                  style={{ backgroundColor: lang.secondaryColor }}
                >
                  <Mic size={16} strokeWidth={3} /> Speak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedToken && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-[#0B0A10]/80 backdrop-blur-sm" onClick={() => setSelectedToken(null)} />

          <div className="bg-white border-4 border-black rounded-[2rem] p-6 w-full max-w-sm relative z-10 shadow-[12px_12px_0_#A25BFF]">
            <button
              onClick={() => setSelectedToken(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-[#FF426A] border-4 border-black rounded-xl flex items-center justify-center text-white"
            >
              <X size={20} strokeWidth={4} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <span className="text-[#FF426A] font-black text-xs uppercase mb-0.5">{selectedToken.bopomofo || '-'}</span>
              <span className="text-[#A25BFF] font-black text-lg uppercase mb-1">{selectedToken.pinyin || '-'}</span>
              <span className="text-6xl font-serif font-black text-black mb-4">{selectedToken.token}</span>
              <span className="text-black font-black text-xl px-4 py-2 border-4 border-black rounded-xl bg-[#00FF87]">{selectedToken.meaning || 'context word'}</span>
            </div>

            <button
              onClick={() => { /* UI-only audio button */ }}
              className="w-full flex items-center justify-center gap-2 py-3 mb-3 bg-white border-4 border-black shadow-[4px_4px_0_#000] rounded-xl font-black text-black uppercase tracking-widest text-xs"
            >
              <Volume2 size={18} strokeWidth={3} /> Audio
            </button>

            <button
              onClick={() => {
                handleToggleSavedWord(selectedToken);
                setSelectedToken(null);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#FFD100] border-4 border-black shadow-[4px_4px_0_#000] rounded-xl font-black text-black uppercase tracking-widest text-sm"
            >
              <Bookmark size={20} strokeWidth={3} /> {isWordSaved(selectedToken.token, lang.id) ? 'Remove Word' : 'Save Word'}
            </button>
          </div>
        </div>
      )}

      {speakPracticeData && (
        <div className="absolute inset-0 z-[70] flex flex-col justify-end">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSpeakPracticeData(null)}
          />

          <div className="relative bg-[#2A2A3B] border-t-8 border-black rounded-t-[2.5rem] p-6 max-h-[85%] pb-10 overflow-y-auto">
            <button
              onClick={() => setSpeakPracticeData(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white border-4 border-black text-black flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD100] mb-2 flex items-center gap-2">
              <Mic size={14} /> Speaking Practice
            </p>

            <div className="bg-white border-4 border-black rounded-[2.5rem] p-6 shadow-[8px_8px_0_#000] mb-8 space-y-4">
              {showZhuyin && (
                <p className="text-[#FF426A] font-black text-xs uppercase text-center break-words">{speakPracticeData.targetZhuyin || '-'}</p>
              )}
              {showPinyin && (
                <p className="text-[#A25BFF] font-black text-sm uppercase text-center">{speakPracticeData.targetPinyin || '-'}</p>
              )}

              <div className="flex flex-wrap gap-x-1 gap-y-2 justify-center">
                {speakPracticeData.resultFeedback ? (
                  speakPracticeData.resultFeedback.map((f, i) => (
                    <span key={i} className={`text-4xl font-serif font-black ${f.ok ? 'text-black' : 'text-[#FF426A] line-through decoration-4 decoration-[#FF426A]'}`}>
                      {f.char}
                    </span>
                  ))
                ) : (
                  <span className="text-4xl font-serif font-black text-black text-center">
                    {speakPracticeData.targetSentence}
                  </span>
                )}
              </div>

              <p className="text-base font-bold text-[#6B7280] leading-snug pt-2 border-t-2 border-dashed border-gray-300 text-center">
                {speakPracticeData.targetMeaning}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-5">
              {speakPracticeData.resultPercent !== null && (
                <>
                  <div className={`px-5 py-3 border-4 border-black rounded-2xl shadow-[4px_4px_0_#000] font-black text-2xl ${speakPracticeData.resultPercent >= 80 ? 'bg-[#00FF87] text-black' : 'bg-[#FFD100] text-black'}`}>
                    {speakPracticeData.resultPercent}% Accuracy!
                  </div>
                  <p className="text-white font-black text-xs uppercase tracking-widest text-center max-w-[260px]">
                    {speakPracticeData.resultPercent >= 85 ? 'Great pronunciation! Keep it up.' : 'Some pronunciation needs improvement. Red words need more practice.'}
                  </p>
                </>
              )}

              <button
                onClick={startFakeSpeakingRecording}
                className={`w-24 h-24 rounded-[2rem] border-8 border-black flex items-center justify-center shadow-[6px_6px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${speakPracticeData.isRecognizing ? 'bg-[#FF426A] animate-pulse shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-[#00E5FF]'}`}
              >
                <Mic size={48} strokeWidth={3} className={speakPracticeData.isRecognizing ? 'text-white' : 'text-black'} />
              </button>

              <button
                onClick={toggleMockPlayback}
                disabled={!speakPracticeData.resultFeedback}
                className={`h-12 px-4 rounded-xl border-4 border-black font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-[3px_3px_0_#000] transition-all ${speakPracticeData.resultFeedback ? 'bg-white text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none' : 'bg-[#D1D5DB] text-[#6B7280] cursor-not-allowed'}`}
              >
                <Volume2 size={16} strokeWidth={3} /> {speakPracticeData.isPlaybackActive ? 'Playing (Mock)...' : 'Play My Audio (Mock)'}
              </button>

              {speakPracticeData.resultFeedback && (
                <div className="w-full max-w-sm bg-[#111827] border-4 border-black rounded-xl px-4 py-3 text-white">
                  <p className="text-[10px] uppercase tracking-widest font-black text-[#9CA3AF] mb-1">Recorded Preview (UI only)</p>
                  <p className="text-sm font-black break-words">{speakPracticeData.mockTranscript || speakPracticeData.targetSentence}</p>
                </div>
              )}

              <p className="text-white font-black text-xs uppercase tracking-widest text-center max-w-[220px]">
                {speakPracticeData.isRecognizing ? 'Recording...' : speakPracticeData.resultPercent !== null ? 'Tap Mic to try again!' : 'Tap Mic & start speaking!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
