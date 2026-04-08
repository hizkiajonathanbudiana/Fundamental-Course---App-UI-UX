// import React, { useState } from 'react';
// import { Home as HomeIcon, LayoutGrid, MessageCircle, ScanLine, MapPinned } from 'lucide-react';

// // IMPORT SEMUA HALAMAN DARI FOLDER PAGES
// import Home from './pages/Home';
// import Camera from './pages/Camera';
// import Loading from './pages/Loading';
// import Result from './pages/Result';
// import Search from './pages/Search';
// import Topics from './pages/Topics';
// import Subtopics from './pages/Subtopics';
// import GamePlay from './pages/Gameplay';
// import Chatbot from './pages/Chatbot';
// import MapFriends from './pages/MapFriends';
// import Profile from './pages/Profile';
// import SavedWords from './pages/SavedWords';

// export default function App() {
//   const [currentView, setCurrentView] = useState('home');
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [selectedGame, setSelectedGame] = useState(null);

//   const navigateTo = (view, data = null) => {
//     if (data?.topic) setSelectedTopic(data.topic);
//     if (data?.game) setSelectedGame(data.game);
//     setCurrentView(view);
//   };

//   const renderPage = () => {
//     switch (currentView) {
//       case 'home': return <Home onNavigate={navigateTo} />;
//       case 'camera': return <Camera onNavigate={navigateTo} />;
//       case 'loading': return <Loading onNavigate={navigateTo} />;
//       case 'result': return <Result onNavigate={navigateTo} />;
//       case 'search': return <Search onNavigate={navigateTo} />;
//       case 'topics': return <Topics onNavigate={navigateTo} />;
//       case 'subtopics': return <Subtopics onNavigate={navigateTo} topic={selectedTopic} />;
//       case 'gameplay': return <GamePlay onNavigate={navigateTo} game={selectedGame} />;
//       case 'chatbot': return <Chatbot onNavigate={navigateTo} />;
//       case 'map': return <MapFriends onNavigate={navigateTo} />;
//       case 'profile': return <Profile onNavigate={navigateTo} />;
//       case 'saved': return <SavedWords onNavigate={navigateTo} />;
//       default: return <Home onNavigate={navigateTo} />;
//     }
//   };

//   // Navigasi bawah hanya muncul di 4 menu utama ini
//   const showBottomNav = ['home', 'topics', 'chatbot', 'map'].includes(currentView);

//   return (
//     <div className="flex justify-center items-center h-[100dvh] sm:p-6 bg-[#0B0A10] font-sans selection:bg-[#00FF87]/30 overflow-hidden">

//       {/* CSS Animations Global */}
//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes bop {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-8px); }
//         }
//         .animate-bop { animation: bop 2s ease-in-out infinite; }

//         @keyframes bop-fast {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px) scale(1.05); }
//         }
//         .animate-bop-fast { animation: bop-fast 1s ease-in-out infinite; }

//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />

//       {/* Main App Container - Comic Neo-Brutalism */}
//       <div className="w-full max-w-[400px] h-full sm:max-h-[800px] bg-[#1E1E2A] text-white overflow-hidden relative sm:shadow-[12px_12px_0px_#000] sm:border-4 border-black sm:rounded-[3rem]">

//         {/* Render Halaman */}
//         {renderPage()}

//         {/* Chunky Bottom Nav - Hard Borders */}
//         {showBottomNav && (
//           <div className="absolute bottom-0 w-full h-[85px] bg-[#1E1E2A] border-t-4 border-black flex justify-around items-center px-4 z-50 sm:rounded-b-[3rem]">
//             <NavButton icon={<HomeIcon size={26} strokeWidth={3}/>} label="Home" isActive={currentView === 'home'} onClick={() => navigateTo('home')} activeColor="text-[#00E5FF]" />
//             <NavButton icon={<LayoutGrid size={26} strokeWidth={3}/>} label="Learn" isActive={currentView === 'topics'} onClick={() => navigateTo('topics')} activeColor="text-[#A25BFF]" />

//             {/* Playful Camera FAB - Solid Shadow */}
//             <div className="relative -top-6">
//               <button 
//                 onClick={() => navigateTo('camera')}
//                 className="flex items-center justify-center w-[70px] h-[70px] flex-none bg-[#00FF87] rounded-2xl text-black border-4 border-black shadow-[4px_4px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
//               >
//                 <ScanLine size={32} strokeWidth={3} />
//               </button>
//             </div>

