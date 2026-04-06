// DATABASE BAHASA (Buat yang dipelajari & Asal user)
export const LANGUAGES = {
  chinese: { id: 'chinese', name: 'Mandarin (TW)', flag: '🇹🇼', primary: '#00E5FF', secondary: '#FFD100', mascot: 'Momo' },
  spanish: { id: 'spanish', name: 'Spanish', flag: '🇪🇸', primary: '#FF5C00', secondary: '#FFD100', mascot: 'Toro' },
  japanese: { id: 'japanese', name: 'Japanese', flag: '🇯🇵', primary: '#FF426A', secondary: '#00FF87', mascot: 'Kiko' },
  korean: { id: 'korean', name: 'Korean', flag: '🇰🇷', primary: '#48CAE4', secondary: '#FF426A', mascot: 'Hori' },
  russian: { id: 'russian', name: 'Russian', flag: '🇷🇺', primary: '#005EBC', secondary: '#FFFFFF', mascot: 'Misha' },
  english: { id: 'english', name: 'English', flag: '🇺🇸', primary: '#A25BFF', secondary: '#00FF87', mascot: 'Sam' },
  indonesian: { id: 'indonesian', name: 'Indonesian', flag: '🇮🇩', primary: '#00C46A', secondary: '#FFD100', mascot: 'Rima' }
};

// DATABASE UI APP (Biar bahasanya ganti-ganti)
export const UI_STRINGS = {
  english: {
    home: "Home", radar: "Map Radar", scan: "Scan Text", dict: "Dictionary",
    daily: "Daily Lesson", ready: "Ready to learn?", alerts: "Inbox & Alerts",
    settings: "Settings"
  },
  indonesian: {
    home: "Beranda", radar: "Peta Radar", scan: "Pindai Teks", dict: "Kamus",
    daily: "Pelajaran Harian", ready: "Siap belajar?", alerts: "Pesan & Notif",
    settings: "Pengaturan"
  },
  spanish: {
    home: "Inicio", radar: "Mapa Radar", scan: "Escanear", dict: "Diccionario",
    daily: "Lección Diaria", ready: "¿Listo para aprender?", alerts: "Mensajes",
    settings: "Ajustes"
  }
};