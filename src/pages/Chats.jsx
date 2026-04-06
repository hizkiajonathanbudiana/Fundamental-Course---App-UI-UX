import React, { useMemo, useState } from 'react';
import { Bot, MessageCircle, Search, UserPlus } from 'lucide-react';
import MascotRenderer from '../components/MascotRenderer';
import { useAppContext } from '../context/AppContext';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'ai', label: 'AI' },
  { id: 'friends', label: 'Friends' }
];

export default function Chats({ onNavigate, lang }) {
  const { chatThreads, openChatThread } = useAppContext();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const unreadCount = chatThreads.reduce((sum, thread) => sum + (thread.unread || 0), 0);

  const visibleThreads = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return chatThreads.filter((thread) => {
      if (activeFilter === 'unread' && thread.unread === 0) return false;
      if (activeFilter === 'ai' && thread.type !== 'ai') return false;
      if (activeFilter === 'friends' && thread.type !== 'friend') return false;

      if (!normalizedQuery) return true;

      return (
        thread.name.toLowerCase().includes(normalizedQuery) ||
        thread.preview.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [activeFilter, chatThreads, query]);

  const openThread = (thread) => {
    openChatThread(thread.id);

    if (thread.type === 'ai') {
      onNavigate('chatbot');
      return;
    }

    onNavigate('direct-chat', { threadId: thread.id });
  };

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col overflow-hidden">
      <div className="p-5 pt-8 bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 shadow-[0_4px_0_#000]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">Chats</h1>
          <button
            onClick={() => onNavigate('add-friend')}
            className="h-10 px-3 rounded-xl bg-[#FFD100] border-4 border-black text-black font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <UserPlus size={16} strokeWidth={3} /> Add Friend
          </button>
        </div>

        <div className="mt-4 h-12 bg-white border-4 border-black rounded-2xl px-3 flex items-center gap-2 shadow-[3px_3px_0_#000]">
          <Search size={18} className="text-[#6B7280]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chats"
            className="flex-1 h-full bg-transparent text-black font-bold outline-none"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            const withBadge = filter.id === 'unread';

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 h-9 rounded-full border-2 border-black text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${isActive ? 'bg-[#00FF87] text-black shadow-[2px_2px_0_#000]' : 'bg-white text-black/80'}`}
              >
                {filter.label}{withBadge ? ` ${unreadCount}` : ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-28 space-y-3">
        {visibleThreads.length === 0 && (
          <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0_#000]">
            <p className="text-black font-black text-sm">No chats found for your current filter.</p>
          </div>
        )}

        {visibleThreads.map((thread) => (
          <button
            key={thread.id}
            onClick={() => openThread(thread)}
            className="w-full text-left bg-white border-4 border-black rounded-2xl p-3 shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <div className="flex items-center gap-3">
              {thread.type === 'ai' ? (
                <div className="w-12 h-12 rounded-xl border-4 border-black overflow-hidden" style={{ backgroundColor: lang.primaryColor }}>
                  <MascotRenderer languageId={lang.id} mood="happy" animated={false} className="w-full h-full" />
                </div>
              ) : (
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${thread.name}`}
                  alt={thread.name}
                  className="w-12 h-12 rounded-xl border-4 border-black bg-[#E5E7EB]"
                />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-black font-black text-base truncate flex items-center gap-1">
                    {thread.name}
                    {thread.type === 'ai' && <Bot size={12} strokeWidth={3} className="text-[#6B7280]" />}
                  </p>
                  <span className="text-[11px] font-black text-[#4B5563]">{thread.time}</span>
                </div>
                <p className="text-[#6B7280] font-bold text-sm truncate mt-0.5">{thread.preview}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <MessageCircle size={14} className="text-[#6B7280]" />
                {thread.unread > 0 && (
                  <span className="min-w-6 h-6 px-1 rounded-full bg-[#00FF87] border-2 border-black text-black text-[11px] font-black flex items-center justify-center">
                    {thread.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
