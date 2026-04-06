import React, { useMemo } from 'react';
import { Search, Flame, BellRing, ScanLine, Settings as SettingsIcon } from 'lucide-react';
import MascotRenderer from '../components/MascotRenderer';
import RadarCard from '../components/RadarCard';
import { useAppContext } from '../context/AppContext';

export default function DynamicHome({ onNavigate, lang }) {
  const { uiStrings, nativeLang, chatThreads, openChatThread } = useAppContext();
  
  // Data mockup user di sekitar dengan bahasa yang beda-beda
  const nearbyLearners = [
    { id: 1, name: "Maria", learningLangId: "es", nativeLangId: "es", x: "10%", y: "15%", delay: "0s", distanceKm: 0.2 },
    { id: 2, name: "Kenji", learningLangId: "zh_tw", nativeLangId: "ja", x: "75%", y: "10%", delay: "0.5s", distanceKm: 1.2 },
    { id: 3, name: "David", learningLangId: "en", nativeLangId: "zh_tw", x: "65%", y: "70%", delay: "1s", distanceKm: 2.5 },
  ];

  const inboxAlerts = useMemo(() => {
    const prioritized = [...chatThreads].sort((a, b) => {
      const aHasUnread = a.unread > 0 ? 1 : 0;
      const bHasUnread = b.unread > 0 ? 1 : 0;
      return bHasUnread - aHasUnread;
    });

    return prioritized.slice(0, 2);
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
      
      {/* 1. Header: Avatar + Language Switcher & Streak */}
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
          <button className="bg-[#2A2A3B] border-4 border-black px-3 py-1.5 rounded-xl shadow-[4px_4px_0_#000] flex items-center gap-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <Flame size={20} className="text-[#FF5C00]" fill="#FF5C00" />
            <span className="text-white font-black text-sm">14</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION: LIVE RADAR MAP */}
      <RadarCard
        learningLang={lang}
        nativeLang={nativeLang}
        nearbyLearners={nearbyLearners}
        radarLabel={uiStrings.radar}
        subtitle={`${nearbyLearners.length} Friends Nearby`}
        onClick={() => onNavigate('map')}
      />

      {/* 3. SURVIVAL TOOLS: Tombol raksasa SCAN & DICTIONARY */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => onNavigate('camera')} 
          className="flex-1 border-4 border-black shadow-[6px_6px_0_#000] rounded-[1.5rem] p-4 flex flex-col items-center justify-center gap-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          style={{ backgroundColor: lang.primaryColor }}
        >
          <ScanLine size={36} strokeWidth={3} className="text-black" />
          <span className="font-black text-black uppercase tracking-widest text-sm">{uiStrings.scan}</span>
        </button>

        <button 
          onClick={() => onNavigate('search')} 
          className="flex-1 bg-white border-4 border-black shadow-[6px_6px_0_#000] rounded-[1.5rem] p-4 flex flex-col items-center justify-center gap-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
        >
          <Search size={36} strokeWidth={3} className="text-black" />
          <span className="font-black text-black uppercase tracking-widest text-sm">{uiStrings.dict}</span>
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

