import React, { useState, useEffect } from 'react';
import { 
  Camera, MessageCircle, Home as HomeIcon, ChevronLeft, Volume2, Mic, 
  ScanLine, Loader2, Play, Search, Bookmark, 
  Users, Plane, Coffee, X, Send, LayoutGrid, User, QrCode, 
  CheckSquare, BookA, Pencil, LayoutTemplate, MapPin, Ticket, 
  Headphones, Undo2, ChevronRight, Flame
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
    <div className="flex justify-center items-center h-[100dvh] sm:p-6 bg-[#0B0A10] font-sans selection:bg-[#00FF87]/30 overflow-hidden">
      
      {/* CSS Animations - No Glass, Only Solid Fun Motions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bop {
          animation: bop 2s ease-in-out infinite;
        }
        @keyframes bop-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        .animate-bop-fast {
          animation: bop-fast 1s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Main App Container - Comic Neo-Brutalism */}
      <div className="w-full max-w-[400px] h-full sm:max-h-[800px] bg-[#1E1E2A] text-white overflow-hidden relative sm:shadow-[12px_12px_0px_#000] sm:border-4 border-black sm:rounded-[3rem]">
        
        {/* Router */}
        {currentView === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentView === 'search' && <SearchView onNavigate={navigateTo} />}
        {currentView === 'topics' && <TopicsView onNavigate={navigateTo} />}
        {currentView === 'subtopics' && <SubtopicsView onNavigate={navigateTo} topic={selectedTopic} />}
        {currentView === 'gameplay' && <GamePlayView onNavigate={navigateTo} game={selectedGame} />}
        {currentView === 'saved' && <SavedWordsView onNavigate={navigateTo} />}
        {currentView === 'camera' && <CameraView onNavigate={navigateTo} />}
        {currentView === 'loading' && <LoadingView onNavigate={navigateTo} />}
        {currentView === 'result' && <ResultView onNavigate={navigateTo} />}
        {currentView === 'chatbot' && <ChatbotView onNavigate={navigateTo} />}
        {currentView === 'profile' && <ProfileView onNavigate={navigateTo} />}
        
        {/* Chunky Bottom Nav - Hard Borders */}
        {showBottomNav && (
          <div className="absolute bottom-0 w-full h-[85px] bg-[#1E1E2A] border-t-4 border-black flex justify-around items-center px-4 z-50 sm:rounded-b-[3rem]">
            <NavButton icon={<HomeIcon size={26} strokeWidth={3}/>} label="Home" isActive={currentView === 'home'} onClick={() => navigateTo('home')} activeColor="text-[#00E5FF]" />
            <NavButton icon={<LayoutGrid size={26} strokeWidth={3}/>} label="Learn" isActive={currentView === 'topics'} onClick={() => navigateTo('topics')} activeColor="text-[#A25BFF]" />
            
            {/* Playful Camera FAB - Solid Shadow */}
            <div className="relative -top-6">
              <button 
                onClick={() => navigateTo('camera')}
                className="flex items-center justify-center w-[70px] h-[70px] flex-none bg-[#00FF87] rounded-2xl text-black border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                <ScanLine size={32} strokeWidth={3} />
              </button>
            </div>
            
            <NavButton icon={<MessageCircle size={26} strokeWidth={3}/>} label="Chats" isActive={currentView === 'chatbot'} onClick={() => navigateTo('chatbot')} hasBadge activeColor="text-[#FFD100]" />
            <NavButton icon={<User size={26} strokeWidth={3}/>} label="Profile" isActive={currentView === 'profile'} onClick={() => navigateTo('profile')} activeColor="text-[#FF426A]" />
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MASCOT COMPONENT: Momo the Formosan Black Bear
// ----------------------------------------------------
const MomoMascot = ({ className = "w-24 h-24", mood = "happy", animated = true }) => {
  const floatClass = animated ? (mood === 'excited' ? "animate-bop-fast" : "animate-bop") : "";
  return (
    <div className={`relative ${floatClass} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
        {/* Ears */}
        <circle cx="20" cy="30" r="14" fill="#000000" />
        <circle cx="20" cy="30" r="7" fill="#4B4B5A" />
        <circle cx="80" cy="30" r="14" fill="#000000" />
        <circle cx="80" cy="30" r="7" fill="#4B4B5A" />
        
        {/* Head/Body Base */}
        <rect x="15" y="20" width="70" height="75" rx="35" fill="#2A2A3B" stroke="#000000" strokeWidth="4" />
        
        {/* Formosan Bear Signature White 'V' */}
        <path d="M30 80 Q50 100 70 80" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
        
        {/* Snout Area */}
        <ellipse cx="50" cy="60" rx="20" ry="15" fill="#E4E4E7" stroke="#000000" strokeWidth="3" />
        {/* Nose */}
        <ellipse cx="50" cy="53" rx="6" ry="4" fill="#000000" />
        
        {/* Mouth Based on Mood */}
        {mood === 'happy' || mood === 'excited' ? (
          <path d="M43 62 Q50 68 57 62" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
        ) : mood === 'focused' ? (
          <path d="M46 62 L54 62" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <path d="M45 64 Q50 60 55 64" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="none" />
        )}

        {/* Eyes Based on Mood */}
        {mood === "happy" ? (
           <>
             <path d="M32 45 Q36 41 40 45" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
             <path d="M60 45 Q64 41 68 45" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" />
           </>
        ) : mood === "excited" ? (
           <>
             <path d="M32 45 L36 40 L40 45" stroke="#00FF87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
             <path d="M60 45 L64 40 L68 45" stroke="#00FF87" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
           </>
        ) : (
           <>
             <circle cx="36" cy="45" r="4.5" fill="#FFFFFF" />
             <circle cx="64" cy="45" r="4.5" fill="#FFFFFF" />
           </>
        )}
      </svg>
    </div>
  );
};

const NavButton = ({ icon, label, isActive, onClick, hasBadge, activeColor }) => (
  <button 
    onClick={onClick} 
    className={`relative flex flex-col items-center justify-center w-16 h-16 flex-none rounded-2xl transition-all ${isActive ? activeColor : 'text-[#7A7A9A] hover:text-white'}`}
  >
    <div className={isActive ? "translate-y-[-2px] transition-transform" : ""}>{icon}</div>
    {hasBadge && <span className="absolute top-2 right-3 bg-[#FF426A] w-3 h-3 rounded-full border-2 border-black"></span>}
  </button>
);

// ==========================================
// 1. HOME VIEW (Comic Neo-Brutalism)
// ==========================================
function HomeView({ onNavigate }) {
  return (
    <div className="h-full w-full p-5 overflow-y-auto pb-32 bg-[#1E1E2A]">
      
      {/* Top Header */}
      <header className="mb-6 mt-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 flex-none bg-[#FFD100] rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] p-0.5 flex items-center justify-center overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Avatar" className="w-full h-full object-cover rounded-xl bg-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Hi, Liam!</h1>
            <p className="text-[#00FF87] font-bold text-sm uppercase tracking-widest">Ready to learn?</p>
          </div>
        </div>
        <button onClick={() => onNavigate('saved')} className="w-12 h-12 flex-none bg-[#2A2A3B] rounded-2xl border-4 border-black flex items-center justify-center text-[#00E5FF] shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <Bookmark size={24} strokeWidth={3} />
        </button>
      </header>

      {/* Mascot Speech Bubble Card */}
      <div className="mb-8 w-full bg-[#2A2A3B] border-4 border-black shadow-[6px_6px_0_#000] rounded-[2rem] p-5 flex items-center gap-4 relative">
        <MomoMascot className="w-20 h-20 flex-none -mt-4" mood="happy" />
        <div className="flex-1 bg-white border-4 border-black rounded-2xl p-3 relative shadow-[4px_4px_0_#000]">
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-4 h-4 bg-white border-l-4 border-b-4 border-black rotate-45"></div>
          <p className="text-black font-black text-sm relative z-10 uppercase tracking-wide">Your daily quest: Order a Boba Tea! 🧋</p>
        </div>
      </div>

      {/* Gamified Search Bar */}
      <div className="mb-8 cursor-text" onClick={() => onNavigate('search')}>
        <div className="w-full bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] py-4 px-5 flex items-center gap-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <Search size={24} className="text-[#00FF87] flex-none" strokeWidth={3} />
          <span className="text-[#A1A1AA] font-bold text-lg">Search a word...</span>
        </div>
      </div>

      {/* Chunky Stats Cards */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-[#FFD100] border-4 border-black shadow-[4px_4px_0_#000] p-4 rounded-[1.5rem] flex flex-col items-center">
          <Flame size={32} className="text-black mb-1" strokeWidth={3} fill="currentColor" />
          <h3 className="text-4xl font-black text-black">14</h3>
          <p className="text-xs font-black text-black uppercase tracking-widest mt-1">Day Streak</p>
        </div>
        <div className="flex-1 bg-[#A25BFF] border-4 border-black shadow-[4px_4px_0_#000] p-4 rounded-[1.5rem] flex flex-col items-center">
          <BookA size={32} className="text-white mb-1" strokeWidth={3} />
          <h3 className="text-4xl font-black text-white">128</h3>
          <p className="text-xs font-black text-white uppercase tracking-widest mt-1">Words</p>
        </div>
      </div>

      {/* Active Chats Area */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Roleplay Chats</h2>
        </div>
        <div 
          onClick={() => onNavigate('chatbot')} 
          className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
        >
          <div className="w-16 h-16 flex-none bg-[#00E5FF] rounded-2xl flex items-center justify-center border-4 border-black">
            <MomoMascot className="w-12 h-12" mood="happy" animated={false} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-white font-black text-lg truncate">Momo (AI)</h3>
              <span className="bg-[#FF426A] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-black uppercase">New</span>
            </div>
            <p className="text-[#A1A1AA] font-bold text-sm truncate">嗨！你這個週末有空嗎？</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. SEARCH VIEW
// ==========================================
function SearchView({ onNavigate }) {
  const [query, setQuery] = useState('');

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col font-sans">
      <div className="flex items-center bg-[#2A2A3B] p-4 border-b-4 border-black pt-8 gap-3">
        <button onClick={() => onNavigate('home')} className="bg-[#1E1E2A] w-12 h-12 flex-none rounded-2xl flex items-center justify-center text-white font-bold border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <div className="flex-1 relative min-w-0">
          <input 
            autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
            type="text" placeholder="Draw or search..." 
            className="w-full bg-[#1E1E2A] text-white font-black text-base rounded-2xl py-3 px-4 focus:outline-none border-4 border-black focus:border-[#00E5FF] shadow-inner transition-colors"
          />
        </div>
        <button onClick={() => setQuery('')} className="bg-[#FF426A] flex-none text-white font-black w-12 h-12 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <X size={24} strokeWidth={4} />
        </button>
      </div>

      <div className="flex bg-[#2A2A3B] text-white font-black text-xs uppercase tracking-widest border-b-4 border-black">
        <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] transition-colors">History</button>
        <button className="flex-1 py-4 border-r-4 border-black hover:bg-[#323246] transition-colors">Radical</button>
        <button className="flex-1 py-4 text-black bg-[#00E5FF] border-b-4 border-black">Canvas</button>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-[#1E1E2A]">
        <div className="text-center text-[#7A7A9A] font-black uppercase tracking-widest px-6 border-4 border-dashed border-[#7A7A9A] p-10 rounded-[3rem]">
          Draw Character
        </div>
      </div>

      <div className="bg-[#2A2A3B] p-5 flex justify-between items-center border-t-4 border-black pb-8 gap-4">
        <span className="text-6xl text-white font-serif pl-2">總</span>
        <div className="flex gap-3">
          <button className="bg-[#1E1E2A] text-white w-14 h-14 flex-none rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
            <Undo2 size={24} strokeWidth={3} />
          </button>
          <button onClick={() => onNavigate('home')} className="bg-[#00FF87] text-black px-8 h-14 rounded-2xl font-black text-lg border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. TOPICS VIEW (Path / Grid)
// ==========================================
function TopicsView({ onNavigate }) {
  const topics = [
    { name: "Making Friends", icon: <Users size={32} className="text-black"/>, bg: "bg-[#00E5FF]" },
    { name: "Conversation", icon: <MessageCircle size={32} className="text-black"/>, bg: "bg-[#FF426A]" },
    { name: "Travel", icon: <Plane size={32} className="text-black"/>, bg: "bg-[#FFD100]" },
    { name: "Flights", icon: <Plane size={32} className="transform -rotate-45 text-black"/>, bg: "bg-[#A25BFF]" },
    { name: "On Tour", icon: <MapPin size={32} className="text-black"/>, bg: "bg-[#FFD100]" },
    { name: "Signs", icon: <LayoutTemplate size={32} className="text-black"/>, bg: "bg-[#00FF87]" },
  ];

  return (
    <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32">
      <div className="p-5 pt-8 sticky top-0 z-20 bg-[#1E1E2A] flex items-center justify-center border-b-4 border-black">
        <div className="flex-1 bg-[#2A2A3B] rounded-2xl py-3 px-4 flex items-center gap-3 border-4 border-black shadow-[4px_4px_0_#000] min-w-0">
          <Search size={24} className="text-[#A1A1AA] flex-none" strokeWidth={3} />
          <input type="text" placeholder="Filter Units..." className="bg-transparent w-full outline-none text-white font-black placeholder:text-[#7A7A9A]" />
        </div>
      </div>
      
      <div className="p-6 pt-6">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-white font-black text-3xl uppercase tracking-wider">Unit 1</h2>
           <span className="bg-white text-black border-2 border-black shadow-[2px_2px_0_#000] px-3 py-1 rounded-xl font-black text-xs uppercase">Beginner</span>
        </div>
        
        {/* Winding Path Layout */}
        <div className="flex flex-col items-center gap-8 relative">
          <div className="absolute top-0 bottom-0 w-6 bg-[#2A2A3B] border-x-4 border-black -z-10 rounded-full left-[48%]"></div>
          
          {topics.map((topic, i) => {
            const shift = i % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
            return (
              <div key={i} onClick={() => onNavigate('subtopics', { topic: topic.name })} className={`flex flex-col items-center gap-2 cursor-pointer group ${shift}`}>
                <div className={`w-[90px] h-[90px] flex-none ${topic.bg} rounded-full flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all`}>
                  {topic.icon}
                </div>
                <span className="text-sm text-center text-white font-black uppercase tracking-wide bg-[#2A2A3B] px-3 py-1 rounded-xl border-2 border-black mt-2">
                  {topic.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SUBTOPICS & GAMES 
// ==========================================
function SubtopicsView({ onNavigate, topic }) {
  const games = [
    { name: "Vocabulary", icon: <BookA size={36} className="text-black" />, bg: "bg-[#00E5FF]" },
    { name: "Match Phrase", icon: <CheckSquare size={36} className="text-black" />, bg: "bg-[#FF426A]" },
    { name: "Audio Quiz", icon: <Headphones size={36} className="text-black" />, bg: "bg-[#FFD100]" },
    { name: "Context Match", icon: <LayoutTemplate size={36} className="text-black" />, bg: "bg-[#00FF87]" },
  ];

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative">
      <div className="p-5 pt-8 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black">
        <button onClick={() => onNavigate('topics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <ChevronLeft size={28} strokeWidth={3} />
        </button>
        <h1 className="flex-1 text-2xl font-black text-white uppercase tracking-widest truncate">{topic || "Travel"}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="py-6 border-b-4 border-black bg-[#2A2A3B]">
          <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-4">Select Scenario</h2>
          <div className="flex overflow-x-auto px-6 gap-4 pb-2 scrollbar-hide">
            {["Asking Directions", "Buying Tickets", "Taking the Train"].map((sub, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#1E1E2A] rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] cursor-pointer hover:bg-[#323246] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex-none min-w-[200px]">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-black border-2 border-black">{i+1}</div>
                <span className="font-black text-white uppercase tracking-wide text-xs">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6">
          <h2 className="px-6 text-white text-sm font-black uppercase tracking-widest mb-6">Exercises</h2>
          <div className="grid grid-cols-2 gap-6 px-6">
            {games.map((game, i) => (
              <div key={i} onClick={() => onNavigate('gameplay', { game: game.name })} className="flex flex-col items-center gap-4 cursor-pointer group">
                <div className={`w-[100px] h-[100px] flex-none ${game.bg} rounded-3xl flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] group-active:translate-x-[6px] group-active:translate-y-[6px] group-active:shadow-none transition-all`}>
                  {game.icon}
                </div>
                <span className="text-xs text-center text-white font-black uppercase tracking-wider leading-tight bg-[#2A2A3B] px-3 py-2 rounded-xl border-2 border-black">
                  {game.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 right-6 z-30">
        <button 
          onClick={() => onNavigate('gameplay', { game: 'Quick Play' })}
          className="w-full h-16 flex-none bg-[#00FF87] rounded-2xl flex items-center justify-center text-black font-black text-xl tracking-widest uppercase border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
        >
          START LESSON
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. GAMEPLAY VIEW
// ==========================================
function GamePlayView({ onNavigate, game }) {
  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col">
      <div className="p-5 pt-8 bg-[#1E1E2A] flex items-center gap-4 border-b-4 border-black">
        <button onClick={() => onNavigate('subtopics')} className="w-12 h-12 flex-none bg-[#2A2A3B] text-white rounded-2xl flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <X size={28} strokeWidth={3} />
        </button>
        <div className="flex-1 h-6 bg-[#2A2A3B] rounded-full border-4 border-black overflow-hidden p-0.5">
          <div className="w-1/3 h-full bg-[#00FF87] rounded-full border-r-2 border-black"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-[#00E5FF] mb-2 uppercase tracking-widest" style={{ WebkitTextStroke: '1px black' }}>{game || "Practice"}</h2>
        <p className="text-white font-bold mb-10 text-sm uppercase tracking-widest bg-[#2A2A3B] px-4 py-2 rounded-xl border-2 border-black">Select meaning.</p>
        
        <div className="w-full bg-[#2A2A3B] border-4 border-black rounded-[3rem] p-10 mb-10 relative shadow-[8px_8px_0_#000]">
          <p className="text-7xl font-serif text-white mb-8 tracking-widest">車站</p>
          <button className="mx-auto w-16 h-16 flex-none rounded-full bg-[#FF426A] border-4 border-black text-white flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all absolute -bottom-8 left-1/2 -translate-x-1/2">
            <Volume2 size={32} strokeWidth={3} />
          </button>
        </div>

        <button className="w-full mt-4 bg-white text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] hover:bg-[#00E5FF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest">Train Station</button>
        <button className="w-full mt-4 bg-white text-black font-black text-xl py-5 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] hover:bg-[#00E5FF] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-colors uppercase tracking-widest">Airport</button>
      </div>
    </div>
  );
}

// ==========================================
// 6. CHATBOT ROLEPLAY (With Momo Character)
// ==========================================
function ChatbotView({ onNavigate }) {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const breakdownData = [
    { hanzi: "嗨", pinyin: "Hāi", meaning: "Hi" },
    { hanzi: "你", pinyin: "nǐ", meaning: "You" },
    { hanzi: "週末", pinyin: "zhōumò", meaning: "Weekend", isSaved: true },
    { hanzi: "有空", pinyin: "yǒukòng", meaning: "Have free time" },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A] relative">
      <div className="p-4 pt-8 border-b-4 border-black flex items-center bg-[#2A2A3B] z-20">
        <button onClick={() => onNavigate('home')} className="p-2 flex-none text-white hover:text-[#00E5FF] transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <div className="w-14 h-14 flex-none ml-2 border-4 border-black rounded-2xl bg-[#00E5FF] overflow-hidden">
          {/* Momo as AI Avatar */}
          <MomoMascot mood="happy" animated={true} />
        </div>
        <div className="ml-3 min-w-0">
          <h3 className="text-white font-black text-xl leading-tight uppercase tracking-wider truncate">Momo (AI)</h3>
          <span className="text-black bg-[#00FF87] px-2 rounded-md text-xs font-black flex items-center gap-1.5 uppercase tracking-widest mt-1 w-max border-2 border-black">
            <span className="w-2 h-2 bg-black rounded-full flex-none animate-pulse"></span> Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
        <div className="text-center">
          <span className="bg-[#2A2A3B] text-white font-black text-xs px-4 py-2 rounded-xl uppercase tracking-widest border-2 border-black inline-block">
            Topic: Making Friends
          </span>
        </div>
        
        <div className="flex justify-start">
          <div onClick={() => setSelectedMessage('aiMsg')} className="bg-white border-4 border-black text-black p-5 rounded-[2rem] rounded-tl-none max-w-[85%] cursor-pointer active:scale-95 transition-transform shadow-[6px_6px_0_#000]">
            <p className="font-serif text-2xl font-bold mb-2 break-words leading-snug">嗨！你這個週末有空嗎？</p>
            <p className="text-white bg-[#A25BFF] px-2 py-1 rounded-lg border-2 border-black text-[10px] font-black uppercase tracking-widest mt-3 w-max">Tap to translate</p>
          </div>
        </div>

        <div className="flex justify-end">
          <div onClick={() => setSelectedMessage('userMsg')} className="bg-[#00FF87] border-4 border-black text-black p-5 rounded-[2rem] rounded-tr-none max-w-[85%] cursor-pointer active:scale-95 transition-transform shadow-[6px_6px_0_#000]">
             <p className="font-serif text-2xl font-bold mb-2 break-words leading-snug">有啊，我們去哪裡？</p>
             <p className="text-white bg-[#FF426A] px-2 py-1 rounded-lg border-2 border-black text-[10px] font-black uppercase tracking-widest mt-3 w-max">Tap to translate</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-[#2A2A3B] border-t-4 border-black p-4 pb-6 flex gap-3 items-center z-10">
        <button className="w-14 h-14 flex-none rounded-2xl bg-[#1E1E2A] text-white flex items-center justify-center border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <Mic size={28} strokeWidth={3} />
        </button>
        <input type="text" placeholder="Type..." className="flex-1 min-w-0 h-14 bg-white border-4 border-black rounded-2xl px-4 text-black font-black focus:outline-none shadow-inner" />
        <button className="w-14 h-14 flex-none rounded-2xl bg-[#FFD100] text-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
          <Send size={24} strokeWidth={3} />
        </button>
      </div>

      {selectedMessage && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#000000] opacity-80" onClick={() => setSelectedMessage(null)}></div>
          
          <div className="bg-[#1E1E2A] border-t-8 border-black rounded-t-[3rem] p-6 pt-8 relative z-10 animate-[slideUp_0.2s_ease-out]">
            <button onClick={() => setSelectedMessage(null)} className="absolute top-6 right-6 w-12 h-12 flex-none bg-[#2A2A3B] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
              <X size={28} strokeWidth={4} />
            </button>
            
            <div className="flex justify-between items-start mb-8 pr-16 gap-4">
              <div className="min-w-0">
                <h3 className="text-white font-black text-2xl mb-3 leading-tight break-words">
                  {selectedMessage === 'aiMsg' ? "Hi! Do you have free time this weekend?" : "Yes, where are we going?"}
                </h3>
                <p className="text-black bg-[#00E5FF] px-3 py-1 rounded-xl border-2 border-black text-sm font-black break-words uppercase tracking-widest inline-block">
                  {selectedMessage === 'aiMsg' ? "Hāi! Nǐ zhège zhōumò yǒukòng ma?" : "Yǒu a, wǒmen qù nǎlǐ?"}
                </p>
              </div>
              <button className="flex-shrink-0 w-16 h-16 bg-[#FF426A] border-4 border-black text-white rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                <Volume2 size={32} strokeWidth={3} />
              </button>
            </div>

            <h4 className="text-xs font-black text-white bg-black px-4 py-2 rounded-xl inline-block uppercase tracking-widest mb-4">Word Breakdown</h4>
            
            <div className="max-h-52 overflow-y-auto space-y-4 mb-8 pr-2 scrollbar-hide">
              {breakdownData.map((word, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0_#000] gap-4">
                  <div className="flex-1 flex items-center gap-4 min-w-0">
                    <span className="text-4xl text-black font-serif font-bold flex-none">{word.hanzi}</span>
                    <div className="min-w-0">
                      <span className="text-[#A25BFF] text-sm font-black block mb-1 truncate uppercase tracking-widest">{word.pinyin}</span>
                      <p className="text-black font-bold text-sm truncate">{word.meaning}</p>
                    </div>
                  </div>
                  <button className={`${word.isSaved ? 'bg-[#FFD100]' : 'bg-[#E4E4E7]'} flex-none p-3 border-4 border-black rounded-xl active:translate-y-[2px] transition-all`}>
                    <Bookmark size={24} strokeWidth={3} className="text-black" fill={word.isSaved ? "#000" : "none"} />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full bg-[#00FF87] border-4 border-black text-black font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest">
              <Mic size={28} /> Practice Speaking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. CAMERA, LOADING, RESULT, SAVED & PROFILE 
// ==========================================
function CameraView({ onNavigate }) {
  return (
    <div className="h-full w-full bg-[#1E1E2A] relative flex flex-col">
      <div className="absolute top-0 w-full p-6 pt-10 flex justify-between items-center z-10 gap-4">
        <button onClick={() => onNavigate('home')} className="bg-[#2A2A3B] w-14 h-14 flex-none border-4 border-black rounded-2xl text-white flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><ChevronLeft size={32} strokeWidth={3} /></button>
        <div className="bg-[#00E5FF] border-4 border-black shadow-[4px_4px_0_#000] px-5 py-3 rounded-2xl text-sm font-black text-black tracking-widest uppercase truncate">Focus Text</div>
        <div className="w-14 flex-none"></div>
      </div>
      <div className="flex-1 bg-[#1E1E2A] flex items-center justify-center relative">
        <div className="w-[80%] h-[50%] border-8 border-dashed border-[#00FF87] rounded-[3rem] relative bg-black/20">
          <div className="absolute inset-0 flex items-center justify-center"><ScanLine size={80} className="text-[#00FF87] animate-pulse" strokeWidth={3} /></div>
        </div>
      </div>
      <div className="h-44 bg-[#2A2A3B] border-t-4 border-black flex items-center justify-around pb-8 px-6 rounded-t-[3rem] relative -mt-8 z-10">
        <button className="w-16 h-16 flex-none bg-[#1E1E2A] border-4 border-black rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><ImageIcon size={32} strokeWidth={2.5}/></button>
        <button onClick={() => onNavigate('loading')} className="w-24 h-24 flex-none rounded-full border-4 border-black shadow-[6px_6px_0_#000] bg-[#00FF87] flex items-center justify-center active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all">
          <div className="w-12 h-12 bg-black rounded-full"></div>
        </button>
        <div className="w-16 h-16 flex-none"></div>
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
    <div className="h-full w-full p-6 flex flex-col justify-center items-center bg-[#FFD100]">
      <MomoMascot mood="excited" className="w-40 h-40 mb-10" animated={true} />
      <h2 className="text-3xl font-black text-black tracking-widest uppercase text-center px-4 animate-pulse bg-white border-4 border-black py-3 px-6 rounded-2xl shadow-[6px_6px_0_#000]">Translating...</h2>
    </div>
  );
}

function ResultView({ onNavigate }) {
  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A]">
      <div className="p-5 pt-8 flex justify-between items-center bg-[#1E1E2A] border-b-4 border-black gap-4">
        <button onClick={() => onNavigate('home')} className="w-12 h-12 flex-none bg-[#2A2A3B] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><ChevronLeft size={28} strokeWidth={3} /></button>
        <span className="text-lg font-black text-white tracking-widest uppercase truncate">Result</span>
        <button className="text-black bg-[#00E5FF] border-4 border-black shadow-[4px_4px_0_#000] shrink-0 text-sm font-black flex items-center gap-1 py-2 px-4 rounded-xl uppercase tracking-wider active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">Save</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="bg-white border-4 border-black rounded-[2rem] p-8 mb-8 mt-4 shadow-[8px_8px_0_#000]">
          <div className="flex justify-between items-start mb-8 gap-4">
            <h2 className="text-5xl font-black text-black leading-tight font-serif min-w-0 break-words tracking-widest">我要一杯<br/>珍珠奶茶</h2>
            <button className="w-16 h-16 flex-none rounded-2xl bg-[#FFD100] border-4 border-black text-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><Volume2 size={32} strokeWidth={3}/></button>
          </div>
          <p className="text-white bg-[#A25BFF] border-4 border-black px-4 py-2 rounded-xl text-xl font-black mb-4 break-words uppercase tracking-widest inline-block shadow-[4px_4px_0_#000]">Wǒ yào yī bēi zhēnzhū nǎichá</p>
          <p className="text-black text-lg font-bold break-words">I would like a cup of boba milk tea.</p>
        </div>
      </div>
    </div>
  );
}

function SavedWordsView({ onNavigate }) {
  return (
    <div className="h-full w-full flex flex-col bg-[#1E1E2A]">
       <div className="p-5 pt-8 flex items-center bg-[#2A2A3B] border-b-4 border-black sticky top-0 z-20 gap-4">
        <button onClick={() => onNavigate('home')} className="w-12 h-12 flex-none bg-[#1E1E2A] rounded-2xl flex items-center justify-center text-white border-4 border-black shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><ChevronLeft size={28} strokeWidth={3} /></button>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider truncate">Word Vault</h1>
      </div>
      <div className="flex-1 p-6 space-y-6">
         <div className="bg-white border-4 border-black p-5 rounded-[1.5rem] flex justify-between items-center gap-4 transition-all shadow-[6px_6px_0_#000]">
            <div className="min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl font-black font-serif text-black flex-none">載具</span>
                <span className="text-white bg-[#FF426A] border-2 border-black text-xs font-black px-2 py-1 rounded-lg truncate uppercase tracking-widest">zàijù</span>
              </div>
              <p className="text-[#4B4B5A] font-bold text-base truncate">Digital Receipt</p>
            </div>
            <button className="w-16 h-16 flex-none rounded-2xl bg-[#FFD100] border-4 border-black shadow-[4px_4px_0_#000] text-black flex items-center justify-center active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"><Bookmark size={32} strokeWidth={3} fill="#000" /></button>
          </div>
      </div>
    </div>
  );
}

function ProfileView({ onNavigate }) {
  return (
    <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32">
      <div className="bg-[#2A2A3B] p-6 pt-10 border-b-4 border-black flex flex-col items-center">
        <div style={{ width: '120px', height: '120px', flexShrink: 0 }} className="bg-[#00E5FF] border-4 border-black shadow-[6px_6px_0_#000] rounded-[2.5rem] p-1.5 mb-6 flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem', backgroundColor: 'white' }} />
        </div>
        <h2 className="text-3xl font-black text-white text-center px-4 break-words mb-3">Liam Anderson</h2>
        <p className="text-black text-sm font-black bg-[#00FF87] border-2 border-black shadow-[2px_2px_0_#000] px-4 py-2 rounded-xl uppercase tracking-widest">ID: HB-948271</p>
      </div>
      <div className="p-6 mt-4">
         <div className="bg-white border-4 border-black p-8 rounded-[2.5rem] text-center flex flex-col items-center shadow-[8px_8px_0_#000]">
           <h3 className="text-black font-black text-2xl mb-8 uppercase tracking-widest">Add Friend</h3>
           <div className="w-48 h-48 flex-none bg-[#E4E4E7] border-4 border-black rounded-[2rem] flex items-center justify-center mb-8"><QrCode className="text-black" size={120} /></div>
           <button className="w-full bg-[#A25BFF] border-4 border-black text-white font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-2 shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest">
              Share Link
           </button>
         </div>
      </div>
    </div>
  );
}