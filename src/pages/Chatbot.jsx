import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, ChevronLeft, Languages, Mic, Send, Volume2, X } from 'lucide-react';
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
  '初級': { pinyin: 'chū jí', bopomofo: 'ㄔㄨ ㄐㄧˊ', meaning: 'beginner' },
  '中級': { pinyin: 'zhōng jí', bopomofo: 'ㄓㄨㄥ ㄐㄧˊ', meaning: 'intermediate' },
  '高級': { pinyin: 'gāo jí', bopomofo: 'ㄍㄠ ㄐㄧˊ', meaning: 'advanced' },
  '打招呼': { pinyin: 'dǎ zhāo hū', bopomofo: 'ㄉㄚˇ ㄓㄠ ㄏㄨ', meaning: 'greetings' },
  '自我介紹': { pinyin: 'zì wǒ jiè shào', bopomofo: 'ㄗˋ ㄨㄛˇ ㄐㄧㄝˋ ㄕㄠˋ', meaning: 'introductions' },
  '食物': { pinyin: 'shí wù', bopomofo: 'ㄕˊ ㄨˋ', meaning: 'food' },
  '飲料': { pinyin: 'yǐn liào', bopomofo: 'ㄧㄣˇ ㄌㄧㄠˋ', meaning: 'drinks' },
  '日常生活': { pinyin: 'rì cháng shēng huó', bopomofo: 'ㄖˋ ㄔㄤˊ ㄕㄥ ㄏㄨㄛˊ', meaning: 'daily life' },
  '愛好': { pinyin: 'ài hào', bopomofo: 'ㄞˋ ㄏㄠˋ', meaning: 'hobbies' },
  '旅遊': { pinyin: 'lǚ yóu', bopomofo: 'ㄌㄩˇ ㄧㄡˊ', meaning: 'travel' },
  '購物': { pinyin: 'gòu wù', bopomofo: 'ㄍㄡˋ ㄨˋ', meaning: 'shopping' },
  '工作': { pinyin: 'gōng zuò', bopomofo: 'ㄍㄨㄥ ㄗㄨㄛˋ', meaning: 'work' },
  '職業': { pinyin: 'zhí yè', bopomofo: 'ㄓˊ ㄧㄝˋ', meaning: 'career' },
  '哲學': { pinyin: 'zhé xué', bopomofo: 'ㄓㄜˊ ㄒㄩㄝˊ', meaning: 'philosophy' },
  '政治': { pinyin: 'zhèng zhì', bopomofo: 'ㄓㄥˋ ㄓˋ', meaning: 'politics' },
  '科技': { pinyin: 'kē jì', bopomofo: 'ㄎㄜ ㄐㄧˋ', meaning: 'technology' },
  '文化': { pinyin: 'wén huà', bopomofo: 'ㄨㄣˊ ㄏㄨㄚˋ', meaning: 'culture' },
  '藝術': { pinyin: 'yì shù', bopomofo: 'ㄧˋ ㄕㄨˋ', meaning: 'arts' },
  '主題': { pinyin: 'zhǔ tí', bopomofo: 'ㄓㄨˇ ㄊㄧˊ', meaning: 'topic' },
  '子主題': { pinyin: 'zǐ zhǔ tí', bopomofo: 'ㄗˇ ㄓㄨˇ ㄊㄧˊ', meaning: 'subtopic' },
  '你好嗎': { pinyin: 'nǐ hǎo ma', bopomofo: 'ㄋㄧˇ ㄏㄠˇ ㄇㄚ˙', meaning: 'how are you' },
  '很高興見到你': { pinyin: 'hěn gāoxìng jiàn dào nǐ', bopomofo: 'ㄏㄣˇ ㄍㄠ ㄒㄧㄥˋ ㄐㄧㄢˋ ㄉㄠˋ ㄋㄧˇ', meaning: 'nice to meet you' },
  '我的名字是': { pinyin: 'wǒ de míng zì shì', bopomofo: 'ㄨㄛˇ ㄉㄜ˙ ㄇㄧㄥˊ ㄗˋ ㄕˋ', meaning: 'my name is' },
  '你來自哪裡': { pinyin: 'nǐ lái zì nǎ lǐ', bopomofo: 'ㄋㄧˇ ㄌㄞˊ ㄗˋ ㄋㄚˇ ㄌㄧˇ', meaning: 'where are you from' },
  '你做什麼工作': { pinyin: 'nǐ zuò shén me gōng zuò', bopomofo: 'ㄋㄧˇ ㄗㄨㄛˋ ㄕㄣˊ ㄇㄜ˙ ㄍㄨㄥ ㄗㄨㄛˋ', meaning: 'what do you do' },
  '最喜歡的食物': { pinyin: 'zuì xǐ huān de shí wù', bopomofo: 'ㄗㄨㄟˋ ㄒㄧˇ ㄏㄨㄢ ㄉㄜ˙ ㄕˊ ㄨˋ', meaning: 'favorite food' },
  '在餐廳點餐': { pinyin: 'zài cān tīng diǎn cān', bopomofo: 'ㄗㄞˋ ㄘㄢ ㄊㄧㄥ ㄉㄧㄢˇ ㄘㄢ', meaning: 'ordering at restaurant' },
  '早晨日常': { pinyin: 'zǎo chén rì cháng', bopomofo: 'ㄗㄠˇ ㄔㄣˊ ㄖˋ ㄔㄤˊ', meaning: 'morning routine' },
  '工作與學校': { pinyin: 'gōng zuò yǔ xué xiào', bopomofo: 'ㄍㄨㄥ ㄗㄨㄛˋ ㄩˇ ㄒㄩㄝˊ ㄒㄧㄠˋ', meaning: 'work and school' },
  '休閒活動': { pinyin: 'xiū xián huó dòng', bopomofo: 'ㄒㄧㄡ ㄒㄧㄢˊ ㄏㄨㄛˊ ㄉㄨㄥˋ', meaning: 'free time activities' },
  '睡眠與休息': { pinyin: 'shuì mián yǔ xiū xí', bopomofo: 'ㄕㄨㄟˋ ㄇㄧㄢˊ ㄩˇ ㄒㄧㄡ ㄒㄧˊ', meaning: 'sleep and rest' },
  '太好了': { pinyin: 'tài hǎo le', bopomofo: 'ㄊㄞˋ ㄏㄠˇ ㄌㄜ˙', meaning: 'great' },
  '你想練哪個主題': { pinyin: 'nǐ xiǎng liàn nǎ gè zhǔ tí', bopomofo: 'ㄋㄧˇ ㄒㄧㄤˇ ㄌㄧㄢˋ ㄋㄚˇ ㄍㄜˋ ㄓㄨˇ ㄊㄧˊ', meaning: 'which topic do you want to practice' },
  '你現在的程度是什麼呢': { pinyin: 'nǐ xiàn zài de chéng dù shì shén me ne', bopomofo: 'ㄋㄧˇ ㄒㄧㄢˋ ㄗㄞˋ ㄉㄜ˙ ㄔㄥˊ ㄉㄨˋ ㄕˋ ㄕㄣˊ ㄇㄜ˙ ㄋㄜ˙', meaning: 'what is your current level' },
  '你好': { pinyin: 'nǐ hǎo', bopomofo: 'ㄋㄧˇ ㄏㄠˇ', meaning: 'hello' },
  '很高兴': { pinyin: 'hěn gāoxìng', bopomofo: 'ㄏㄣˇ ㄍㄠ ㄒㄧㄥˋ', meaning: 'very happy' },
  '见到': { pinyin: 'jiàndào', bopomofo: 'ㄐㄧㄢˋ ㄉㄠˋ', meaning: 'to meet' },
  '你': { pinyin: 'nǐ', bopomofo: 'ㄋㄧˇ', meaning: 'you' },
  '嗨': { pinyin: 'hāi', bopomofo: 'ㄏㄞ', meaning: 'hi' },
  '今天': { pinyin: 'jīntiān', bopomofo: 'ㄐㄧㄣ ㄊㄧㄢ', meaning: 'today' },
  '怎么样': { pinyin: 'zěnmeyàng', bopomofo: 'ㄗㄣˇ ㄇㄜ˙ ㄧㄤˋ', meaning: 'how is it' },
  '我': { pinyin: 'wǒ', bopomofo: 'ㄨㄛˇ', meaning: 'I / me' },
  '叫': { pinyin: 'jiào', bopomofo: 'ㄐㄧㄠˋ', meaning: 'to be called' },
  '可以': { pinyin: 'kěyǐ', bopomofo: 'ㄎㄜˇ ㄧˇ', meaning: 'can / may' },
  '今年': { pinyin: 'jīnnián', bopomofo: 'ㄐㄧㄣ ㄋㄧㄢˊ', meaning: 'this year' },
  '岁': { pinyin: 'suì', bopomofo: 'ㄙㄨㄟˋ', meaning: 'years old' },
  '最': { pinyin: 'zuì', bopomofo: 'ㄗㄨㄟˋ', meaning: 'most' },
  '喜欢': { pinyin: 'xǐhuān', bopomofo: 'ㄒㄧˇ ㄏㄨㄢ', meaning: 'to like' },
  '吃': { pinyin: 'chī', bopomofo: 'ㄔ', meaning: 'to eat' },
  '面条': { pinyin: 'miàntiáo', bopomofo: 'ㄇㄧㄢˋ ㄊㄧㄠˊ', meaning: 'noodles' },
  '我们': { pinyin: 'wǒmen', bopomofo: 'ㄨㄛˇ ㄇㄣ˙', meaning: 'we / us' },
  '去哪裡': { pinyin: 'qù nǎlǐ', bopomofo: 'ㄑㄩˋ ㄋㄚˇ ㄌㄧˇ', meaning: 'where to go' },
  '去哪': { pinyin: 'qù nǎ', bopomofo: 'ㄑㄩˋ ㄋㄚˇ', meaning: 'where to go' },
  '再见': { pinyin: 'zàijiàn', bopomofo: 'ㄗㄞˋ ㄐㄧㄢˋ', meaning: 'goodbye' },
  '再見': { pinyin: 'zàijiàn', bopomofo: 'ㄗㄞˋ ㄐㄧㄢˋ', meaning: 'goodbye' },
  '谢谢': { pinyin: 'xièxie', bopomofo: 'ㄒㄧㄝˋ ㄒㄧㄝ˙', meaning: 'thank you' },
  '謝謝': { pinyin: 'xièxie', bopomofo: 'ㄒㄧㄝˋ ㄒㄧㄝ˙', meaning: 'thank you' },
  '是': { pinyin: 'shì', bopomofo: 'ㄕˋ', meaning: 'yes / to be' },
  '不是': { pinyin: 'búshì', bopomofo: 'ㄅㄨˊ ㄕˋ', meaning: 'not / no' },
  '現': { pinyin: 'xiàn', bopomofo: 'ㄒㄧㄢˋ', meaning: 'current / present' },
  '在': { pinyin: 'zài', bopomofo: 'ㄗㄞˋ', meaning: 'at / in' },
  '的': { pinyin: 'de', bopomofo: 'ㄉㄜ˙', meaning: 'possessive particle' },
  '程': { pinyin: 'chéng', bopomofo: 'ㄔㄥˊ', meaning: 'course / degree' },
  '度': { pinyin: 'dù', bopomofo: 'ㄉㄨˋ', meaning: 'level / degree' },
  '什': { pinyin: 'shén', bopomofo: 'ㄕㄣˊ', meaning: 'what' },
  '麼': { pinyin: 'me', bopomofo: 'ㄇㄜ˙', meaning: 'what' },
  '呢': { pinyin: 'ne', bopomofo: 'ㄋㄜ˙', meaning: 'question particle' },
  '嗎': { pinyin: 'ma', bopomofo: 'ㄇㄚ˙', meaning: 'question particle' },
  '很': { pinyin: 'hěn', bopomofo: 'ㄏㄣˇ', meaning: 'very' },
  '高': { pinyin: 'gāo', bopomofo: 'ㄍㄠ', meaning: 'high / very' },
  '興': { pinyin: 'xìng', bopomofo: 'ㄒㄧㄥˋ', meaning: 'excited / happy' },
  '見': { pinyin: 'jiàn', bopomofo: 'ㄐㄧㄢˋ', meaning: 'to see / meet' },
  '到': { pinyin: 'dào', bopomofo: 'ㄉㄠˋ', meaning: 'arrive / to' }
};

