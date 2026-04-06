// import React from 'react';
// import { Search, Users, MessageCircle, Plane, MapPin, LayoutTemplate } from 'lucide-react';

// export default function Topics({ onNavigate }) {
//   const topics = [
//     { name: "Making Friends", icon: <Users size={32} className="text-black"/>, bg: "bg-[#00E5FF]" },
//     { name: "Conversation", icon: <MessageCircle size={32} className="text-black"/>, bg: "bg-[#FF426A]" },
//     { name: "Travel", icon: <Plane size={32} className="text-black"/>, bg: "bg-[#FFD100]" },
//     { name: "Flights", icon: <Plane size={32} className="transform -rotate-45 text-black"/>, bg: "bg-[#A25BFF]" },
//     { name: "On Tour", icon: <MapPin size={32} className="text-black"/>, bg: "bg-[#FFD100]" },
//     { name: "Signs", icon: <LayoutTemplate size={32} className="text-black"/>, bg: "bg-[#00FF87]" },
//   ];

//   return (
//     <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32 relative">
      
//       {/* Top Search Bar */}
//       <div className="p-5 pt-8 sticky top-0 z-20 bg-[#1E1E2A] flex items-center justify-center border-b-4 border-black">
//         <div className="flex-1 bg-[#2A2A3B] rounded-2xl py-3 px-4 flex items-center gap-3 border-4 border-black shadow-[4px_4px_0_#000] min-w-0">
//           <Search size={24} className="text-[#A1A1AA] flex-none" strokeWidth={3} />
//           <input type="text" placeholder="Filter Units..." className="bg-transparent w-full outline-none text-white font-black placeholder:text-[#7A7A9A]" />
//         </div>
//       </div>
      
//       <div className="p-6 pt-6">
//         {/* Unit Header */}
//         <div className="flex justify-between items-center mb-8">
//            <h2 className="text-white font-black text-3xl uppercase tracking-wider">Unit 1</h2>
//            <span className="bg-white text-black border-2 border-black shadow-[2px_2px_0_#000] px-3 py-1 rounded-xl font-black text-xs uppercase">Beginner</span>
//         </div>
        
//         {/* Winding Path Layout */}
//         <div className="flex flex-col items-center gap-8 relative">
//           {/* Garis Jalan (Path Line) di background */}
//           <div className="absolute top-0 bottom-0 w-6 bg-[#2A2A3B] border-x-4 border-black -z-10 rounded-full left-[48%]"></div>
          
//           {topics.map((topic, i) => {
//             // Logika kelok-kelok (kiri-kanan)
//             const shift = i % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
//             return (
//               <div key={i} onClick={() => onNavigate('subtopics', { topic: topic.name })} className={`flex flex-col items-center gap-2 cursor-pointer group ${shift}`}>
//                 <div className={`w-[90px] h-[90px] flex-none ${topic.bg} rounded-full flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all`}>
//                   {topic.icon}
//                 </div>
//                 <span className="text-sm text-center text-white font-black uppercase tracking-wide bg-[#2A2A3B] px-3 py-1 rounded-xl border-2 border-black mt-2">
//                   {topic.name}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Search, Users, MessageCircle, Plane, MapPin, LayoutTemplate } from 'lucide-react';

export default function Topics({ onNavigate, lang }) {
  const topics = [
    { name: "Basics", icon: <Users size={32} className="text-black"/> },
    { name: "Phrases", icon: <MessageCircle size={32} className="text-black"/> },
    { name: "Travel", icon: <Plane size={32} className="text-black"/> },
    { name: "Flights", icon: <Plane size={32} className="transform -rotate-45 text-black"/> },
    { name: "On Tour", icon: <MapPin size={32} className="text-black"/> },
    { name: "Signs", icon: <LayoutTemplate size={32} className="text-black"/> },
  ];

  return (
    <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32 relative">
      
      {/* Top Search Bar */}
      <div className="p-5 pt-10 sticky top-0 z-20 bg-[#1E1E2A] flex items-center justify-center border-b-4 border-black">
        <div className="flex-1 bg-[#2A2A3B] rounded-2xl py-3 px-4 flex items-center gap-3 border-4 border-black shadow-[4px_4px_0_#000] min-w-0 transition-all focus-within:translate-x-[4px] focus-within:translate-y-[4px] focus-within:shadow-none">
          <Search size={24} className="text-[#A1A1AA] flex-none" strokeWidth={3} />
          <input type="text" placeholder={`Search ${lang.name} units...`} className="bg-transparent w-full outline-none text-white font-black placeholder:text-[#7A7A9A]" />
        </div>
      </div>
      
      <div className="p-6 pt-6">
        {/* Unit Header */}
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-white font-black text-3xl uppercase tracking-wider" style={{ color: lang.primaryColor }}>Unit 1</h2>
           <span className="bg-white text-black border-4 border-black shadow-[4px_4px_0_#000] px-3 py-1 rounded-xl font-black text-xs uppercase">Beginner</span>
        </div>
        
        {/* Winding Path Layout */}
        <div className="flex flex-col items-center gap-8 relative">
          {/* Garis Jalan (Path Line) di background */}
          <div className="absolute top-0 bottom-0 w-6 bg-[#2A2A3B] border-x-4 border-black -z-10 rounded-full left-[48%]"></div>
          
          {topics.map((topic, i) => {
            // Logika kelok-kelok (kiri-kanan)
            const shift = i % 2 === 0 ? '-translate-x-12' : 'translate-x-12';
            // Bikin pola warna selang-seling berdasarkan bahasa
            const isPrimary = i % 2 === 0; 
            
            return (
              <div key={i} onClick={() => onNavigate('subtopics', { topic: topic.name })} className={`flex flex-col items-center gap-2 cursor-pointer group ${shift}`}>
                <div 
                  className={`w-[90px] h-[90px] flex-none rounded-full flex items-center justify-center border-4 border-black shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all`}
                  style={{ backgroundColor: isPrimary ? lang.primaryColor : lang.secondaryColor }}
                >
                  {topic.icon}
                </div>
                <span className="text-sm text-center text-white font-black uppercase tracking-wide bg-[#2A2A3B] px-3 py-1 rounded-xl border-4 border-black shadow-[4px_4px_0_#000] mt-2">
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