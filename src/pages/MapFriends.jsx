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

import React, { useEffect, useRef, useState } from 'react';
import { Clock3, Inbox, MessageCircle, UserPlus, X } from 'lucide-react';
import RadarCard from '../components/RadarCard';
import { LANGUAGES } from '../constants/languages';
import MascotRenderer from '../components/MascotRenderer';
import { useAppContext } from '../context/AppContext';
import { buildRadarLearners } from '../constants/radarData';

export default function MapFriends({ lang, onNavigate }) {
  const { nativeLang } = useAppContext();
  const [sentRequestIds, setSentRequestIds] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showIncomingRequests, setShowIncomingRequests] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [connectedFriendIds, setConnectedFriendIds] = useState([]);
  const [requestComposer, setRequestComposer] = useState({
    isOpen: false,
    friend: null,
    message: ''
  });
  const [incomingRequests, setIncomingRequests] = useState([
    { id: 'req-1', name: 'Mika', note: 'Wants to practice daily conversation.' },
    { id: 'req-2', name: 'Oliver', note: 'Invited you to a weekend roleplay.' },
    { id: 'req-3', name: 'Yuki', note: 'Asked for pronunciation exchange.' }
  ]);

  const friends = buildRadarLearners(lang.id);
  const filterScrollerRef = useRef(null);

  const isAlreadyFriend = (friend) => friend.isFriend || connectedFriendIds.includes(friend.id);

  const filteredFriends = friends.filter((friend) => {
    if (activeFilter === 'friends') return isAlreadyFriend(friend);
    if (activeFilter === 'discover') return !isAlreadyFriend(friend);
    if (activeFilter === 'recommended') return friend.recommended;
    return true;
  });

  useEffect(() => {
    if (!feedbackMessage) return;

    const timeoutId = setTimeout(() => {
      setFeedbackMessage('');
    }, 1800);

    return () => clearTimeout(timeoutId);
  }, [feedbackMessage]);

  const openRequestComposer = (friend) => {
    if (!friend?.id || sentRequestIds.includes(friend.id) || isAlreadyFriend(friend)) return;

    setRequestComposer({
      isOpen: true,
      friend,
      message: `Hi ${friend.name}! Wants to practice daily conversation.`
    });
  };

  const closeRequestComposer = () => {
    setRequestComposer({ isOpen: false, friend: null, message: '' });
  };

  const sendFriendRequest = (friend, customMessage = '') => {
    if (!friend?.id) return;

    if (sentRequestIds.includes(friend.id)) {
      setFeedbackMessage(`Request to ${friend.name} already sent.`);
      return;
    }

    setSentRequestIds((prev) => [...prev, friend.id]);
    if (customMessage) {
      setFeedbackMessage(`Request sent to ${friend.name}: "${customMessage}"`);
      return;
    }

    setFeedbackMessage(`Friend request sent to ${friend.name}.`);
  };

  const handleIncomingRequest = (request, decision) => {
    setIncomingRequests((prev) => prev.filter((item) => item.id !== request.id));
    if (decision === 'accepted') {
      const matched = friends.find((friend) => friend.name === request.name);
      if (matched) {
        setConnectedFriendIds((prev) => (prev.includes(matched.id) ? prev : [...prev, matched.id]));
      }
    }
    setFeedbackMessage(`${request.name} request ${decision === 'accepted' ? 'accepted' : 'declined'}.`);
  };

  const handleFilterWheel = (event) => {
    const element = filterScrollerRef.current;
    if (!element) return;

    if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
    element.scrollLeft += event.deltaY;
    event.preventDefault();
  };


  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-y-auto pb-32">
      <div className="sticky top-0 z-30 px-5 pt-6 pb-2">
        <div className="flex items-center justify-between gap-3 bg-[#2A2A3B]/70 backdrop-blur-md border-4 border-black rounded-2xl px-4 py-3 shadow-[6px_6px_0_#000]">
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Radar</h1>
          <button
            onClick={() => setShowIncomingRequests((prev) => !prev)}
            className="h-10 px-3 rounded-xl bg-[#00E5FF] border-4 border-black text-black font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-1.5"
          >
            <Inbox size={14} strokeWidth={3} />
            Requests In ({incomingRequests.length})
          </button>
        </div>

        <div
          ref={filterScrollerRef}
          onWheel={handleFilterWheel}
          className="mt-2 flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[
            { id: 'all', label: 'All' },
            { id: 'friends', label: 'Friends' },
            { id: 'discover', label: 'Discover' },
            { id: 'recommended', label: 'Recommended' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`h-8 px-3 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${activeFilter === filter.id ? 'bg-[#00FF87] text-black shadow-[2px_2px_0_#000]' : 'bg-white text-black'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {showIncomingRequests && (
        <div
          className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={() => setShowIncomingRequests(false)}
        >
          <div
            className="w-full max-w-[360px] bg-white border-4 border-black rounded-3xl p-4 shadow-[8px_8px_0_#000]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-black font-black text-sm uppercase tracking-widest">Incoming Requests</h3>
              <button
                onClick={() => setShowIncomingRequests(false)}
                className="w-8 h-8 rounded-xl border-2 border-black bg-[#F3F3F3] flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {incomingRequests.length === 0 && (
                <p className="text-black font-black text-xs bg-[#F4F4F5] border-2 border-black rounded-xl p-3">No pending requests.</p>
              )}

              {incomingRequests.map((request) => (
                <div key={request.id} className="border-2 border-black rounded-xl px-3 py-2 bg-[#F4F4F5]">
                  <p className="text-black font-black text-xs uppercase tracking-widest">{request.name}</p>
                  <p className="text-black font-bold text-xs mt-1">{request.note}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleIncomingRequest(request, 'accepted')}
                      className="flex-1 h-8 rounded-lg border-2 border-black bg-[#00FF87] text-black font-black text-[10px] uppercase tracking-widest"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleIncomingRequest(request, 'declined')}
                      className="flex-1 h-8 rounded-lg border-2 border-black bg-white text-black font-black text-[10px] uppercase tracking-widest"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-5 pt-1">
        <RadarCard
          learningLang={lang}
          nativeLang={nativeLang}
          nearbyLearners={filteredFriends}
          radarLabel="Live Radar"
          subtitle={`${filteredFriends.length} ${activeFilter === 'friends' ? 'Friends' : 'Learners'} Nearby`}
          showRangeControls
          showRecommendationToggle
          initialRangeKm={5}
          onAddFriendClick={openRequestComposer}
          requestedUserIds={sentRequestIds}
          radarHeightClass="h-[360px]"
        />

        <div className="mt-2 bg-[#1A1A24] border-4 border-black rounded-2xl p-3 text-white shadow-[4px_4px_0_#000]">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2">Recommendation Rules</p>
          <ul className="space-y-1 text-xs font-bold text-[#D4D4D8]">
            <li><span className="inline-block w-2 h-2 rounded-full bg-[#FFD100] mr-2" />Same learning language (same mascot family).</li>
            <li><span className="inline-block w-2 h-2 rounded-full bg-[#00E5FF] mr-2" />Their native language matches your learning language.</li>
            <li><span className="inline-block w-2 h-2 rounded-full bg-[#00FF87] mr-2" />Both conditions match (strong recommendation).</li>
          </ul>
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-white font-black text-xl uppercase tracking-widest mb-4">Nearby Learners</h2>
        <div className="space-y-4">
          {filteredFriends.map((friend) => {
            const learningLang = LANGUAGES[friend.learningLangId];
            const nativeLanguage = LANGUAGES[friend.nativeLangId];
            const alreadyFriend = isAlreadyFriend(friend);

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
                  onClick={() => {
                    if (alreadyFriend) {
                      if (friend.threadId) {
                        onNavigate('direct-chat', { threadId: friend.threadId });
                      } else {
                        onNavigate('chats');
                      }
                      return;
                    }

                    openRequestComposer(friend);
                  }}
                  className={`w-12 h-12 flex-none border-4 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${alreadyFriend ? 'bg-[#00FF87]' : sentRequestIds.includes(friend.id) ? 'bg-[#FFD100]' : 'bg-[#2A2A3B]'
                    }`}
                  title={alreadyFriend ? 'Open Chat' : sentRequestIds.includes(friend.id) ? 'Request Sent' : 'Add Friend'}
                >
                  {alreadyFriend ? (
                    <MessageCircle size={19} className="text-black" strokeWidth={3} />
                  ) : sentRequestIds.includes(friend.id) ? (
                    <Clock3 size={18} className="text-black" strokeWidth={3} />
                  ) : (
                    <UserPlus size={20} className="text-white" strokeWidth={3} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {requestComposer.isOpen && requestComposer.friend && (
        <div
          className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={closeRequestComposer}
        >
          <div
            className="w-full max-w-[360px] bg-white border-4 border-black rounded-3xl p-4 shadow-[8px_8px_0_#000]"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-black font-black text-sm uppercase tracking-widest">Send Friend Request</h3>
            <p className="text-black font-black text-xs mt-2">To: {requestComposer.friend.name}</p>

            <textarea
              value={requestComposer.message}
              onChange={(event) =>
                setRequestComposer((prev) => ({
                  ...prev,
                  message: event.target.value
                }))
              }
              rows={4}
              className="w-full mt-3 resize-none rounded-xl border-2 border-black px-3 py-2 text-xs font-bold text-black bg-[#F8F8FA]"
              placeholder="Wants to practice daily conversation."
            />

            <div className="mt-4 flex gap-2">
              <button
                onClick={closeRequestComposer}
                className="flex-1 h-10 rounded-xl border-2 border-black bg-white text-black font-black text-xs uppercase tracking-widest"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const trimmed = requestComposer.message.trim();
                  if (!trimmed) return;
                  sendFriendRequest(requestComposer.friend, trimmed);
                  closeRequestComposer();
                }}
                disabled={!requestComposer.message.trim()}
                className={`flex-1 h-10 rounded-xl border-2 border-black font-black text-xs uppercase tracking-widest ${requestComposer.message.trim() ? 'bg-[#00FF87] text-black' : 'bg-[#D4D4D8] text-[#777]'
                  }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {feedbackMessage && (
        <div className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] bg-white border-4 border-black rounded-3xl p-4 shadow-[8px_8px_0_#000] text-center">
            <p className="text-black font-black text-xs uppercase tracking-widest">Friend Request</p>
            <p className="text-black font-bold text-sm mt-2">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage('')}
              className="mt-4 h-9 px-6 rounded-xl border-2 border-black bg-[#00FF87] text-black font-black text-xs uppercase tracking-widest"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