const CHAR_FALLBACK_BANK = {
  '初': { pinyin: 'chū', bopomofo: 'ㄔㄨ', meaning: 'beginning' },
  '級': { pinyin: 'jí', bopomofo: 'ㄐㄧˊ', meaning: 'level' },
  '中': { pinyin: 'zhōng', bopomofo: 'ㄓㄨㄥ', meaning: 'middle' },
  '高': { pinyin: 'gāo', bopomofo: 'ㄍㄠ', meaning: 'high' },
  '打': { pinyin: 'dǎ', bopomofo: 'ㄉㄚˇ', meaning: 'to hit / to do' },
  '招': { pinyin: 'zhāo', bopomofo: 'ㄓㄠ', meaning: 'gesture / move' },
  '呼': { pinyin: 'hū', bopomofo: 'ㄏㄨ', meaning: 'to call' },
  '自': { pinyin: 'zì', bopomofo: 'ㄗˋ', meaning: 'self' },
  '介': { pinyin: 'jiè', bopomofo: 'ㄐㄧㄝˋ', meaning: 'introduce' },
  '紹': { pinyin: 'shào', bopomofo: 'ㄕㄠˋ', meaning: 'introduce' },
  '與': { pinyin: 'yǔ', bopomofo: 'ㄩˇ', meaning: 'and' },
  '飲': { pinyin: 'yǐn', bopomofo: 'ㄧㄣˇ', meaning: 'drink' },
  '料': { pinyin: 'liào', bopomofo: 'ㄌㄧㄠˋ', meaning: 'material / ingredient' },
  '日': { pinyin: 'rì', bopomofo: 'ㄖˋ', meaning: 'day' },
  '常': { pinyin: 'cháng', bopomofo: 'ㄔㄤˊ', meaning: 'daily' },
  '生': { pinyin: 'shēng', bopomofo: 'ㄕㄥ', meaning: 'life / born' },
  '活': { pinyin: 'huó', bopomofo: 'ㄏㄨㄛˊ', meaning: 'life / live' },
  '愛': { pinyin: 'ài', bopomofo: 'ㄞˋ', meaning: 'love' },
  '好': { pinyin: 'hǎo', bopomofo: 'ㄏㄠˇ', meaning: 'good' },
  '旅': { pinyin: 'lǚ', bopomofo: 'ㄌㄩˇ', meaning: 'travel' },
  '遊': { pinyin: 'yóu', bopomofo: 'ㄧㄡˊ', meaning: 'travel' },
  '購': { pinyin: 'gòu', bopomofo: 'ㄍㄡˋ', meaning: 'to buy' },
  '物': { pinyin: 'wù', bopomofo: 'ㄨˋ', meaning: 'thing' },
  '工': { pinyin: 'gōng', bopomofo: 'ㄍㄨㄥ', meaning: 'work' },
  '作': { pinyin: 'zuò', bopomofo: 'ㄗㄨㄛˋ', meaning: 'to do / work' },
  '職': { pinyin: 'zhí', bopomofo: 'ㄓˊ', meaning: 'occupation' },
  '業': { pinyin: 'yè', bopomofo: 'ㄧㄝˋ', meaning: 'profession' },
  '你': { pinyin: 'nǐ', bopomofo: 'ㄋㄧˇ', meaning: 'you' },
  '想': { pinyin: 'xiǎng', bopomofo: 'ㄒㄧㄤˇ', meaning: 'to want / think' },
  '哪': { pinyin: 'nǎ', bopomofo: 'ㄋㄚˇ', meaning: 'which' },
  '個': { pinyin: 'gè', bopomofo: 'ㄍㄜˋ', meaning: 'measure word' },
  '主': { pinyin: 'zhǔ', bopomofo: 'ㄓㄨˇ', meaning: 'main' },
  '題': { pinyin: 'tí', bopomofo: 'ㄊㄧˊ', meaning: 'topic' },
  '太': { pinyin: 'tài', bopomofo: 'ㄊㄞˋ', meaning: 'too / very' },
  '了': { pinyin: 'le', bopomofo: 'ㄌㄜ˙', meaning: 'particle' },
  '拜': { pinyin: 'bài', bopomofo: 'ㄅㄞˋ', meaning: 'bye / pay respect' },
  '下': { pinyin: 'xià', bopomofo: 'ㄒㄧㄚˋ', meaning: 'next / down' },
  '次': { pinyin: 'cì', bopomofo: 'ㄘˋ', meaning: 'next time' },
  '認': { pinyin: 'rèn', bopomofo: 'ㄖㄣˋ', meaning: 'recognize' },
  '識': { pinyin: 'shì', bopomofo: 'ㄕˋ', meaning: 'know' },
  '健': { pinyin: 'jiàn', bopomofo: 'ㄐㄧㄢˋ', meaning: 'healthy' },
  '康': { pinyin: 'kāng', bopomofo: 'ㄎㄤ', meaning: 'health' },
  '米': { pinyin: 'mǐ', bopomofo: 'ㄇㄧˇ', meaning: 'rice' },
  '飯': { pinyin: 'fàn', bopomofo: 'ㄈㄢˋ', meaning: 'meal / rice' },
  '漢': { pinyin: 'hàn', bopomofo: 'ㄏㄢˋ', meaning: 'Han / Chinese' },
  '堡': { pinyin: 'bǎo', bopomofo: 'ㄅㄠˇ', meaning: 'fort / burger translit' },
  '比': { pinyin: 'bǐ', bopomofo: 'ㄅㄧˇ', meaning: 'compare / translit' },
  '薩': { pinyin: 'sà', bopomofo: 'ㄙㄚˋ', meaning: 'translit syllable' }
};

