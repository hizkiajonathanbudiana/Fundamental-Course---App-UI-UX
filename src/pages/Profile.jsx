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

import React, { useMemo, useState } from 'react';
import { Check, ChevronLeft, QrCode, Share2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AVATAR_SEEDS = ['chen-wei', 'sarah-k', 'kenji', 'luna', 'mika', 'anya', 'rika', 'soojin'];

export default function Profile({ onNavigate, lang }) {
  const { userProfile, updateUserProfile } = useAppContext();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || 'Liam A.');
  const [fullName, setFullName] = useState(userProfile?.fullName || 'Liam Anderson');
  const [avatarSeed, setAvatarSeed] = useState(userProfile?.avatarSeed || 'chen-wei');

  const profileId = useMemo(() => {
    const cleaned = (displayName || 'qiaoo').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    const fallback = userProfile?.userId?.split('-')?.[1] || '948271';
    return `${cleaned || 'QIAOO'}-${fallback}`;
  }, [displayName, userProfile?.userId]);

  const saveProfile = () => {
    updateUserProfile({
      displayName: displayName.trim() || 'Qiaoo User',
      fullName: fullName.trim() || displayName.trim() || 'Qiaoo User',
      avatarSeed,
      userId: profileId
    });
  };

  return (
    <div className="h-full w-full bg-[#1E1E2A] overflow-y-auto pb-32">
      <div className="p-4 pt-8 flex items-center bg-[#2A2A3B] border-b-4 border-black z-20 shadow-[0_4px_0_#000] sticky top-0">
        <button onClick={() => onNavigate('home')} className="p-2 flex-none text-white hover:text-[#00E5FF] transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>
        <h1 className="ml-2 text-2xl font-black text-white uppercase tracking-widest">Profile</h1>
      </div>

      <div className="bg-[#2A2A3B] p-6 pt-10 border-b-4 border-black flex flex-col items-center">
        <div className="w-[120px] h-[120px] flex-none border-4 border-black shadow-[6px_6px_0_#000] rounded-2xl p-1 mb-6 flex items-center justify-center overflow-hidden bg-white">
          <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(avatarSeed)}`} alt={displayName || 'Profile'} className="w-full h-full object-cover rounded-xl bg-white" />
        </div>
        <h2 className="text-3xl font-black text-white text-center px-4 break-words mb-3">{fullName || 'Liam Anderson'}</h2>
        <p className="text-black text-sm font-black border-2 border-black shadow-[2px_2px_0_#000] px-4 py-2 rounded-xl uppercase tracking-widest" style={{ backgroundColor: lang.primaryColor }}>
          ID: {profileId}
        </p>

        <div className="w-full mt-5 space-y-3">
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Display name"
            className="w-full h-12 rounded-xl border-4 border-black px-3 text-black font-black"
          />
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Full name"
            className="w-full h-12 rounded-xl border-4 border-black px-3 text-black font-black"
          />
        </div>

        <div className="w-full mt-4">
          <p className="text-white/80 text-[11px] font-black uppercase tracking-widest mb-2">Choose Avatar</p>
          <div className="grid grid-cols-4 gap-2">
            {AVATAR_SEEDS.map((seed) => (
              <button
                key={seed}
                onClick={() => setAvatarSeed(seed)}
                className={`h-14 rounded-xl border-4 border-black overflow-hidden bg-white ${avatarSeed === seed ? 'ring-2 ring-[#00FF87]' : ''}`}
              >
                <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}`} alt={seed} className="w-full h-full bg-white" />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="w-full mt-5 h-12 rounded-xl border-4 border-black bg-[#00FF87] text-black font-black uppercase tracking-widest shadow-[4px_4px_0_#000] flex items-center justify-center gap-2"
        >
          <Check size={18} strokeWidth={3} /> Save Profile
        </button>
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