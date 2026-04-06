import React, { useState, useEffect } from 'react';
import { 
  Camera, MessageCircle, Home as HomeIcon, ChevronLeft, Volume2, Mic, 
  ScanLine, Loader2, Play, Search, Image as ImageIcon, Bookmark, 
  Users, Plane, Coffee, X, Send, LayoutGrid, User, UserPlus, QrCode, 
  Settings, CheckSquare, BookA, Pencil, LayoutTemplate, MapPin, Ticket, 
  Headphones, Flame, Check, Delete, Undo2
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const navigateTo = (view, data = null) => {
    if (data?.topic) setSelectedTopic(data.topic);
    if (data?.game) setSelectedGame(data.game);
    setCurrentView(view);
  };

  const showBottomNav = ['home', 'topics', 'chatbot', 'profile'].includes(currentView);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a] font-sans selection:bg-green-500/30">
      {/* Phone Mockup Frame - Solid Dark */}
      <div className="w-full max-w-[400px] h-[800px] bg-[#111111] text-white overflow-hidden relative shadow-[0_0_0_10px_#2a2a2a] sm:rounded-[3rem]">
        
        {/* Router */}
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'search' && <PlecoSearchView onNavigate={navigateTo} />}
        {currentView === 'topics' && <TopicsView onNavigate={navigateTo} />}
        {currentView === 'subtopics' && <SubtopicsView onNavigate={navigateTo} topic={selectedTopic} />}
        {currentView === 'gameplay' && <GamePlayView onNavigate={navigateTo} game={selectedGame} />}
        {currentView === 'saved' && <SavedWordsView onNavigate={navigateTo} />}
        {currentView === 'camera' && <CameraView onNavigate={navigateTo} />}
        {currentView === 'loading' && <LoadingView onNavigate={navigateTo} />}
        {currentView === 'result' && <ResultView onNavigate={navigateTo} />}
        {currentView === 'chatbot' && <ChatbotView onNavigate={navigateTo} />}
        {currentView === 'profile' && <ProfileView onNavigate={navigateTo} />}
        
        {/* Gamified Chunky Bottom Nav */}
        {showBottomNav && (
          <div className="absolute bottom-0 w-full h-[85px] bg-[#1a1a1a] border-t-4 border-[#2a2a2a] flex justify-around items-center px-2 z-50 rounded-b-[3rem]">
            <NavButton icon={<HomeIcon size={28} strokeWidth={2.5}/>} isActive={currentView === 'home'} onClick={() => navigateTo('home')} />
            <NavButton icon={<LayoutGrid size={28} strokeWidth={2.5}/>} isActive={currentView === 'topics'} onClick={() => navigateTo('topics')} />
            
            {/* Chunky Camera FAB */}
            <div className="relative -top-6">
              <button 
                onClick={() => navigateTo('camera')}
                className="flex items-center justify-center w-[70px] h-[70px] bg-[#22c55e] rounded-full text-white border-b-[6px] border-[#16a34a] active:border-b-0 active:translate-y-[6px] transition-all"
              >
                <ScanLine size={32} strokeWidth={2.5} />
              </button>
            </div>
            
            <NavButton icon={<MessageCircle size={28} strokeWidth={2.5}/>} isActive={currentView === 'chatbot'} onClick={() => navigateTo('chatbot')} hasBadge />
            <NavButton icon={<User size={28} strokeWidth={2.5}/>} isActive={currentView === 'profile'} onClick={() => navigateTo('profile')} />
          </div>
        )}
      </div>
    </div>
  );
}

