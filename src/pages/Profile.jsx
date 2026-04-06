// import React from 'react';
// import { QrCode, Share2 } from 'lucide-react';

// export default function Profile() {
//   return (
//     <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32">
      
//       {/* Profile Header */}
//       <div className="bg-[#2A2A3B] p-6 pt-12 border-b-4 border-black flex flex-col items-center">
//         <div className="w-32 h-32 bg-[#00E5FF] border-4 border-black shadow-[6px_6px_0_#000] rounded-[2.5rem] p-1.5 mb-6 flex items-center justify-center overflow-hidden">
//           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Profile" className="w-full h-full object-cover rounded-2xl bg-white" />
//         </div>
//         <h2 className="text-3xl font-black text-white text-center px-4 break-words mb-3">Liam Anderson</h2>
//         <p className="text-black text-sm font-black bg-[#00FF87] border-2 border-black shadow-[2px_2px_0_#000] px-4 py-2 rounded-xl uppercase tracking-widest">ID: HB-948271</p>
//       </div>

//       {/* QR Code Card */}
//       <div className="p-6 mt-4">
//          <div className="bg-white border-4 border-black p-8 rounded-[2.5rem] text-center flex flex-col items-center shadow-[8px_8px_0_#000]">
//            <h3 className="text-black font-black text-2xl mb-8 uppercase tracking-widest">Add Friend</h3>
//            <div className="w-48 h-48 flex-none bg-[#E4E4E7] border-4 border-black rounded-[2rem] flex items-center justify-center mb-8">
//              <QrCode className="text-black" size={120} />
//            </div>
//            <button className="w-full bg-[#A25BFF] border-4 border-black text-white font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[6px_6px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-widest">
//               <Share2 size={24} strokeWidth={3} /> Share Link
//            </button>
//          </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { QrCode, Share2, ChevronLeft } from 'lucide-react';

export default function Profile({ onNavigate, lang }) {
  return (
    <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32">
      <div className="p-4 pt-8 flex items-center bg-[#2A2A3B] border-b-4 border-black z-20 shadow-[0_4px_0_#000] sticky top-0">
        <button onClick={() => onNavigate('home')} className="p-2 flex-none text-white hover:text-[#00E5FF] transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <h1 className="ml-2 text-2xl font-black text-white uppercase tracking-widest">Profile</h1>
      </div>

      <div className="bg-[#2A2A3B] p-6 pt-10 border-b-4 border-black flex flex-col items-center">
        <div className="w-[120px] h-[120px] flex-none border-4 border-black shadow-[6px_6px_0_#000] rounded-[2.5rem] p-1.5 mb-6 flex items-center justify-center overflow-hidden" style={{ backgroundColor: lang.secondaryColor }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" alt="Profile" className="w-full h-full object-cover rounded-[2rem] bg-white" />
        </div>
        <h2 className="text-3xl font-black text-white text-center px-4 break-words mb-3">Liam Anderson</h2>
        <p className="text-black text-sm font-black border-2 border-black shadow-[2px_2px_0_#000] px-4 py-2 rounded-xl uppercase tracking-widest" style={{ backgroundColor: lang.primaryColor }}>
          ID: HB-948271
        </p>
      </div>

      <div className="p-6 mt-4">
         <div className="bg-white border-4 border-black p-8 rounded-[2.5rem] text-center flex flex-col items-center shadow-[8px_8px_0_#000]">
           <h3 className="text-black font-black text-2xl mb-8 uppercase tracking-widest">Add Friend</h3>
           <div className="w-48 h-48 flex-none bg-[#E4E4E7] border-4 border-black rounded-[2rem] flex items-center justify-center mb-8"><QrCode className="text-black" size={120} /></div>
           <button className="w-full border-4 border-black text-black font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-2 shadow-[6px_6px_0_#000] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase tracking-widest" style={{ backgroundColor: lang.primaryColor }}>
              <Share2 size={24} strokeWidth={3} /> Share Link
           </button>
         </div>
      </div>
    </div>
  );
}