//             <NavButton icon={<MessageCircle size={26} strokeWidth={3}/>} label="Chats" isActive={currentView === 'chatbot'} onClick={() => navigateTo('chatbot')} hasBadge activeColor="text-[#FFD100]" />
//             <NavButton icon={<MapPinned size={26} strokeWidth={3}/>} label="Map" isActive={currentView === 'map'} onClick={() => navigateTo('map')} activeColor="text-[#FF426A]" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Komponen Navigasi (Icon Bawah)
// const NavButton = ({ icon, label, isActive, onClick, hasBadge, activeColor }) => (
//   <button 
//     onClick={onClick} 
//     className={`relative flex flex-col items-center justify-center w-16 h-16 flex-none rounded-2xl transition-all ${isActive ? activeColor : 'text-[#7A7A9A] hover:text-white'}`}
//   >
//     <div className={isActive ? "translate-y-[-2px] transition-transform" : ""}>{icon}</div>
//     {hasBadge && <span className="absolute top-2 right-3 bg-[#FF426A] w-3 h-3 rounded-full border-2 border-black"></span>}
//   </button>
// );

import React, { useState } from 'react';
import { Home as HomeIcon, MessageCircle, MapPinned, User } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import MomoMascot from './components/MomoMascot';

// ==========================================
// IMPORT SEMUA HALAMAN DARI FOLDER PAGES
// ==========================================
import Settings from './pages/Settings';
import DynamicHome from './pages/DynamicHome';
import Camera from './pages/Camera';
import Loading from './pages/Loading';
import Result from './pages/Result';
import Topics from './pages/Topics';
import Subtopics from './pages/Subtopics';
import GamePlay from './pages/Gameplay';
import Search from './pages/Search';
import TranslationHub from './pages/TranslationHub';
import Chatbot from './pages/Chatbot';
import Chats from './pages/Chats';
import AddFriend from './pages/AddFriend';
import DirectChat from './pages/DirectChat';
import MapFriends from './pages/MapFriends';
import Profile from './pages/Profile';
import SavedWords from './pages/SavedWords';

