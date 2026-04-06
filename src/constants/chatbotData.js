// Chatbot levels, topics, and responses
export const CHATBOT_DATA = {
  levels: [
    { id: 'beginner', name: 'Beginner', icon: '🌱', emoji: '🌱', difficulty: 1 },
    { id: 'intermediate', name: 'Intermediate', icon: '🌿', emoji: '🌿', difficulty: 2 },
    { id: 'advanced', name: 'Advanced', icon: '🌳', emoji: '🌳', difficulty: 3 }
  ],

  topics: {
    beginner: [
      { id: 'greetings', name: 'Greetings', emoji: '👋', color: '#00FF87' },
      { id: 'introductions', name: 'Introductions', emoji: '🤝', color: '#00E5FF' },
      { id: 'food', name: 'Food & Drinks', emoji: '🍜', color: '#FFD100' },
      { id: 'daily_life', name: 'Daily Life', emoji: '🏠', color: '#FF426A' }
    ],
    intermediate: [
      { id: 'hobbies', name: 'Hobbies', emoji: '🎨', color: '#A25BFF' },
      { id: 'travel', name: 'Travel', emoji: '✈️', color: '#FF5C00' },
      { id: 'shopping', name: 'Shopping', emoji: '🛍️', color: '#27AE60' },
      { id: 'work', name: 'Work & Career', emoji: '💼', color: '#3498DB' }
    ],
    advanced: [
      { id: 'philosophy', name: 'Philosophy', emoji: '🧠', color: '#9B59B6' },
      { id: 'politics', name: 'Politics', emoji: '🏛️', color: '#E74C3C' },
      { id: 'technology', name: 'Technology', emoji: '🔬', color: '#16A085' },
      { id: 'culture', name: 'Culture & Arts', emoji: '🎭', color: '#F39C12' }
    ]
  },

  subtopics: {
    beginner_greetings: [
      { id: 'hello', name: 'Hello', emoji: '👋' },
      { id: 'goodbye', name: 'Goodbye', emoji: '👋' },
      { id: 'how_are_you', name: 'How are you?', emoji: '😊' },
      { id: 'nice_to_meet', name: 'Nice to meet you', emoji: '🤝' }
    ],
    beginner_introductions: [
      { id: 'my_name', name: 'My name is...', emoji: '📝' },
      { id: 'where_from', name: 'Where are you from?', emoji: '🌍' },
      { id: 'what_do_you', name: 'What do you do?', emoji: '💼' },
      { id: 'age', name: 'Age & family', emoji: '👨‍👩‍👧' }
    ],
    beginner_food: [
      { id: 'favorite_food', name: 'Favorite food', emoji: '😋' },
      { id: 'order_restaurant', name: 'Ordering at restaurant', emoji: '🍽️' },
      { id: 'drinks', name: 'Drinks & beverages', emoji: '☕' },
      { id: 'cooking', name: 'Cooking & recipes', emoji: '👨‍🍳' }
    ],
    beginner_daily_life: [
      { id: 'morning_routine', name: 'Morning routine', emoji: '🌅' },
      { id: 'work_school', name: 'Work & school', emoji: '📚' },
      { id: 'free_time', name: 'Free time activities', emoji: '🎮' },
      { id: 'sleep', name: 'Sleep & rest', emoji: '😴' }
    ]
  },

  // Bot responses in Chinese (simplified example - would be expanded per language)
  botResponses: {
    beginner_greetings_hello: [
      '你好！很高兴见到你。(Nǐ hǎo! Hěn gāoxìng jiàndào nǐ.) - Hello! Nice to meet you.',
      '嗨！今天怎么样？(Hāi! Jīntiān zěnyàyang?) - Hi! How are you today?'
    ],
    beginner_greetings_goodbye: [
      '再见！(Zàijiàn!) - Goodbye!',
      '拜拜！下次见。(Bàibai! Xiàcì jiàn.) - Bye! See you next time.'
    ],
    beginner_introductions_my_name: [
      '我叫Momo。很高兴认识你！(Wǒ jiào Momo. Hěn gāoxìng rènshi nǐ!) - My name is Momo. Nice to meet you!',
      '你可以叫我Momo。今年我23岁。(Nǐ kěyǐ jiào wǒ Momo. Jīnnián wǒ 23 suì.) - You can call me Momo. I\'m 23 this year.'
    ],
    beginner_food_favorite: [
      '我最喜欢吃面条。你呢？(Wǒ zuì xǐhuān chī miàntiáo. Nǐ ne?) - I like eating noodles the most. How about you?',
      '我喜欢健康的食物。(Wǒ xǐhuān jiànkāng de shíwù.) - I like healthy food.'
    ]
  },

  // Suggested user responses (multiple choice)
  suggestedResponses: {
    beginner_greetings_hello: [
      { text: '你好！(How are you?)', chinese: '你好！' },
      { text: '很高兴见到你。(Nice to meet you)', chinese: '很高兴见到你。' },
      { text: '我很好，谢谢。(I\'m fine, thank you)', chinese: '我很好，谢谢。' }
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
  return CHATBOT_DATA.botResponses[key] || ['想要交流吗？(Do you want to chat?)'];
};
export const getSuggestedResponses = (level, topic, subtopic) => {
  const key = `${level}_${topic}_${subtopic}`;
  return CHATBOT_DATA.suggestedResponses[key] || [
    { text: 'Yes (是)', chinese: '是' },
    { text: 'No (不是)', chinese: '不是' }
  ];
};
