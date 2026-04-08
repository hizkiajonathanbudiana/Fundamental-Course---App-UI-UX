import { LANGUAGES } from './languages';

export const BASE_RADAR_LEARNERS = [
  { id: 1, name: 'Chen Wei', learningLangId: 'zh_tw', nativeLangId: 'zh_tw', status: 'Native Speaker', distanceKm: 0.2, x: '10%', y: '15%', delay: '0s', isFriend: true, threadId: 'chen-wei' },
  { id: 2, name: 'Sarah K.', learningLangId: 'zh_tw', nativeLangId: 'en', status: 'Learning (Unit 2)', distanceKm: 1.2, x: '75%', y: '10%', delay: '0.5s', isFriend: true, threadId: 'sarah-k' },
  { id: 3, name: 'Kenji', learningLangId: 'en', nativeLangId: 'ja', status: 'Native Speaker', distanceKm: 2.5, x: '65%', y: '70%', delay: '1s', isFriend: true, threadId: 'kenji' },
  { id: 4, name: 'Luna', learningLangId: 'es', nativeLangId: 'zh_tw', status: 'Conversation Partner', distanceKm: 1.7, x: '20%', y: '68%', delay: '1.2s', isFriend: true, threadId: 'luna' },
  { id: 5, name: 'Mika', learningLangId: 'zh_tw', nativeLangId: 'ja', status: 'Daily learner', distanceKm: 3.4, x: '38%', y: '14%', delay: '0.9s', isFriend: true, threadId: 'mika' },
  { id: 6, name: 'Oliver', learningLangId: 'fr', nativeLangId: 'zh_tw', status: 'Travel mode', distanceKm: 4.8, x: '84%', y: '56%', delay: '0.4s', isFriend: false },
  { id: 7, name: 'Anya', learningLangId: 'ko', nativeLangId: 'zh_tw', status: 'Grammar sprint', distanceKm: 6.1, x: '12%', y: '52%', delay: '1.1s', isFriend: true, threadId: 'anya' },
  { id: 8, name: 'Pablo', learningLangId: 'zh_tw', nativeLangId: 'es', status: 'Pronunciation drill', distanceKm: 7.6, x: '56%', y: '26%', delay: '0.8s', isFriend: false },
  { id: 9, name: 'Rika', learningLangId: 'th', nativeLangId: 'ja', status: 'Commuter practice', distanceKm: 9.4, x: '28%', y: '82%', delay: '0.6s', isFriend: true, threadId: 'rika' },
  { id: 10, name: 'Andi', learningLangId: 'zh_tw', nativeLangId: 'en', status: 'Vocabulary boost', distanceKm: 11.8, x: '90%', y: '30%', delay: '0.7s', isFriend: false },
  { id: 11, name: 'Nina', learningLangId: 'de', nativeLangId: 'zh_tw', status: 'Listening challenge', distanceKm: 13.9, x: '44%', y: '74%', delay: '1.3s', isFriend: false },
  { id: 12, name: 'Rahul', learningLangId: 'hi', nativeLangId: 'en', status: 'Sentence builder', distanceKm: 16.7, x: '72%', y: '83%', delay: '1.1s', isFriend: false },
  { id: 13, name: 'Yuki', learningLangId: 'zh_tw', nativeLangId: 'ja', status: 'Beginner chat', distanceKm: 19.6, x: '6%', y: '35%', delay: '0.3s', isFriend: false },
  { id: 14, name: 'Emma', learningLangId: 'it', nativeLangId: 'zh_tw', status: 'Weekend practice', distanceKm: 23.4, x: '47%', y: '6%', delay: '0.9s', isFriend: false },
  { id: 15, name: 'Bao', learningLangId: 'vi', nativeLangId: 'zh_tw', status: 'Cafe meetup', distanceKm: 27.8, x: '62%', y: '90%', delay: '1.4s', isFriend: false },
  { id: 16, name: 'Soojin', learningLangId: 'zh_tw', nativeLangId: 'ko', status: 'Focused mode', distanceKm: 31.5, x: '31%', y: '44%', delay: '1s', isFriend: true, threadId: 'soojin' },
  { id: 17, name: 'Daniel', learningLangId: 'pt', nativeLangId: 'zh_tw', status: 'Night owl learner', distanceKm: 35.7, x: '80%', y: '69%', delay: '0.5s', isFriend: false },
  { id: 18, name: 'Mariam', learningLangId: 'ar', nativeLangId: 'zh_tw', status: 'Roleplay fan', distanceKm: 39.8, x: '18%', y: '6%', delay: '1.6s', isFriend: false }
];

export const buildRadarLearners = (activeLearningLangId) => {
  const activeLangName = LANGUAGES[activeLearningLangId]?.name || 'your language';

  return BASE_RADAR_LEARNERS.map((friend) => {
    const sameLearningTrack = friend.learningLangId === activeLearningLangId;
    const nativeMatchesMyLearning = friend.nativeLangId === activeLearningLangId;

    let recommendationReason = '';
    let recommendationType = null;
    if (sameLearningTrack && nativeMatchesMyLearning) {
      recommendationReason = 'Same learning track + native support';
      recommendationType = 'both';
    } else if (sameLearningTrack) {
      recommendationReason = `Also learning ${activeLangName}`;
      recommendationType = 'learning';
    } else if (nativeMatchesMyLearning) {
      recommendationReason = `Native ${activeLangName} speaker`;
      recommendationType = 'native';
    }

    return {
      ...friend,
      recommended: sameLearningTrack || nativeMatchesMyLearning,
      recommendationReason,
      recommendationType
    };
  });
};