const FALLBACK_SUBTOPICS = [
  { id: 'warmup', name: 'Warm-up Chat', emoji: '💬' },
  { id: 'smalltalk', name: 'Small Talk', emoji: '🗨️' },
  { id: 'roleplay', name: 'Mini Roleplay', emoji: '🎭' }
];

const SENTENCE_TRANSLATION_BANK = {
  '嗨我是Momo你現在的程度是什麼呢': 'Hi! I am Momo. What is your current level?',
  '我還沒有辨識到你的程度': 'I still cannot detect your level yet.',
  '我目前找不到這個主題': 'I cannot find this topic yet.',
  '我目前找不到這個子主題': 'I cannot find this subtopic yet.',
  '現在進入MockPractice打招呼主題你可以按Speak做口說練習': 'Now entering Mock Practice for greetings. Press Speak to practice speaking.',
  'WarmupChat': 'Warm-up Chat',
  'Warm-upChat': 'Warm-up Chat',
  'SmallTalk': 'Small Talk',
  'MiniRoleplay': 'Mini Roleplay',
  '太好了你的程度是beginner你想練哪個主題': 'Great, your level is beginner. Which topic do you want to practice?',
  '太好了你的程度是intermediate你想練哪個主題': 'Great, your level is intermediate. Which topic do you want to practice?',
  '太好了你的程度是advanced你想練哪個主題': 'Great, your level is advanced. Which topic do you want to practice?',
  '很好主題是愛好Hobbies你想練哪個子主題': 'Great, the topic is hobbies. Which subtopic do you want to practice?',
  '很好主題是旅遊Travel你想練哪個子主題': 'Great, the topic is travel. Which subtopic do you want to practice?',
  '很好主題是打招呼Greetings你想練哪個子主題': 'Great, the topic is greetings. Which subtopic do you want to practice?',
  '初級': 'beginner',
  '中級': 'intermediate',
  '高級': 'advanced',
  '打招呼': 'greetings',
  '旅遊': 'travel'
};

