// import React from 'react';
// import { Search, Flame, Bookmark, BellRing, MessageCircle, UserPlus } from 'lucide-react';
// import MomoMascot from '../components/MomoMascot';

// export default function Home({ onNavigate }) {
//   return (
//     <div className="h-full w-full p-5 overflow-y-auto pb-32 bg-[#1E1E2A]">
      
//       {/* 1. Header: Avatar (Kiri) + Streak & Vault (Kanan) */}
//       <header className="mb-8 mt-4 flex justify-between items-center gap-4">
//         {/* Profile Group */}
//         <button onClick={() => onNavigate('profile')} className="flex items-center gap-3 active:scale-95 transition-transform text-left">
//           <div className="w-12 h-12 flex-none bg-[#FFD100] rounded-xl border-4 border-black p-0.5 overflow-hidden shadow-[4px_4px_0_#000]">
//              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Avatar" className="w-full h-full object-cover bg-white" />
//           </div>
//           <div className="hidden sm:block min-w-0">
//             <h1 className="text-xl font-black text-white truncate">Liam A.</h1>
//           </div>
//         </button>

//         {/* Stats Group (Streak & Saved) */}
//         <div className="flex items-center gap-3 flex-none">
//           <div className="bg-[#FFD100] border-4 border-black px-3 py-1.5 rounded-xl shadow-[4px_4px_0_#000] flex items-center gap-1">
//             <Flame size={20} className="text-black" fill="currentColor" />
//             <span className="text-black font-black text-sm">14</span>
//           </div>
//           <button onClick={() => onNavigate('saved')} className="bg-[#2A2A3B] border-4 border-black px-3 py-1.5 rounded-xl shadow-[4px_4px_0_#000] flex items-center gap-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
//             <Bookmark size={20} className="text-[#00E5FF]" />
//             <span className="text-white font-black text-sm">128</span>
//           </button>
//         </div>
//       </header>

//       {/* 2. Hero Action: Continue Lesson (Momo mengajak belajar) */}
//       <div 
//         onClick={() => onNavigate('topics')}
//         className="mb-8 w-full bg-[#A25BFF] border-4 border-black shadow-[8px_8px_0_#000] rounded-[2rem] p-6 relative overflow-hidden cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
//       >
//         <div className="relative z-10 w-[65%]">
//           <span className="bg-white text-black font-black text-[10px] px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest mb-3 inline-block">Daily Quest</span>
//           <h2 className="text-white text-2xl font-black leading-tight mb-1" style={{ WebkitTextStroke: '1px black' }}>Unit 1: <br/>Travel</h2>
//           <p className="text-white font-bold text-sm bg-black/30 inline-block px-2 rounded mt-2">1/5 Lessons Completed</p>
//         </div>
//         {/* Momo Mascot Peeking from right */}
//         <div className="absolute -bottom-6 -right-4 w-36 h-36">
//           <MomoMascot mood="excited" className="w-full h-full" animated={true} />
//         </div>
//       </div>

//       {/* 3. Quick Survival Tools: Search Bar */}
//       <div className="mb-8 cursor-text" onClick={() => onNavigate('search')}>
//         <div className="w-full bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] py-4 px-5 flex items-center gap-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
//           <Search size={24} className="text-[#00FF87] flex-none" strokeWidth={3} />
//           <span className="text-[#A1A1AA] font-bold text-lg">Search Dictionary...</span>
//         </div>
//       </div>

//       {/* 4. Inbox & Alerts (Pusat Notifikasi Gabungan) */}
//       <section>
//         <div className="flex justify-between items-center mb-4 px-2">
//           <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
//             <BellRing size={20} className="text-[#FFD100]" /> Inbox & Alerts
//           </h2>
//         </div>
        
//         <div className="space-y-4">
//           {/* Notification 1: AI Chat Reminder */}
//           <div onClick={() => onNavigate('chatbot')} className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
//             <div className="w-14 h-14 flex-none bg-[#00E5FF] rounded-2xl flex items-center justify-center border-4 border-black">
//               <MessageCircle size={24} className="text-black" strokeWidth={3} fill="#00E5FF" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center mb-1">
//                 <h3 className="text-white font-black text-base truncate">Momo (AI Friend)</h3>
//                 <span className="bg-[#FF426A] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-black uppercase">Unread</span>
//               </div>
//               <p className="text-[#A1A1AA] font-bold text-xs truncate">嗨！你這個週末有空嗎？</p>
//             </div>
//           </div>

//           {/* Notification 2: Friend Radar (Map feature) */}
//           <div onClick={() => onNavigate('map')} className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
//             <div className="w-14 h-14 flex-none bg-[#00FF87] rounded-2xl flex items-center justify-center border-4 border-black">
//               <UserPlus size={24} className="text-black" strokeWidth={3} />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-center mb-1">
//                 <h3 className="text-white font-black text-base truncate">Friend Radar</h3>
//               </div>
//               <p className="text-[#A1A1AA] font-bold text-xs truncate">Chen Wei is 200m away!</p>
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

import React from 'react';
import { Search, Flame, Bookmark, BellRing, MessageCircle, Navigation } from 'lucide-react';
import MomoMascot from '../components/MomoMascot';

