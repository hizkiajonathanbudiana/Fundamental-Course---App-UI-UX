import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, QrCode, Search, Send, UserPlus, X } from 'lucide-react';
import { LANGUAGES } from '../constants/languages';

const INITIAL_REQUESTS = [
  { id: 'hana_ko', name: 'Hana', message: 'Can we practice beginner Korean dialogs?', nativeLangId: 'ko' },
  { id: 'alex_ru', name: 'Alex', message: 'Looking for a Mandarin speaking buddy.', nativeLangId: 'ru' }
];

const buildUserId = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

export default function AddFriend({ onNavigate, friendCandidate }) {
  const [searchId, setSearchId] = useState('');
  const [incomingRequests, setIncomingRequests] = useState(INITIAL_REQUESTS);
  const [sentRequests, setSentRequests] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (friendCandidate?.name) {
      setSearchId(buildUserId(friendCandidate.name));
      setStatus(`Selected from radar: ${friendCandidate.name}`);
    }
  }, [friendCandidate]);

  const sendRequest = (targetId, displayName = null) => {
    const normalized = targetId.trim().replace(/^@/, '');
    if (!normalized) return;

    const alreadySent = sentRequests.some((request) => request.id === normalized);
    if (alreadySent) {
      setStatus(`Request to @${normalized} already sent.`);
      return;
    }

    const nextRequest = {
      id: normalized,
      name: displayName || normalized,
      status: 'pending'
    };

    setSentRequests((prev) => [nextRequest, ...prev]);
    setStatus(`Friend request sent to @${normalized}.`);
  };

  const acceptRequest = (requestId) => {
    const target = incomingRequests.find((request) => request.id === requestId);
    setIncomingRequests((prev) => prev.filter((request) => request.id !== requestId));
    setStatus(target ? `You are now connected with ${target.name}.` : 'Friend request accepted.');
  };

  const declineRequest = (requestId) => {
    const target = incomingRequests.find((request) => request.id === requestId);
    setIncomingRequests((prev) => prev.filter((request) => request.id !== requestId));
    setStatus(target ? `Request from ${target.name} declined.` : 'Friend request declined.');
  };

  const sendFromSearch = () => {
    sendRequest(searchId);
  };

  const sendFromMapCandidate = () => {
    if (!friendCandidate?.name) return;
    sendRequest(buildUserId(friendCandidate.name), friendCandidate.name);
  };

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col overflow-y-auto overflow-x-hidden pb-8">
      <div className="p-5 pt-8 bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 shadow-[0_4px_0_#000]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('chats')}
            className="w-11 h-11 rounded-xl bg-white border-4 border-black text-black flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-widest">Add Friend</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF]">QR, ID Search, and Requests</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {friendCandidate && (
          <div className="bg-[#FFD100] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
            <p className="text-black font-black text-xs uppercase tracking-widest mb-2">From Radar</p>
            <p className="text-black font-black text-lg mb-1">{friendCandidate.name}</p>
            <p className="text-black/80 font-bold text-sm mb-3">
              Learning: {LANGUAGES[friendCandidate.learningLangId]?.name || '-'}
            </p>
            <button
              onClick={sendFromMapCandidate}
              className="h-10 px-3 rounded-xl bg-white border-4 border-black text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[3px_3px_0_#000]"
            >
              <UserPlus size={16} strokeWidth={3} /> Send Request
            </button>
          </div>
        )}

        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 mb-3">
            <QrCode size={18} className="text-black" />
            <p className="text-black font-black text-xs uppercase tracking-widest">Scan Friend QR</p>
          </div>
          <div className="w-full h-40 rounded-2xl border-4 border-dashed border-black bg-[#F3F4F6] flex items-center justify-center mb-3">
            <div className="w-24 h-24 bg-black text-white rounded-xl flex items-center justify-center font-black text-xs uppercase tracking-widest">
              QR AREA
            </div>
          </div>
          <button
            onClick={() => setStatus('QR scanner preview opened (mock mode).')}
            className="h-10 px-3 rounded-xl bg-[#00E5FF] border-4 border-black text-black font-black text-[10px] uppercase tracking-widest"
          >
            Open QR Scanner
          </button>
        </div>

        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-2 mb-3">
            <Search size={18} className="text-black" />
            <p className="text-black font-black text-xs uppercase tracking-widest">Search By ID</p>
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <div className="w-full min-w-0 h-11 border-4 border-black rounded-xl px-3 flex items-center gap-2 bg-[#F9FAFB]">
              <span className="text-black font-black">@</span>
              <input
                value={searchId}
                onChange={(event) => setSearchId(event.target.value)}
                placeholder="friend_id"
                className="flex-1 bg-transparent text-black font-bold outline-none"
              />
            </div>
            <button
              onClick={sendFromSearch}
              className="w-full h-11 px-3 rounded-xl bg-[#00FF87] border-4 border-black text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1"
            >
              <Send size={14} strokeWidth={3} /> Request
            </button>
          </div>
        </div>

        <div className="bg-[#2A2A3B] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
          <p className="text-white font-black text-xs uppercase tracking-widest mb-3">Incoming Requests</p>

          {incomingRequests.length === 0 && (
            <p className="text-[#A1A1AA] font-bold text-sm">No incoming requests right now.</p>
          )}

          <div className="space-y-3">
            {incomingRequests.map((request) => (
              <div key={request.id} className="bg-white border-2 border-black rounded-xl p-3">
                <p className="text-black font-black text-sm">{request.name}</p>
                <p className="text-[#4B5563] font-bold text-xs mb-3">{request.message}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => acceptRequest(request.id)}
                    className="h-9 px-3 rounded-lg bg-[#00FF87] border-2 border-black text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-1"
                  >
                    <Check size={14} strokeWidth={3} /> Accept
                  </button>
                  <button
                    onClick={() => declineRequest(request.id)}
                    className="h-9 px-3 rounded-lg bg-[#FCA5A5] border-2 border-black text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-1"
                  >
                    <X size={14} strokeWidth={3} /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {sentRequests.length > 0 && (
          <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
            <p className="text-black font-black text-xs uppercase tracking-widest mb-3">Sent Requests</p>
            <div className="space-y-2">
              {sentRequests.map((request) => (
                <div key={request.id} className="h-10 px-3 rounded-lg bg-[#F3F4F6] border-2 border-black flex items-center justify-between">
                  <span className="text-black font-black text-sm truncate">@{request.id}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Pending</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {status && (
          <div className="bg-[#FFD100] border-4 border-black rounded-xl p-3">
            <p className="text-black font-black text-[11px] uppercase tracking-widest break-words">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