const SENTENCE_TRANSLATION_BANK_NORMALIZED = Object.fromEntries(
  Object.entries(SENTENCE_TRANSLATION_BANK).map(([key, value]) => [
    key.replace(/[^a-zA-Z0-9\u3400-\u9fff]+/g, ''),
    value
  ])
);

const MOCK_TOPIC_PRACTICE = {
  beginner_greetings_hello: [
    '你好！很高興見到你。(Nǐ hǎo! Hěn gāoxìng jiàndào nǐ.) - Hello! Nice to meet you.',
    '你今天怎麼樣？(Nǐ jīntiān zěnmeyàng?) - How are you today?',
    '我可以幫你練口說和聽力。(Wǒ kěyǐ bāng nǐ liàn kǒushuō hé tīnglì.) - I can help you practice speaking and listening.',
    '要不要再說一次這句話？(Yào bú yào zài shuō yí cì zhè jù huà?) - Do you want to say this sentence again?'
  ]
};

const normalize = (value) => value.toLowerCase().trim();

const normalizeSentenceKey = (text = '') => text.replace(/[^a-zA-Z0-9\u3400-\u9fff]+/g, '').trim();

const findByInput = (options, value) => {
  const text = normalize(value);

  const extractParts = (name = '') => {
    const hanzi = (name.match(/^[^()]+/)?.[0] || name).trim().toLowerCase();
    const english = (name.match(/\(([^()]*)\)/)?.[1] || '').trim().toLowerCase();
    return { hanzi, english };
  };

  return options.find((option) => {
    const optionText = normalize(option.name);
    const { hanzi, english } = extractParts(option.name);
    const idText = normalize(option.id || '');

    return (
      optionText.includes(text) ||
      text.includes(optionText) ||
      (hanzi && (hanzi.includes(text) || text.includes(hanzi))) ||
      (english && (english.includes(text) || text.includes(english))) ||
      (idText && (idText.includes(text) || text.includes(idText)))
    );
  });
};