export default function Home({ onNavigate }) {
  return (
    <div className="h-full w-full p-5 overflow-y-auto pb-32 bg-[#1E1E2A]">
      
      {/* 1. Header: Avatar (Kiri) + Streak & Vault (Kanan) */}
      <header className="mb-8 mt-4 flex justify-between items-center gap-4">
        {/* Profile Avatar */}
        <button onClick={() => onNavigate('profile')} className="w-14 h-14 flex-none bg-[#FFD100] rounded-full border-4 border-black p-0.5 overflow-hidden shadow-[4px_4px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Avatar" className="w-full h-full object-cover bg-white rounded-full" />
        </button>

        {/* Pliil Buttons: Stats Group (Lebih kerasa tombol) */}
        <div className="flex items-center gap-3 flex-none">
          <button className="bg-white hover:bg-[#F3F3F3] border-4 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_#000] flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <Flame size={20} className="text-[#FF5C00]" fill="#FF5C00" />
            <span className="text-black font-black text-sm">14</span>
          </button>
          <button onClick={() => onNavigate('saved')} className="bg-[#2A2A3B] hover:bg-[#323246] border-4 border-black px-4 py-2 rounded-full shadow-[4px_4px_0_#000] flex items-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <Bookmark size={20} className="text-[#00E5FF]" />
            <span className="text-white font-black text-sm">128</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Action: Continue Lesson */}
      <div 
        onClick={() => onNavigate('topics')}
        className="mb-8 w-full bg-[#A25BFF] border-4 border-black shadow-[8px_8px_0_#000] rounded-[2rem] p-6 relative overflow-hidden cursor-pointer active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
      >
        <div className="relative z-10 w-[65%]">
          <span className="bg-white text-black font-black text-[10px] px-3 py-1 rounded-full border-2 border-black uppercase tracking-widest mb-3 inline-block">Daily Quest</span>
          <h2 className="text-white text-2xl font-black leading-tight mb-1" style={{ WebkitTextStroke: '1px black' }}>Unit 1: <br/>Travel</h2>
          <p className="text-white font-bold text-sm bg-black/30 inline-block px-2 rounded mt-2">1/5 Lessons Completed</p>
        </div>
        {/* Momo Mascot Peeking */}
        <div className="absolute -bottom-6 -right-4 w-36 h-36 pointer-events-none">
          <MomoMascot mood="excited" className="w-full h-full" animated={true} />
        </div>
      </div>

      {/* 3. Quick Survival Tools: Search Bar */}
      <div className="mb-8 cursor-text" onClick={() => onNavigate('search')}>
        <div className="w-full bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] py-4 px-5 flex items-center gap-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all hover:bg-[#323246]">
          <Search size={24} className="text-[#00FF87] flex-none" strokeWidth={3} />
          <span className="text-[#A1A1AA] font-bold text-lg">Search Dictionary...</span>
        </div>
      </div>

      {/* 4. Inbox & Alerts (AI & Real Humans) */}
      <section>
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <BellRing size={20} className="text-[#FFD100]" /> Inbox & Connect
          </h2>
        </div>
        
        <div className="space-y-4">
          
          {/* Inbox 1: AI Chat (Roleplay) */}
          <div onClick={() => onNavigate('chatbot')} className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <div className="w-14 h-14 flex-none bg-[#00E5FF] rounded-2xl flex items-center justify-center border-4 border-black">
              <MomoMascot mood="happy" className="w-10 h-10" animated={false} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-white font-black text-base truncate flex items-center gap-1">
                  Momo <span className="bg-black text-[#00E5FF] text-[8px] px-1 rounded uppercase">AI</span>
                </h3>
                <span className="bg-[#FF426A] text-white text-[10px] font-black px-2 py-1 rounded-md border-2 border-black uppercase">Unread</span>
              </div>
              <p className="text-[#A1A1AA] font-bold text-xs truncate">嗨！你這個週末有空嗎？</p>
            </div>
          </div>

          {/* Inbox 2: Human Chat (Language Exchange) */}
          <div className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <div className="w-14 h-14 flex-none bg-[#FFD100] rounded-2xl flex items-center justify-center border-4 border-black overflow-hidden p-0.5">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Chen" alt="Chen" className="w-full h-full object-cover rounded-xl bg-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-white font-black text-base truncate flex items-center gap-1">
                  Chen Wei <span className="text-[12px]">🇹🇼</span>
                </h3>
              </div>
              <p className="text-[#A1A1AA] font-bold text-xs truncate">Haha that's correct! I can help you practice.</p>
            </div>
          </div>

          {/* Inbox 3: Location Ping (Meetups) */}
          <div onClick={() => onNavigate('map')} className="bg-[#2A2A3B] border-4 border-black shadow-[4px_4px_0_#000] rounded-[1.5rem] p-4 flex items-center gap-4 cursor-pointer hover:bg-[#323246] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <div className="w-14 h-14 flex-none bg-[#00FF87] rounded-2xl flex items-center justify-center border-4 border-black">
              <Navigation size={24} className="text-black" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-white font-black text-base truncate">Language Meetup</h3>
              </div>
              <p className="text-[#A1A1AA] font-bold text-xs truncate">Coffee shop exchange near you starting soon.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}