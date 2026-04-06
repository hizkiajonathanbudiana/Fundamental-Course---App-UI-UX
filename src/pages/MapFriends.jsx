// import React from 'react';
// import { MapPin, Search, UserPlus } from 'lucide-react';

// export default function MapFriends({ onNavigate }) {
//   const friends = [
//     { name: "Chen Wei", status: "Pro Speaker", distance: "200m away", bg: "bg-[#00E5FF]" },
//     { name: "Sarah K.", status: "Learning Mandarin", distance: "1.2km away", bg: "bg-[#FF426A]" },
//     { name: "Kenji", status: "Beginner", distance: "2.5km away", bg: "bg-[#FFD100]" }
//   ];

//   return (
//     <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-y-auto pb-32">
      
//       {/* Header */}
//       <div className="p-5 pt-8 bg-[#1E1E2A] border-b-4 border-black sticky top-0 z-20">
//         <h1 className="text-2xl font-black text-white uppercase tracking-widest">Discover</h1>
//       </div>

//       {/* Pseudo Map Area */}
//       <div className="p-5">
//         <div className="w-full h-48 bg-[#2A2A3B] border-4 border-black rounded-[2rem] shadow-[6px_6px_0_#000] relative overflow-hidden flex items-center justify-center">
//           {/* Fake Map Paths */}
//           <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
//             <path d="M0 50 Q 25 20, 50 50 T 100 50" stroke="#00FF87" strokeWidth="2" fill="none" />
//             <path d="M20 0 L 20 100 M 80 0 L 80 100" stroke="#00E5FF" strokeWidth="2" strokeDasharray="4 4" />
//           </svg>
//           <div className="bg-[#00FF87] border-4 border-black p-3 rounded-full shadow-[4px_4px_0_#000] animate-bounce">
//             <MapPin size={32} className="text-black" />
//           </div>
//           <div className="absolute bottom-4 left-4 right-4 bg-white border-4 border-black px-4 py-2 rounded-xl text-black font-black text-xs uppercase tracking-widest text-center">
//             Taipei City, Taiwan
//           </div>
//         </div>
//       </div>

//       {/* Suggested Friends List */}
//       <div className="px-5">
//         <h2 className="text-white font-black text-xl uppercase tracking-widest mb-4">Suggested Friends</h2>
//         <div className="space-y-4">
//           {friends.map((friend, i) => (
//             <div key={i} className="bg-white border-4 border-black p-4 rounded-2xl flex items-center gap-4 shadow-[4px_4px_0_#000]">
//               <div className={`w-14 h-14 flex-none ${friend.bg} border-2 border-black rounded-xl shadow-[2px_2px_0_#000] flex items-center justify-center overflow-hidden`}>
//                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.name}`} alt={friend.name} className="w-full h-full bg-white/50" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="text-black font-black text-lg truncate">{friend.name}</h3>
//                 <p className="text-[#A25BFF] font-bold text-xs uppercase tracking-widest truncate">{friend.status}</p>
//                 <p className="text-[#7A7A9A] font-bold text-xs truncate mt-1">{friend.distance}</p>
//               </div>
//               <button className="w-12 h-12 flex-none bg-[#2A2A3B] border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
//                 <UserPlus size={20} className="text-[#00FF87]" strokeWidth={3} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import RadarCard from '../components/RadarCard';
import { LANGUAGES } from '../constants/languages';
import MascotRenderer from '../components/MascotRenderer';
import { useAppContext } from '../context/AppContext';