export default function App() {
  // --- CONTEXT ---
  const appContext = useAppContext();
  const activeLang = appContext.activeLearningLang;

  // --- STATES ---
  const [currentView, setCurrentView] = useState(appContext.isFirstTime ? 'settings' : 'home');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedFriendCandidate, setSelectedFriendCandidate] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState('ai-momo');

  // --- FUNGSI NAVIGASI ---
  const navigateTo = (view, data = null) => {
    if (data?.topic) setSelectedTopic(data.topic);
    if (data?.game) setSelectedGame(data.game);
    if (data?.threadId) setSelectedThreadId(data.threadId);

    if (view === 'add-friend') {
      setSelectedFriendCandidate(data?.friendCandidate || null);
    } else {
      setSelectedFriendCandidate(null);
    }

    setCurrentView(view);
  };

  // --- ROUTER ENGINE ---
  const renderPage = () => {
    switch (currentView) {
      // Flow Setup
      case 'settings': return <Settings onNavigate={navigateTo} isFirstTime={appContext.isFirstTime} />;
      case 'home': return <DynamicHome onNavigate={navigateTo} lang={activeLang} />;

      // Flow Kamera & Kamus
      case 'camera': return <Camera onNavigate={navigateTo} lang={activeLang} />;
      case 'loading': return <Loading onNavigate={navigateTo} lang={activeLang} />;
      case 'result': return <Result onNavigate={navigateTo} lang={activeLang} />;
      case 'search': return <Search onNavigate={navigateTo} lang={activeLang} />;
      case 'hub': return <TranslationHub onNavigate={navigateTo} lang={activeLang} />;

      // Flow Latihan
      case 'topics': return <Topics onNavigate={navigateTo} lang={activeLang} />;
      case 'subtopics': return <Subtopics onNavigate={navigateTo} topic={selectedTopic} lang={activeLang} />;
      case 'gameplay': return <GamePlay onNavigate={navigateTo} game={selectedGame} lang={activeLang} />;

      // Flow Sosial & Tools
      case 'chats': return <Chats onNavigate={navigateTo} lang={activeLang} />;
      case 'chatbot': return <Chatbot onNavigate={navigateTo} lang={activeLang} />;
      case 'add-friend': return <AddFriend onNavigate={navigateTo} lang={activeLang} friendCandidate={selectedFriendCandidate} />;
      case 'direct-chat': return <DirectChat onNavigate={navigateTo} lang={activeLang} threadId={selectedThreadId} />;
      case 'map': return <MapFriends onNavigate={navigateTo} lang={activeLang} />;
      case 'profile': return <Profile onNavigate={navigateTo} lang={activeLang} />;
      case 'saved': return <SavedWords onNavigate={navigateTo} lang={activeLang} />;

      default: return <DynamicHome onNavigate={navigateTo} lang={activeLang} />;
    }
  };

  // Navigasi bawah muncul di menu utama yang sering dipakai
  const showBottomNav = ['home', 'chats', 'chatbot', 'add-friend', 'direct-chat', 'map', 'profile'].includes(currentView);

  return (
    <div className="flex justify-center items-center h-[100dvh] sm:p-6 bg-[#0B0A10] font-sans selection:bg-[#00FF87]/30 overflow-hidden">

      {/* CSS Animations Global - Neo Brutalism Bop */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bop { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bop { animation: bop 2s ease-in-out infinite; }
        
        @keyframes bop-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px) scale(1.05); } }
        .animate-bop-fast { animation: bop-fast 1s ease-in-out infinite; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Main App Container */}
      <div className="w-full max-w-[400px] h-full sm:max-h-[800px] bg-[#1E1E2A] text-white overflow-hidden relative sm:shadow-[12px_12px_0px_#000] sm:border-4 border-black sm:rounded-[3rem]">

        {/* Render Halaman Dinamis */}
        {renderPage()}

        {/* Chunky Bottom Nav */}
        {showBottomNav && (
          <div className="absolute bottom-0 w-full h-[85px] bg-[#1E1E2A] border-t-4 border-black flex justify-around items-center px-4 z-50 sm:rounded-b-[3rem]">

            <NavButton
              icon={<HomeIcon size={26} strokeWidth={3} />}
              isActive={currentView === 'home'}
              onClick={() => navigateTo('home')}
              activeColor={activeLang.primaryColor}
            />

            <NavButton
              icon={<MessageCircle size={26} strokeWidth={3} />}
              isActive={['chats', 'chatbot', 'add-friend', 'direct-chat'].includes(currentView)}
              onClick={() => navigateTo('chats')}
              activeColor={activeLang.secondaryColor}
              hasBadge
            />

            <MomoTabButton
              isActive={currentView === 'chatbot'}
              onClick={() => navigateTo('chatbot')}
            />

            <NavButton
              icon={<MapPinned size={26} strokeWidth={3} />}
              isActive={currentView === 'map'}
              onClick={() => navigateTo('map')}
              activeColor="#FF426A"
            />

            <NavButton
              icon={<User size={26} strokeWidth={3} />}
              isActive={currentView === 'profile'}
              onClick={() => navigateTo('profile')}
              activeColor="#A25BFF"
            />

          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN BOTTOM NAVIGATION BUTTON
// ==========================================
const NavButton = ({ icon, isActive, onClick, activeColor, hasBadge }) => (
  <button
    onClick={onClick}
    style={isActive ? { color: activeColor } : {}}
    className={`relative flex flex-col items-center justify-center w-16 h-16 flex-none rounded-2xl transition-all ${isActive ? '' : 'text-[#7A7A9A] hover:text-white'}`}
  >
    <div className={isActive ? "translate-y-[-2px] transition-transform" : ""}>{icon}</div>
    {hasBadge && (
      <span className="absolute top-2 right-3 bg-[#FF426A] w-3 h-3 rounded-full border-2 border-black"></span>
    )}
  </button>
);

const MomoTabButton = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative -top-6 flex items-center justify-center w-[72px] h-[72px] flex-none rounded-2xl border-4 border-black transition-all ${isActive ? 'bg-[#00FF87] shadow-[4px_4px_0_#000]' : 'bg-[#2A2A3B] shadow-[4px_4px_0_#000]'
      } active:translate-y-0 active:shadow-none`}
    title="Momo Chat"
  >
    <MomoMascot className="w-11 h-11" mood="happy" animated={false} />
  </button>
);