const inferLevel = (value) => {
  const text = normalize(value);

  if (text.includes('初級') || text.includes('初级') || text.includes('chūjí')) return 'beginner';
  if (text.includes('中級') || text.includes('中级') || text.includes('zhōngjí')) return 'intermediate';
  if (text.includes('高級') || text.includes('高级') || text.includes('gāojí')) return 'advanced';

  return Object.keys(LEVEL_HINTS).find((key) => LEVEL_HINTS[key].some((hint) => text.includes(hint)));
};

const extractHanziPart = (text = '') => {
  const match = text.match(/^[^()]+/);
  return (match?.[0] || text).trim();
};

const extractEnglishPart = (text = '') => {
  const match = text.match(/\(([^()]*)\)/);
  return (match?.[1] || '').trim();
};

const buildHanziEnglishLabel = ({ chinese, text }) => {
  const hanzi = (chinese || extractHanziPart(text || '')).trim();
  const english = extractEnglishPart(text || '');
  return english ? `${hanzi} (${english})` : hanzi;
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
      tokens.push(' ');
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

  return tokens.filter(t => t !== ' ');
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

  return {
    pinyin: '',
    bopomofo: '',
    meaning: token.match(/[A-Za-z]/) ? 'loanword / name' : 'context word'
  };
};