export default function MapFriends({ lang }) {
  const { nativeLang } = useAppContext();
  const [sentRequestIds, setSentRequestIds] = useState([]);
  const [mapStatus, setMapStatus] = useState('');

  const baseFriends = [
    { id: 1, name: 'Chen Wei', learningLangId: 'zh_tw', nativeLangId: 'zh_tw', status: 'Native Speaker', distanceKm: 0.2, x: '10%', y: '15%', delay: '0s' },
    { id: 2, name: 'Sarah K.', learningLangId: 'zh_tw', nativeLangId: 'en', status: 'Learning (Unit 2)', distanceKm: 1.2, x: '75%', y: '10%', delay: '0.5s' },
    { id: 3, name: 'Kenji', learningLangId: 'en', nativeLangId: 'ja', status: 'Native Speaker', distanceKm: 2.5, x: '65%', y: '70%', delay: '1s' },
    { id: 4, name: 'Luna', learningLangId: 'es', nativeLangId: 'zh_tw', status: 'Conversation Partner', distanceKm: 1.7, x: '20%', y: '68%', delay: '1.2s' }
  ];

  const friends = baseFriends.map((friend) => {
    const sameLearningTrack = friend.learningLangId === lang.id;
    const nativeMatchesMyLearning = friend.nativeLangId === lang.id;

    let recommendationReason = '';
    if (sameLearningTrack && nativeMatchesMyLearning) {
      recommendationReason = 'Same learning track + native support';
    } else if (sameLearningTrack) {
      recommendationReason = `Also learning ${lang.name}`;
    } else if (nativeMatchesMyLearning) {
      recommendationReason = `Native ${lang.name} speaker`;
    }

    return {
      ...friend,
      recommended: sameLearningTrack || nativeMatchesMyLearning,
      recommendationReason
    };
  });

  const recommendations = friends.filter((friend) => friend.recommended);

  const sendFriendRequest = (friend) => {
    if (!friend?.id) return;

    if (sentRequestIds.includes(friend.id)) {
      setMapStatus(`Request to ${friend.name} already sent.`);
      return;
    }

    setSentRequestIds((prev) => [...prev, friend.id]);
    setMapStatus(`Friend request sent to ${friend.name}.`);
  };

  const sendRecommendedRequests = () => {
    const recommendationIds = recommendations.map((friend) => friend.id);
    const newIds = recommendationIds.filter((id) => !sentRequestIds.includes(id));

    if (!newIds.length) {
      setMapStatus('All recommendation requests are already sent.');
      return;
    }

    setSentRequestIds((prev) => [...prev, ...newIds]);
    setMapStatus(`Sent ${newIds.length} recommendation request${newIds.length > 1 ? 's' : ''}.`);
  };

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-y-auto pb-32">
      <div className="p-5 pt-8 bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 shadow-[0_4px_0_#000]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Radar</h1>
          <button
            onClick={sendRecommendedRequests}
            className="h-10 px-3 rounded-xl bg-[#FFD100] border-4 border-black text-black font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Send Requests
          </button>
        </div>
      </div>

      {mapStatus && (
        <div className="px-5 pt-3">
          <p className="inline-block bg-[#00FF87] text-black border-4 border-black rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest">
            {mapStatus}
          </p>
        </div>
      )}

      <div className="p-5">
        <RadarCard
          learningLang={lang}
          nativeLang={nativeLang}
          nearbyLearners={friends}
          radarLabel="Live Radar"
          subtitle={`${friends.length} Friends Nearby`}
        />
      </div>

      <div className="px-5 mb-6">
        <h2 className="text-white font-black text-xl uppercase tracking-widest mb-3">Recommendations</h2>
        <div className="space-y-3">
          {recommendations.length === 0 && (
            <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0_#000]">
              <p className="text-black font-black text-sm">No recommendation yet. Keep scanning for more learners nearby.</p>
            </div>
          )}

          {recommendations.map((friend) => {
            const friendNative = LANGUAGES[friend.nativeLangId];

            return (
              <div key={`rec-${friend.id}`} className="bg-[#FFD100] border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0_#000]">
                <p className="text-black font-black text-base mb-1 flex items-center gap-2">
                  {friend.name}
                  <span className="text-xs">{friendNative?.flag || '🏳️'}</span>
                </p>
                <p className="text-black font-black text-[10px] uppercase tracking-widest">{friend.recommendationReason}</p>
                <button
                  onClick={() => sendFriendRequest(friend)}
                  className="mt-3 h-9 px-3 rounded-lg bg-white border-2 border-black text-black font-black text-[10px] uppercase tracking-widest"
                >
                  {sentRequestIds.includes(friend.id) ? 'Request Sent' : 'Send Friend Request'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-white font-black text-xl uppercase tracking-widest mb-4">Nearby Learners</h2>
        <div className="space-y-4">
          {friends.map((friend) => {
            const learningLang = LANGUAGES[friend.learningLangId];
            const nativeLanguage = LANGUAGES[friend.nativeLangId];

            return (
              <div key={friend.id} className="bg-white border-4 border-black p-4 rounded-2xl flex items-center gap-4 shadow-[4px_4px_0_#000]">
                <div className="w-14 h-14 flex-none border-4 border-black rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: learningLang?.primaryColor || lang.primaryColor }}>
                  <MascotRenderer languageId={friend.learningLangId} animated={false} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-black font-black text-lg truncate flex items-center gap-2">
                    {friend.name}
                    <span className="text-sm">{nativeLanguage?.flag || '🏳️'}</span>
                  </h3>
                  <p className="font-black text-[10px] uppercase tracking-widest truncate" style={{ color: lang.primaryColor }}>{friend.status}</p>
                  <p className="text-[#7A7A9A] font-bold text-xs truncate mt-1">{friend.distanceKm} km away</p>
                </div>
                <button
                  onClick={() => sendFriendRequest(friend)}
                  className="w-12 h-12 flex-none bg-[#2A2A3B] border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  title={sentRequestIds.includes(friend.id) ? 'Request Sent' : 'Add Friend'}
                >
                  <UserPlus size={20} className="text-white" strokeWidth={3} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
