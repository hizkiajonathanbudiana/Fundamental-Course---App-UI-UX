// Chatbot levels, topics, and responses
export const CHATBOT_DATA = {
  levels: [
    { id: 'beginner', name: '初級 (Beginner)', icon: '🌱', emoji: '🌱', difficulty: 1 },
    { id: 'intermediate', name: '中級 (Intermediate)', icon: '🌿', emoji: '🌿', difficulty: 2 },
    { id: 'advanced', name: '高級 (Advanced)', icon: '🌳', emoji: '🌳', difficulty: 3 }
  ],

  topics: {
    beginner: [
      { id: 'greetings', name: '打招呼 (Greetings)', emoji: '👋', color: '#00FF87' },
      { id: 'introductions', name: '自我介紹 (Introductions)', emoji: '🤝', color: '#00E5FF' },
      { id: 'food', name: '食物與飲料 (Food & Drinks)', emoji: '🍜', color: '#FFD100' },
      { id: 'daily_life', name: '日常生活 (Daily Life)', emoji: '🏠', color: '#FF426A' }
    ],
    intermediate: [
      { id: 'hobbies', name: '愛好 (Hobbies)', emoji: '🎨', color: '#A25BFF' },
      { id: 'travel', name: '旅遊 (Travel)', emoji: '✈️', color: '#FF5C00' },
      { id: 'shopping', name: '購物 (Shopping)', emoji: '🛍️', color: '#27AE60' },
      { id: 'work', name: '工作與職業 (Work & Career)', emoji: '💼', color: '#3498DB' }
    ],
    advanced: [
      { id: 'philosophy', name: '哲學 (Philosophy)', emoji: '🧠', color: '#9B59B6' },
      { id: 'politics', name: '政治 (Politics)', emoji: '🏛️', color: '#E74C3C' },
      { id: 'technology', name: '科技 (Technology)', emoji: '🔬', color: '#16A085' },
      { id: 'culture', name: '文化與藝術 (Culture & Arts)', emoji: '🎭', color: '#F39C12' }
    ]
  },

  subtopics: {
    beginner_greetings: [
      { id: 'hello', name: '你好 (Hello)', emoji: '👋' },
      { id: 'goodbye', name: '再見 (Goodbye)', emoji: '👋' },
      { id: 'how_are_you', name: '你好嗎？ (How are you?)', emoji: '😊' },
      { id: 'nice_to_meet', name: '很高興見到你 (Nice to meet you)', emoji: '🤝' }
    ],
    beginner_introductions: [
      { id: 'my_name', name: '我的名字是... (My name is...)', emoji: '📝' },
      { id: 'where_from', name: '你來自哪裡？ (Where are you from?)', emoji: '🌍' },
      { id: 'what_do_you', name: '你做什麼工作？ (What do you do?)', emoji: '💼' },
      { id: 'age', name: '年齡與家庭 (Age & family)', emoji: '👨‍👩‍👧' }
    ],
    beginner_food: [
      { id: 'favorite_food', name: '最喜歡的食物 (Favorite food)', emoji: '😋' },
      { id: 'order_restaurant', name: '在餐廳點餐 (Ordering at restaurant)', emoji: '🍽️' },
      { id: 'drinks', name: '飲料 (Drinks & beverages)', emoji: '☕' },
      { id: 'cooking', name: '烹飪與食譜 (Cooking & recipes)', emoji: '👨‍🍳' }
    ],
    beginner_daily_life: [
      { id: 'morning_routine', name: '早晨日常 (Morning routine)', emoji: '🌅' },
      { id: 'work_school', name: '工作與學校 (Work & school)', emoji: '📚' },
      { id: 'free_time', name: '休閒活動 (Free time activities)', emoji: '🎮' },
      { id: 'sleep', name: '睡眠與休息 (Sleep & rest)', emoji: '😴' }
    ]
  },

  // Bot responses in Chinese (simplified example - would be expanded per language)
  botResponses: {
    beginner_greetings_hello: [
      '你好！很高興見到你。(Nǐ hǎo! Hěn gāoxìng jiàndào nǐ.) - Hello! Nice to meet you.',
      '嗨！今天怎麼樣？(Hāi! Jīntiān zěnmeyàng?) - Hi! How are you today?'
    ],
    beginner_greetings_goodbye: [
      '再见！(Zàijiàn!) - Goodbye!',
      '拜拜！下次見。(Bàibai! Xiàcì jiàn.) - Bye! See you next time.'
    ],
    beginner_introductions_my_name: [
      '我叫Momo。很高興認識你！(Wǒ jiào Momo. Hěn gāoxìng rènshi nǐ!) - My name is Momo. Nice to meet you!',
      '你可以叫我Momo。今年我23歲。(Nǐ kěyǐ jiào wǒ Momo. Jīnnián wǒ 23 suì.) - You can call me Momo. I\'m 23 this year.'
    ],
    beginner_food_favorite: [
      '我最喜欢吃面条。你呢？(Wǒ zuì xǐhuān chī miàntiáo. Nǐ ne?) - I like eating noodles the most. How about you?',
      '我喜歡健康的食物。(Wǒ xǐhuān jiànkāng de shíwù.) - I like healthy food.'
    ]
  },

  // Suggested user responses (multiple choice)
  suggestedResponses: {
    beginner_greetings_hello: [
      { text: '你好！(Hello!)', chinese: '你好！' },
      { text: '很高興見到你。(Nice to meet you)', chinese: '很高興見到你。' },
      { text: '我很好，謝謝。(I\'m fine, thank you)', chinese: '我很好，謝謝。' }
    ],
    beginner_introductions_my_name: [
      { text: '我叫Tom。(My name is Tom)', chinese: '我叫Tom。' },
      { text: '我叫Sarah。(My name is Sarah)', chinese: '我叫Sarah。' },
      { text: '我叫John。(My name is John)', chinese: '我叫John。' }
    ],
    beginner_food_favorite: [
      { text: '我喜欢米饭。(I like rice)', chinese: '我喜欢米饭。' },
      { text: '我喜欢比萨。(I like pizza)', chinese: '我喜欢比萨。' },
      { text: '我喜欢汉堡。(I like hamburger)', chinese: '我喜欢汉堡。' }
    ]
  }
};

export const getChatbotTopics = (level) => CHATBOT_DATA.topics[level] || [];
export const getChatbotSubtopics = (level, topicId) => CHATBOT_DATA.subtopics[`${level}_${topicId}`] || [];
export const getBotResponse = (level, topic, subtopic) => {
  const key = `${level}_${topic}_${subtopic}`;
  return CHATBOT_DATA.botResponses[key] || ['想要交流嗎？(Xiǎng yào jiāoliú ma?) - Do you want to chat?'];
};
export const getSuggestedResponses = (level, topic, subtopic) => {
  const key = `${level}_${topic}_${subtopic}`;
  const fallback = [
    { text: '是 (Yes)', chinese: '是' },
    { text: '不是 (No)', chinese: '不是' }
  ];

  const raw = CHATBOT_DATA.suggestedResponses[key] || fallback;
  return raw.map((item) => {
    const hanzi = (item.chinese || '').trim() || item.text.replace(/\([^)]*\)/g, '').trim();
    const englishMatch = item.text.match(/\(([^)]*)\)/);
    const english = (englishMatch?.[1] || '').trim();

    return {
      ...item,
      chinese: hanzi,
      text: english ? `${hanzi} (${english})` : item.text
    };
  });
};