const buildMessageBreakdown = (message) => {
  const { sentence, pinyin, meaning } = parseRichSentence(message.content);
  const tokens = tokenizeSentence(sentence);
  const normalizedSentenceKey = normalizeSentenceKey(sentence || message.content || '');
  const englishInParens = extractEnglishPart(message.content || '');

  const rows = tokens.map((token) => {
    const dictionary = deriveTokenInfo(token);
    return {
      token,
      pinyin: dictionary.pinyin,
      bopomofo: dictionary.bopomofo,
      meaning: dictionary.meaning
    };
  });

  if (!rows.length) {
    rows.push({
      token: sentence || message.content,
      pinyin: pinyin || '',
      bopomofo: '',
      meaning: meaning || (message.type === 'bot' ? 'bot response' : 'user response')
    });
  }

  const fallbackSentenceMeaning = rows
    .map((row) => row.meaning)
    .filter((m) => m && m !== 'context word' && m !== 'loanword / name')
    .slice(0, 6)
    .join(' · ');

  const mappedSentenceMeaning = SENTENCE_TRANSLATION_BANK_NORMALIZED[normalizedSentenceKey];

  const sentenceLevelMeaning =
    meaning ||
    mappedSentenceMeaning ||
    (englishInParens && englishInParens.length > 6 ? englishInParens : '') ||
    (message.type === 'user'
      ? mappedSentenceMeaning || 'Your response.'
      : fallbackSentenceMeaning || 'Full translation is being prepared.');

  return {
    sentence: sentence || message.content,
    pinyin: pinyin || rows.map((row) => row.pinyin).filter((part) => part && part !== '-').join(' '),
    bopomofo: '-', // Could add bopomofo sentence parsing here later
    meaning: sentenceLevelMeaning,
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
  const { toggleSavedWord, isWordSaved, updateChatThreadPreview } = useAppContext();

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `嗨！我是${lang.mascotName}。你現在的程度是什麼呢？(Hāi! Wǒ shì ${lang.mascotName}. Nǐ xiànzài de chéngdù shì shénme ne?) - Hi! I am ${lang.mascotName}. What is your current level?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('ask_level');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showZhuyin, setShowZhuyin] = useState(true);
  const [translatedMessageKeys, setTranslatedMessageKeys] = useState([]);
  const [isInputRecording, setIsInputRecording] = useState(false);
  const [practiceStatus, setPracticeStatus] = useState('');
  const [speakPracticeData, setSpeakPracticeData] = useState(null);
  const [mockTopicTurn, setMockTopicTurn] = useState(0);
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
        value: extractHanziPart(level.name)
      }));
    }

    if (step === 'ask_topic') {
      return topicOptions.map((topic) => ({
        label: `${topic.emoji} ${topic.name}`,
        value: extractHanziPart(topic.name)
      }));
    }

    if (step === 'ask_subtopic') {
      return subtopicOptions.map((subtopic) => ({
        label: `${subtopic.emoji} ${subtopic.name}`,
        value: extractHanziPart(subtopic.name)
      }));
    }

    if (step === 'free_chat' && selectedLevel && selectedTopic && selectedSubtopic) {
      return getSuggestedResponses(selectedLevel, selectedTopic, selectedSubtopic).map((option) => ({
        label: buildHanziEnglishLabel(option),
        value: option.chinese || extractHanziPart(option.text || '') || option.text
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
    const preview = parseRichSentence(content).sentence || content;
    updateChatThreadPreview?.('ai-momo', preview);
    setMessages((prev) => [...prev, { type: 'bot', content, helper }]);
  };

  const handleConversation = (userInput) => {
    const userText = userInput.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { type: 'user', content: userText }]);
  updateChatThreadPreview?.('ai-momo', userText);

    if (step === 'ask_level') {
      const inferred = inferLevel(userText);
      if (!inferred) {
        pushBotMessage('我還沒有辨識到你的程度。', '可以輸入 beginner / intermediate / advanced，或中文程度描述。');
        return;
      }

      setSelectedLevel(inferred);
      setStep('ask_topic');
      pushBotMessage(`太好了，你的程度是 ${inferred}。你想練哪個主題？`, '可點選下方選項，或直接輸入主題。');
      return;
    }

    if (step === 'ask_topic') {
      const topic = findByInput(topicOptions, userText);
      if (!topic) {
        pushBotMessage('我目前找不到這個主題。', '請從選項中選一個，或輸入更接近的主題名稱。');
        return;
      }

      setSelectedTopic(topic.id);
      setStep('ask_subtopic');
      pushBotMessage(`很好，主題是 ${topic.name}。你想練哪個子主題？`, '選完後我們會進入自由對話。');
      return;
    }

    if (step === 'ask_subtopic') {
      const subtopic = findByInput(subtopicOptions, userText);
      if (!subtopic) {
        pushBotMessage('我目前找不到這個子主題。', '請從選項中挑選，或輸入更接近的名稱。');
        return;
      }

      setSelectedSubtopic(subtopic.id);
      setStep('free_chat');

      const mockKey = `${selectedLevel}_${selectedTopic}_${subtopic.id}`;
      const mockFlow = MOCK_TOPIC_PRACTICE[mockKey];
      if (mockFlow?.length) {
        setMockTopicTurn(1);
        pushBotMessage(mockFlow[0], '現在可以自由輸入，或使用快速回覆。');
        pushBotMessage('現在進入 Mock Practice：打招呼主題。你可以按 Speak 做口說練習。', 'Tap any bot message to open full breakdown + listen/speak.');
        return;
      }

      const starter = getBotResponse(selectedLevel, selectedTopic, subtopic.id)[0] || 'Let us start chatting.';
      setMockTopicTurn(0);
      pushBotMessage(starter, '現在可以自由輸入，或使用快速回覆。');
      return;
    }

    if (step === 'free_chat') {
      const mockKey = `${selectedLevel}_${selectedTopic}_${selectedSubtopic}`;
      const mockFlow = MOCK_TOPIC_PRACTICE[mockKey];

      if (mockFlow?.length) {
        const idx = mockTopicTurn % mockFlow.length;
        pushBotMessage(mockFlow[idx], 'Mock topic practice flow. Tap message to open full breakdown.');
        setMockTopicTurn((prev) => prev + 1);
        return;
      }

      const responses = getBotResponse(selectedLevel, selectedTopic, selectedSubtopic);
      const randomReply = responses[Math.floor(Math.random() * responses.length)] || '很棒，繼續保持！';
      pushBotMessage(randomReply, '可以再傳一句，或點選快速回覆。');
    }
  };

  const sendFromInput = () => {
    handleConversation(inputValue);
    setInputValue('');
  };

  const toggleTranslateMessage = (messageKey) => {
    setTranslatedMessageKeys((prev) => (
      prev.includes(messageKey)
        ? prev.filter((key) => key !== messageKey)
        : [...prev, messageKey]
    ));
  };

  const startVoiceInput = () => {
    const SpeechRecognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LOCALES[lang.id] || 'zh-TW';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsInputRecording(true);
    recognition.onend = () => setIsInputRecording(false);
    recognition.onerror = () => setIsInputRecording(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (!transcript) return;
      setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.start();
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

  const handleSpeakingPractice = (index = null) => {
    let targetSentence;
    let targetPinyin = '';
    let targetZhuyin = '';
    let targetMeaning = '';

    if (index !== null && typeof index === 'number') {
      const msg = messages[index];
      if (!msg) return;
      const bd = buildMessageBreakdown(msg);
      targetSentence = bd.sentence;
      targetPinyin = bd.pinyin;
      targetZhuyin = bd.rows.map((row) => row.bopomofo).join(' · ');
      targetMeaning = bd.meaning;
    } else if (selectedBreakdown) {
      targetSentence = selectedBreakdown.sentence;
      targetPinyin = selectedBreakdown.pinyin;
      targetZhuyin = selectedBreakdown.rows.map((row) => row.bopomofo).join(' · ');
      targetMeaning = selectedBreakdown.meaning;
    } else {
      return;
    }

    setSpeakPracticeData({
      targetSentence,
      targetPinyin,
      targetZhuyin,
      targetMeaning,
      resultPercent: null,
      resultFeedback: null,
      mockTranscript: '',
      isRecognizing: false,
      isPlaybackActive: false
    });
  };

  const startFakeSpeakingRecording = () => {
    if (!speakPracticeData) return;

    setSpeakPracticeData(prev => ({
      ...prev,
      isRecognizing: true,
      resultPercent: null,
      resultFeedback: null,
      mockTranscript: '',
      isPlaybackActive: false
    }));

    // Fake recording delay
    setTimeout(() => {
      const targetTokens = Array.from(speakPracticeData.targetSentence);
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
      const randomPenalty = Math.floor(Math.random() * 7); // 0-6
      const percent = Math.max(68, Math.min(97, 96 - wrongTotal * 8 - randomPenalty));

      const mockTranscript = feedback
        .map((item) => (item.ok ? item.char : '□'))
        .join('');

      setSpeakPracticeData(prev => ({
        ...prev,
        isRecognizing: false,
        resultPercent: percent,
        resultFeedback: feedback,
        mockTranscript
      }));
    }, 2500); // 2.5 second fake recording
  };

  const toggleMockPlayback = () => {
    if (!speakPracticeData?.resultFeedback) return;

    setSpeakPracticeData((prev) => ({ ...prev, isPlaybackActive: true }));
    setTimeout(() => {
      setSpeakPracticeData((prev) => (prev ? { ...prev, isPlaybackActive: false } : prev));
    }, 1800);
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
        {messages.map((message, index) => {
          // Display clean chat bubbles: Hanzi + English only
          const breakdown = buildMessageBreakdown(message);
          const messageKey = `${message.type}-${index}`;
          const isTranslated = translatedMessageKeys.includes(messageKey);
          return (
            <div key={`${message.type}-${index}`} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div
                onClick={() => {
                  setSelectedMessageIndex(index);
                  setPracticeStatus('');
                }}
                className={`text-left max-w-[86%] border-4 border-black p-4 rounded-[1.5rem] shadow-[6px_6px_0_#000] cursor-pointer active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all ${message.type === 'bot' ? 'rounded-tl-none bg-white text-black' : 'rounded-tr-none text-black'}`}
                style={message.type === 'user' ? { backgroundColor: lang.secondaryColor } : undefined}
              >
                <div className="flex flex-wrap items-end mb-1">
                  {breakdown.rows.map((r, i) => (
                    <span key={i} className="text-xl font-serif font-black">{r.token}</span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleTranslateMessage(messageKey);
                  }}
                  className="mt-2 h-8 px-3 rounded-lg border-2 border-black bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                >
                  <Languages size={12} strokeWidth={3} /> {isTranslated ? 'Hide Translation' : 'Translate'}
                </button>

                {isTranslated && (
                  <p className="mt-2 text-xs font-bold text-[#6B7280]">{breakdown.meaning}</p>
                )}
              </div>
            </div>
          );
        })}
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
                onClick={() => setInputValue(option.value)}
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
            onClick={startVoiceInput}
            className={`w-14 h-14 flex-none rounded-2xl border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${isInputRecording ? 'bg-[#FF426A] text-white animate-pulse' : 'bg-white text-black'}`}
            title="Voice Input"
          >
            <Mic size={24} strokeWidth={3} />
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

      {selectedMessage && selectedBreakdown && !selectedToken && !speakPracticeData && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedMessageIndex(null)}
          />

          <div className="relative bg-[#1E1E2A] border-t-8 border-black rounded-t-[2.5rem] p-6 max-h-[75%] overflow-y-auto pb-24">
            <button
              onClick={() => setSelectedMessageIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white border-4 border-black text-black flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <X size={22} strokeWidth={3} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-widest text-[#FFD100] mb-2">
              {selectedMessage.type === 'bot' ? 'Bot message' : 'Your message'}
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
                  <button key={index} onClick={() => setSelectedToken(row)} className="flex flex-col items-center text-black">
                    {showZhuyin && row.bopomofo && <span className="text-[9px] font-black text-[#FF426A] leading-tight mb-0.5">{row.bopomofo}</span>}
                    {showPinyin && row.pinyin && <span className="text-[9px] font-black text-[#A25BFF] leading-tight mb-0.5">{row.pinyin}</span>}
                    <span className="text-xl font-serif font-black leading-none">{row.token}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#F4F4F5] border-4 border-black rounded-2xl p-3">
                <p className="text-[10px] uppercase tracking-widest font-black text-[#7A7A9A]">English Translation</p>
                <p className="text-base font-black text-[#2A2A3B] leading-snug mt-1">{selectedBreakdown.meaning}</p>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-[#1E1E2A] pt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleListeningPractice(selectedMessageIndex)}
                  className="h-12 rounded-xl bg-white border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <Volume2 size={18} strokeWidth={3} /> Listen
                </button>
                <button
                  onClick={() => handleSpeakingPractice(selectedMessageIndex)}
                  className="h-12 rounded-xl border-4 border-black text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  style={{ backgroundColor: lang.secondaryColor }}
                >
                  <Mic size={18} strokeWidth={3} /> Speak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOKEN MODAL (Word breakdown) */}
      {selectedToken && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-[#0B0A10]/80 backdrop-blur-sm" onClick={() => setSelectedToken(null)} />
          <div className="bg-white border-4 border-black rounded-[2rem] p-6 w-full max-w-sm relative z-10 shadow-[12px_12px_0_#A25BFF]">
            <button onClick={() => setSelectedToken(null)} className="absolute top-4 right-4 w-10 h-10 bg-[#FF426A] border-4 border-black rounded-xl flex items-center justify-center text-white"><X size={20} strokeWidth={4} /></button>
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <span className="text-[#FF426A] font-black text-xs uppercase mb-0.5">{selectedToken.bopomofo !== '-' ? selectedToken.bopomofo : ''}</span>
              <span className="text-[#A25BFF] font-black text-lg uppercase mb-1">{selectedToken.pinyin !== '-' ? selectedToken.pinyin : ''}</span>
              <span className="text-6xl font-serif font-black text-black mb-4">{selectedToken.token}</span>
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

      {/* FAKE SPEAKING PRACTICE MODAL */}
      {speakPracticeData && (
        <div className="absolute inset-0 z-[60] flex flex-col justify-end">
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
                <p className="text-[#FF426A] font-black text-xs uppercase text-center break-words">{speakPracticeData.targetZhuyin}</p>
              )}
              {showPinyin && (
                <p className="text-[#A25BFF] font-black text-sm uppercase text-center">{speakPracticeData.targetPinyin}</p>
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

              <p className="text-white font-black text-xs uppercase tracking-widest text-center max-w-[200px]">
                {speakPracticeData.isRecognizing ? 'Recording...' : speakPracticeData.resultPercent !== null ? 'Tap Mic to try again!' : 'Tap Mic & start speaking!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
