import React, { useMemo } from 'react';
import { BellRing, MessageCircle, Settings as SettingsIcon, Bookmark, Languages, ArrowRight } from 'lucide-react';
import MascotRenderer from '../components/MascotRenderer';
import RadarCard from '../components/RadarCard';
import { useAppContext } from '../context/AppContext';
import { buildRadarLearners } from '../constants/radarData';

export default function DynamicHome({ onNavigate, lang }) {
  const { uiStrings, nativeLang, chatThreads, openChatThread } = useAppContext();

  const nearbyLearners = useMemo(() => buildRadarLearners(lang.id), [lang.id]);

  const inboxAlerts = useMemo(() => {
    // Filter to get all unread messages
    const unreadThreads = chatThreads.filter(t => t.unread > 0);
    // If there are no unread messages, maybe show the latest one just to have something
    return unreadThreads.length > 0 ? unreadThreads : chatThreads.slice(0, 1);
  }, [chatThreads]);

  const openAlertThread = (thread) => {
    openChatThread(thread.id);

    if (thread.type === 'ai') {
      onNavigate('chatbot');
      return;
    }

    onNavigate('direct-chat', { threadId: thread.id });
  };

  return (
    <div className="h-full w-full p-5 overflow-y-auto pb-32 bg-[#1E1E2A]">

      {/* 1. Header: Avatar + Language Switcher & Favorites */}
      <header className="mb-6 mt-4 flex justify-between items-center gap-4">
        <button onClick={() => onNavigate('profile')} className="flex items-center gap-3 active:scale-95 transition-transform text-left">
          <div className="w-12 h-12 flex-none rounded-xl border-4 border-black p-0.5 overflow-hidden shadow-[4px_4px_0_#000]" style={{ backgroundColor: lang.secondaryColor }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Avatar" className="w-full h-full object-cover bg-white" />
          </div>
          <div className="hidden sm:block min-w-0">
            <h1 className="text-xl font-black text-white truncate">Liam A.</h1>
            <p className="font-black text-[10px] uppercase tracking-widest" style={{ color: lang.primaryColor }}>{lang.name}</p>
          </div>
        </button>

        <div className="flex items-center gap-3 flex-none">
          <button onClick={() => onNavigate('settings')} className="bg-white hover:bg-[#F3F3F3] border-4 border-black px-3 py-1.5 rounded-xl shadow-[4px_4px_0_#000] flex items-center gap-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" title={uiStrings.settings}>
            <SettingsIcon size={20} className="text-black" />
          </button>
          <button
            onClick={() => onNavigate('saved')}
            className="bg-[#2A2A3B] border-4 border-black w-11 h-11 rounded-xl shadow-[4px_4px_0_#000] flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            title="Favorites"
          >
            <Bookmark size={18} className="text-[#FFD100]" fill="#FFD100" />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION: LIVE RADAR MAP */}
      <RadarCard
        learningLang={lang}
        nativeLang={nativeLang}
        nearbyLearners={nearbyLearners}
        radarLabel={uiStrings.radar}
        subtitle={`5 Learners Nearby`}
        initialRangeKm="auto"
        enableMarkerPopup={false}
        radarHeightClass="h-56"
        onClick={() => onNavigate('map')}
      />

      {/* 3. SURVIVAL TOOLS: LATEST TRANSLATION CTA */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        <button
          onClick={() => onNavigate('hub')}
          className="w-full bg-[#00E5FF] border-4 border-black rounded-2xl px-4 py-4 text-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center">
                <Languages size={20} strokeWidth={2.8} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-black/70">Multi‑Modal</p>
                <p className="text-base font-black leading-tight">Translate Hub</p>
              </div>
            </div>
            <ArrowRight size={20} strokeWidth={3} />
          </div>
        </button>
      </div>

      {/* 4. INBOX & ALERTS (Notifikasi Campuran AI & Orang Beneran) */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BellRing size={20} className="text-[#FFD100]" /> {uiStrings.alerts}
          </h2>
        </div>

        <div className="space-y-4">
          {inboxAlerts.map((thread) => (
            <div
              key={thread.id}
              onClick={() => openAlertThread(thread)}
              className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              {thread.type === 'ai' ? (
                <div className="w-14 h-14 flex-none rounded-2xl flex items-center justify-center border-4 border-black" style={{ backgroundColor: lang.secondaryColor }}>
                  <MascotRenderer languageId={lang.id} mood="happy" className="w-10 h-10" animated={false} />
                </div>
              ) : (
                <div className="w-14 h-14 flex-none bg-white rounded-2xl flex items-center justify-center border-4 border-black overflow-hidden p-0.5">
                  <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${thread.name}`} alt={thread.name} className="w-full h-full object-cover rounded-xl bg-[#00FF87]" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 gap-2">
                  <h3 className="text-white font-black text-base truncate flex items-center gap-1">
                    {thread.name}
                    {thread.type === 'ai' && <span className="bg-black text-white text-[8px] px-1 rounded uppercase border border-white">AI</span>}
                  </h3>
                  {thread.unread > 0 && (
                    <span className="bg-[#FF426A] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-black uppercase">Unread {thread.unread}</span>
                  )}
                </div>
                <p className="text-[#A1A1AA] font-bold text-xs truncate">{thread.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