const NavButton = ({ icon, isActive, onClick, hasBadge }) => (
  <button 
    onClick={onClick} 
    className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all ${isActive ? 'bg-[#2a2a2a] text-[#22c55e]' : 'text-gray-500 hover:bg-[#222222]'}`}
  >
    {icon}
    {hasBadge && <span className="absolute top-3 right-3 bg-red-500 w-3 h-3 rounded-full border-2 border-[#1a1a1a]"></span>}
  </button>
);

// ==========================================
// 1. HOME VIEW 
// ==========================================
function HomeView({ onNavigate }) {
  return (
    <div className="h-full w-full p-6 overflow-y-auto pb-32 bg-[#111111]">
      <header className="mb-6 flex justify-between items-center mt-2">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#ffbe0b] rounded-[1.2rem] border-b-4 border-[#d49d00] p-1 flex items-center justify-center">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Avatar" className="w-full h-full bg-white rounded-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Hi, Liam!</h1>
            <p className="text-[#22c55e] font-bold text-sm">Let's learn today!</p>
          </div>
        </div>
        <button onClick={() => onNavigate('saved')} className="w-12 h-12 bg-[#2a2a2a] rounded-[1.2rem] border-b-4 border-[#1a1a1a] flex items-center justify-center text-white active:translate-y-1 active:border-b-0 transition-all">
          <Bookmark size={24} strokeWidth={2.5} />
        </button>
      </header>

      {/* Chunky Search Bar */}
      <div className="mb-8 cursor-text" onClick={() => onNavigate('search')}>
        <div className="w-full bg-[#1a1a1a] border-4 border-[#2a2a2a] rounded-[1.5rem] py-4 px-5 flex items-center gap-3 active:bg-[#222222] transition-colors">
          <Search size={24} className="text-[#22c55e]" strokeWidth={3} />
          <span className="text-gray-400 font-bold">Search Dictionary...</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-[#ffbe0b] border-b-[6px] border-[#d49d00] p-4 rounded-[1.5rem] flex flex-col items-center">
          <Flame size={32} className="text-[#d49d00] mb-1" strokeWidth={2.5} fill="currentColor" />
          <h3 className="text-3xl font-black text-black">14</h3>
          <p className="text-sm font-bold text-[#b38500] uppercase tracking-wide">Streak</p>
        </div>
        <div className="flex-1 bg-[#3a86ff] border-b-[6px] border-[#2063cc] p-4 rounded-[1.5rem] flex flex-col items-center">
          <BookA size={32} className="text-white mb-1" strokeWidth={2.5} />
          <h3 className="text-3xl font-black text-white">128</h3>
          <p className="text-sm font-bold text-[#a0c4ff] uppercase tracking-wide">Words</p>
        </div>
      </div>

      {/* AI Inbox */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-white">Your Chats</h2>
        </div>
        <div 
          onClick={() => onNavigate('chatbot')} 
          className="bg-[#1a1a1a] border-4 border-[#2a2a2a] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#222222] active:translate-y-1 active:border-b-0 border-b-[6px] transition-all"
        >
          <div className="w-16 h-16 bg-[#22c55e] rounded-2xl flex items-center justify-center border-b-4 border-[#16a34a] shadow-inner">
            <span className="text-white font-black text-2xl">AI</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Local Friend</h3>
              <span className="bg-[#ef4444] text-white text-xs font-black px-2 py-1 rounded-lg">NEW</span>
            </div>
            <p className="text-gray-400 font-medium font-serif text-sm mt-1">嗨！你這個週末有空嗎？</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. PLECO-STYLE SEARCH 
// ==========================================
function PlecoSearchView({ onNavigate }) {
  const [query, setQuery] = useState('');

  return (
    <div className="h-full w-full bg-[#111111] flex flex-col font-sans">
      <div className="flex items-center bg-[#1a1a1a] p-4 border-b-4 border-[#2a2a2a] pt-8 gap-3">
        <button onClick={() => onNavigate('home')} className="bg-[#2a2a2a] w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold active:bg-[#333] transition-colors">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <div className="flex-1 relative">
          <input 
            autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
            type="text" placeholder="Search" 
            className="w-full bg-[#2a2a2a] text-white font-bold text-lg rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-[#22c55e]/50 transition-all"
          />
        </div>
        <button onClick={() => setQuery('')} className="bg-[#3a86ff] text-white font-black w-12 h-12 rounded-xl border-b-4 border-[#2063cc] flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all">
          C
        </button>
      </div>

      <div className="flex bg-[#1a1a1a] text-white font-bold text-sm border-b-4 border-[#2a2a2a]">
        <button className="flex-1 py-4 border-r-2 border-[#2a2a2a] active:bg-[#222]">undo</button>
        <button className="flex-1 py-4 border-r-2 border-[#2a2a2a] active:bg-[#222]">radical</button>
        <button className="flex-1 py-4 border-r-2 border-[#2a2a2a] text-[#22c55e] border-b-4 border-b-[#22c55e]">handwriting</button>
      </div>

      <div className="flex-1 bg-[#111111] relative flex items-center justify-center">
        <div className="text-center text-gray-600 font-bold pointer-events-none select-none">
          <p>Draw character here</p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-4 flex justify-between items-center border-t-4 border-[#2a2a2a] pb-8 gap-4">
        <span className="text-6xl text-white font-serif tracking-widest pl-2">總</span>
        <div className="flex gap-3">
          <button className="bg-[#ff006e] text-white w-16 h-16 rounded-2xl flex items-center justify-center border-b-[6px] border-[#cc0058] active:border-b-0 active:translate-y-[6px] transition-all">
            <Delete size={32} />
          </button>
          <button onClick={() => onNavigate('home')} className="bg-[#22c55e] text-white px-8 h-16 rounded-2xl font-black text-xl border-b-[6px] border-[#16a34a] active:border-b-0 active:translate-y-[6px] transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. TOPICS VIEW (FunEasyLearn Vibe)
// ==========================================
function TopicsView({ onNavigate }) {
  const topics = [
    { name: "Making friends", icon: <Users size={40} className="text-[#3a86ff]"/> },
    { name: "Conversation", icon: <MessageCircle size={40} className="text-[#ff006e]"/> },
    { name: "Travel", icon: <Plane size={40} className="text-[#ffbe0b]"/> },
    { name: "Plane", icon: <Plane size={40} className="transform -rotate-45 text-[#3a86ff]"/> },
    { name: "On tour", icon: <MapPin size={40} className="text-[#ffbe0b]"/> },
    { name: "Signs", icon: <LayoutTemplate size={40} className="text-[#8338ec]"/> },
  ];

  return (
    <div className="h-full w-full bg-[#20A052] overflow-y-auto pb-32">
      <div className="p-4 pt-8 sticky top-0 z-20 bg-[#20A052] flex items-center justify-center gap-4 border-b-4 border-[#168a43]">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#20A052] font-black text-xl shadow-sm border-b-4 border-gray-300">
          <span className="leading-none mt-1">☰</span>
        </div>
        <div className="flex-1 bg-white/20 rounded-full py-3 px-4 flex items-center gap-2">
          <Search size={20} className="text-white" />
          <input type="text" placeholder="Search Phrase" className="bg-transparent w-full outline-none text-white font-bold placeholder:text-white/70" />
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#20A052] shadow-sm border-b-4 border-gray-300 relative">
          <span className="text-2xl mt-1">🌻</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#20A052]">3</span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-center text-white font-black text-lg mb-6 tracking-widest opacity-80 uppercase">Topic</h2>
        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          {topics.map((topic, i) => (
            <div key={i} onClick={() => onNavigate('subtopics', { topic: topic.name })} className="flex flex-col items-center gap-3 cursor-pointer group active:scale-95 transition-transform">
              <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center border-b-[6px] border-gray-300 shadow-md">
                {topic.icon}
              </div>
              <span className="text-sm text-center text-white font-bold leading-tight drop-shadow-md">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SUBTOPICS & GAMES
// ==========================================
function SubtopicsView({ onNavigate, topic }) {
  const subtopics = [
    { name: "Asking directions", icon: <span className="text-4xl">🗺️</span>, wrong: true },
    { name: "Review directions", icon: <span className="text-4xl">⏳</span>, wrong: false },
    { name: "Tickets", icon: <span className="text-4xl">🎫</span>, wrong: false },
  ];

  const games = [
    { name: "Vocabulary", icon: <BookA size={32} /> },
    { name: "Choose Phrase", icon: <CheckSquare size={32} /> },
    { name: "Listen & Choose", icon: <LayoutGrid size={32} /> },
    { name: "Match Phrases", icon: <LayoutTemplate size={32} /> },
    { name: "Translate & Listen", icon: <Headphones size={32} /> },
    { name: "Listen & Write", icon: <Pencil size={32} /> },
  ];

  return (
    <div className="h-full w-full bg-[#20A052] flex flex-col relative">
      <div className="p-4 pt-8 bg-[#20A052] flex items-center">
        <button onClick={() => onNavigate('topics')} className="w-12 h-12 bg-white text-[#20A052] rounded-full flex items-center justify-center border-b-4 border-gray-300 active:border-b-0 active:translate-y-1 transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="flex-1 text-center text-2xl font-black text-white mr-12">{topic || "Travel"}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="py-4 border-b-2 border-white/20">
          <h2 className="text-center text-white/80 text-sm font-black uppercase tracking-widest mb-4">SubTopic</h2>
          <div className="flex overflow-x-auto px-6 gap-6 pb-2 snap-x scrollbar-hide">
            {subtopics.map((sub, i) => (
              <div key={i} className="snap-start flex flex-col items-center gap-2 min-w-[90px] cursor-pointer">
                <div className="relative w-[85px] h-[85px] bg-[#2a2a2a] rounded-full flex items-center justify-center border-b-[6px] border-[#1a1a1a] shadow-lg active:border-b-0 active:translate-y-1 transition-all">
                  {sub.icon}
                  {sub.wrong && (
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm font-bold">
                      <X size={16} strokeWidth={4} />
                    </div>
                  )}
                </div>
                <span className="text-xs text-center font-bold text-white mt-1">{sub.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6">
          <h2 className="text-center text-white/80 text-sm font-black uppercase tracking-widest mb-6">Game</h2>
          <div className="grid grid-cols-3 gap-y-8 gap-x-2 px-4">
            {games.map((game, i) => (
              <div key={i} onClick={() => onNavigate('gameplay', { game: game.name })} className="flex flex-col items-center gap-3 cursor-pointer active:scale-95 transition-transform">
                <div className="w-[85px] h-[85px] bg-white rounded-3xl flex items-center justify-center text-[#20A052] border-b-[6px] border-gray-300 shadow-md">
                  {game.icon}
                </div>
                <span className="text-xs text-center text-white font-bold leading-tight px-1 drop-shadow-md">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
        <button 
          onClick={() => onNavigate('gameplay', { game: 'Quick Play' })}
          className="w-24 h-24 bg-[#ff4757] rounded-full flex items-center justify-center text-white border-b-[8px] border-[#c0392b] shadow-xl active:translate-y-[8px] active:border-b-0 transition-all"
        >
          <Play size={48} fill="currentColor" className="ml-2" />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. GAMEPLAY SIMULATION 
// ==========================================
function GamePlayView({ onNavigate, game }) {
  return (
    <div className="h-full w-full bg-[#111111] flex flex-col">
      <div className="p-4 pt-8 bg-[#111111] flex items-center gap-4">
        <button onClick={() => onNavigate('subtopics')} className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-white border-b-4 border-[#1a1a1a] active:border-b-0 active:translate-y-1 transition-all">
          <X size={24} strokeWidth={3} />
        </button>
        <div className="flex-1 h-4 bg-[#2a2a2a] rounded-full border-[3px] border-[#1a1a1a] overflow-hidden">
          <div className="w-1/3 h-full bg-[#22c55e] rounded-full"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-[#3a86ff] border-b-[8px] border-[#2063cc] rounded-3xl flex items-center justify-center text-white mb-8">
          <CheckSquare size={64} strokeWidth={2.5} />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">{game || "Practice"}</h2>
        <p className="text-gray-400 font-bold mb-10">Match the correct translation below.</p>
        
        <div className="w-full bg-[#2a2a2a] border-[4px] border-[#3a3a3a] rounded-[2rem] p-10 mb-10">
          <p className="text-7xl font-serif text-white mb-6">車站</p>
          <button className="mx-auto w-16 h-16 rounded-full bg-[#3a86ff] border-b-[6px] border-[#2063cc] text-white flex items-center justify-center active:border-b-0 active:translate-y-[6px] transition-all">
            <Volume2 size={32} />
          </button>
        </div>

        <button className="w-full bg-[#22c55e] text-white font-black text-xl py-5 rounded-2xl border-b-[6px] border-[#16a34a] active:border-b-0 active:translate-y-[6px] transition-all">
          Continue
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. CHATBOT ROLEPLAY 
// ==========================================
function ChatbotView({ onNavigate }) {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const breakdownData = {
    aiMsg: [
      { hanzi: "嗨", pinyin: "Hāi", meaning: "Hi" },
      { hanzi: "你", pinyin: "nǐ", meaning: "You" },
      { hanzi: "週末", pinyin: "zhōumò", meaning: "Weekend", isSaved: true },
      { hanzi: "有空", pinyin: "yǒukòng", meaning: "Have free time" },
    ],
    userMsg: [
      { hanzi: "有啊", pinyin: "Yǒu a", meaning: "Yes, I have" },
      { hanzi: "哪裡", pinyin: "nǎlǐ", meaning: "Where" },
    ]
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#f0f0f0] relative">
      <div className="p-4 pt-8 border-b-4 border-gray-200 flex items-center bg-white z-20">
        <button onClick={() => onNavigate('home')} className="p-2 text-gray-500 hover:text-black transition-colors">
          <ChevronLeft size={32} strokeWidth={3} />
        </button>
        <div className="w-14 h-14 bg-[#3a86ff] rounded-[1.2rem] border-b-4 border-[#2063cc] flex items-center justify-center text-white font-black text-xl ml-2 shadow-sm">
          AI
        </div>
        <div className="ml-4">
          <h3 className="text-black font-black text-lg leading-tight">Local Friend</h3>
          <span className="text-[#22c55e] text-sm font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-[#22c55e] rounded-full"></span> Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
        <div className="text-center">
          <span className="bg-gray-200 text-gray-500 font-bold text-xs px-4 py-2 rounded-full uppercase tracking-widest border-2 border-gray-300">
            Topic: Making Friends
          </span>
        </div>
        
        <div className="flex justify-start">
          <div onClick={() => setSelectedMessage('aiMsg')} className="bg-white border-4 border-gray-200 text-black p-5 rounded-[2rem] rounded-tl-none max-w-[85%] cursor-pointer active:scale-95 transition-transform shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
            <p className="font-serif text-2xl font-bold mb-2">嗨！你這個週末有空嗎？</p>
            <p className="text-[#3a86ff] text-sm font-bold flex items-center gap-1">Tap to reveal meaning</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div onClick={() => setSelectedMessage('userMsg')} className="bg-[#22c55e] border-4 border-[#16a34a] text-white p-5 rounded-[2rem] rounded-tr-none max-w-[85%] cursor-pointer active:scale-95 transition-transform shadow-[4px_4px_0_rgba(22,163,74,0.3)]">
             <p className="font-serif text-2xl font-bold mb-2">有啊，我們去哪裡？</p>
             <p className="text-white/80 text-sm font-bold">Tap to analyze</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t-4 border-gray-200 p-4 pb-8 flex gap-3 items-center z-10">
        <button className="w-14 h-14 rounded-2xl bg-gray-100 border-b-4 border-gray-200 text-gray-500 flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all">
          <Mic size={28} />
        </button>
        <input type="text" placeholder="Type a reply..." className="flex-1 h-14 bg-gray-100 border-4 border-gray-200 rounded-2xl px-4 text-black font-bold focus:outline-none focus:border-[#3a86ff]" />
        <button className="w-14 h-14 rounded-2xl bg-[#3a86ff] border-b-4 border-[#2063cc] text-white flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all">
          <Send size={24} />
        </button>
      </div>

      {selectedMessage && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedMessage(null)}></div>
          
          <div className="bg-[#111111] border-t-8 border-[#2a2a2a] rounded-t-[2.5rem] p-6 pt-6 relative z-10 animate-[slideUp_0.2s_ease-out]">
            <button onClick={() => setSelectedMessage(null)} className="absolute top-6 right-6 w-10 h-10 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-white font-bold active:bg-[#333] transition-colors">
              <X size={24} strokeWidth={3} />
            </button>
            
            <div className="flex justify-between items-start mb-8 pr-14">
              <div>
                <h3 className="text-white font-black text-2xl mb-2 leading-tight">
                  {selectedMessage === 'aiMsg' ? "Hi! Do you have free time this weekend?" : "Yes, where are we going?"}
                </h3>
                <p className="text-[#3a86ff] text-base font-bold">
                  {selectedMessage === 'aiMsg' ? "Hāi! Nǐ zhège zhōumò yǒukòng ma?" : "Yǒu a, wǒmen qù nǎlǐ?"}
                </p>
              </div>
              <button className="flex-shrink-0 w-16 h-16 bg-[#ffbe0b] border-b-[6px] border-[#d49d00] text-black rounded-2xl flex items-center justify-center active:border-b-0 active:translate-y-[6px] transition-all">
                <Volume2 size={32} strokeWidth={2.5} />
              </button>
            </div>

            <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Word Breakdown</h4>
            
            <div className="max-h-52 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-hide">
              {breakdownData[selectedMessage].map((word, i) => (
                <div key={i} className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-2xl border-4 border-[#2a2a2a]">
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-3xl text-white font-serif font-bold">{word.hanzi}</span>
                    <div>
                      <span className="text-[#3a86ff] text-base font-black block mb-1">{word.pinyin}</span>
                      <p className="text-gray-300 font-bold text-sm">{word.meaning}</p>
                    </div>
                  </div>
                  <button className={`${word.isSaved ? 'bg-[#22c55e] border-[#16a34a] text-white' : 'bg-[#2a2a2a] border-[#3a3a3a] text-gray-400'} border-b-4 p-3 rounded-xl active:translate-y-1 active:border-b-0 transition-all`}>
                    <Bookmark size={24} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full bg-[#22c55e] border-b-[6px] border-[#16a34a] text-white font-black text-xl py-5 rounded-[1.5rem] flex items-center justify-center gap-3 active:border-b-0 active:translate-y-[6px] transition-all">
              <Mic size={28} />
              Practice Speaking
            </button>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}} />
    </div>
  );
}

// ==========================================
// 7. CAMERA, LOADING, RESULT, SAVED & PROFILE 
// ==========================================
function CameraView({ onNavigate }) {
  return (
    <div className="h-full w-full bg-[#111111] relative flex flex-col">
      <div className="absolute top-0 w-full p-6 pt-8 flex justify-between items-center z-10">
        <button onClick={() => onNavigate('home')} className="bg-[#2a2a2a] w-14 h-14 border-b-4 border-[#1a1a1a] rounded-2xl text-white flex items-center justify-center active:border-b-0 active:translate-y-1 transition-all"><ChevronLeft size={32} strokeWidth={3} /></button>
        <div className="bg-[#2a2a2a] border-4 border-[#3a3a3a] px-6 py-3 rounded-2xl text-base font-black text-white tracking-widest">FOCUS TEXT</div>
        <div className="w-14"></div>
      </div>
      <div className="flex-1 bg-neutral-900 flex items-center justify-center relative">
        <div className="w-[85%] h-[55%] border-8 border-[#22c55e] rounded-[3rem] relative bg-black/50">
          <div className="absolute inset-0 flex items-center justify-center"><ScanLine size={64} className="text-[#22c55e]" strokeWidth={2.5} /></div>
        </div>
      </div>
      <div className="h-44 bg-[#111111] border-t-8 border-[#2a2a2a] flex items-center justify-around pb-8 px-6 rounded-t-[3rem] relative -mt-8 z-10">
        <button className="w-16 h-16 bg-[#2a2a2a] border-b-4 border-[#1a1a1a] rounded-2xl flex items-center justify-center text-white active:translate-y-1 active:border-b-0 transition-all"><ImageIcon size={32} /></button>
        <button onClick={() => onNavigate('loading')} className="w-24 h-24 rounded-full border-b-[8px] border-[#16a34a] bg-[#22c55e] flex items-center justify-center active:translate-y-[8px] active:border-b-0 transition-all">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </button>
        <div className="w-16 h-16"></div>
      </div>
    </div>
  );
}

function LoadingView({ onNavigate }) {
  useEffect(() => {
    const timer = setTimeout(() => onNavigate('result'), 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="h-full w-full p-6 flex flex-col justify-center items-center bg-[#22c55e]">
      <Loader2 className="animate-spin text-white mb-6" size={80} strokeWidth={3} />
      <h2 className="text-2xl font-black text-white tracking-widest uppercase">Scanning...</h2>
    </div>
  );
}

function ResultView({ onNavigate }) {
  return (
    <div className="h-full w-full flex flex-col bg-[#111111]">
      <div className="p-4 pt-8 flex justify-between items-center bg-[#1a1a1a] border-b-4 border-[#2a2a2a]">
        <button onClick={() => onNavigate('home')} className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-white border-b-4 border-[#1a1a1a] active:translate-y-1 active:border-b-0 transition-all"><ChevronLeft size={28} strokeWidth={3} /></button>
        <span className="text-lg font-black text-white tracking-widest uppercase">Result</span>
        <button className="text-[#3a86ff] text-base font-black flex items-center gap-1 bg-[#2a2a2a] py-2 px-3 rounded-xl">Save</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="bg-[#1a1a1a] border-[4px] border-[#2a2a2a] rounded-[2rem] p-8 mb-8 mt-4">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-5xl font-black text-white leading-tight font-serif">我要一杯<br/>珍珠奶茶</h2>
            <button className="w-16 h-16 rounded-[1.2rem] bg-[#ffbe0b] border-b-[6px] border-[#d49d00] text-black flex items-center justify-center active:border-b-0 active:translate-y-[6px] transition-all"><Volume2 size={32} strokeWidth={2.5}/></button>
          </div>
          <p className="text-[#3a86ff] text-2xl font-black mb-2">Wǒ yào yī bēi zhēnzhū nǎichá</p>
          <p className="text-gray-300 text-lg font-bold">I would like a cup of boba milk tea.</p>
        </div>
      </div>
    </div>
  );
}

function SavedWordsView({ onNavigate }) {
  return (
    <div className="h-full w-full flex flex-col bg-[#111111]">
       <div className="p-4 pt-8 flex items-center bg-[#1a1a1a] border-b-4 border-[#2a2a2a] sticky top-0 z-20">
        <button onClick={() => onNavigate('home')} className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-white border-b-4 border-[#1a1a1a] active:translate-y-1 active:border-b-0 mr-4 transition-all"><ChevronLeft size={28} strokeWidth={3} /></button>
        <h1 className="text-xl font-black text-white uppercase tracking-wider">Word Vault</h1>
      </div>
      <div className="flex-1 p-6 space-y-4">
         <div className="bg-[#1a1a1a] border-4 border-[#2a2a2a] p-5 rounded-[1.5rem] flex justify-between items-center">
            <div>
              <div className="flex items-end gap-3 mb-1"><span className="text-4xl font-black font-serif text-white">載具</span><span className="text-[#3a86ff] text-base font-bold pb-1">zàijù</span></div>
              <p className="text-gray-300 font-bold text-sm mt-1">Digital Receipt</p>
            </div>
            <button className="w-14 h-14 rounded-2xl bg-[#22c55e] border-b-4 border-[#16a34a] text-white flex items-center justify-center active:translate-y-1 active:border-b-0 transition-all"><Bookmark size={28} strokeWidth={2.5} /></button>
          </div>
      </div>
    </div>
  );
}

function ProfileView({ onNavigate }) {
  return (
    <div className="h-full w-full bg-[#111111] overflow-y-auto pb-32">
      <div className="bg-[#1a1a1a] p-6 pt-12 border-b-4 border-[#2a2a2a] flex flex-col items-center">
        <div className="w-32 h-32 bg-[#ffbe0b] border-b-8 border-[#d49d00] rounded-[2rem] p-2 mb-6">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Profile" className="w-full h-full bg-white rounded-[1.2rem]" />
        </div>
        <h2 className="text-3xl font-black text-white">Liam Anderson</h2>
        <p className="text-[#3a86ff] text-base font-bold mt-1 bg-[#2a2a2a] px-4 py-1 rounded-lg">ID: HB-948271</p>
      </div>
      <div className="p-6">
         <div className="bg-[#1a1a1a] border-4 border-[#2a2a2a] p-8 rounded-[2rem] text-center flex flex-col items-center">
           <h3 className="text-white font-black text-xl mb-6 uppercase tracking-widest">Add Friend</h3>
           <div className="w-40 h-40 bg-white border-b-8 border-gray-300 rounded-[1.5rem] flex items-center justify-center mb-6"><QrCode className="text-black" size={100} /></div>
           <button className="w-full bg-[#2a2a2a] border-b-4 border-[#1a1a1a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 active:translate-y-1 active:border-b-0 transition-all">
              Share My Code
           </button>
         </div>
      </div>
    </div>
  );
}