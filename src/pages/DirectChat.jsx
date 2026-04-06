import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const STARTER_MESSAGES = {
  'david-wong': [
    { id: 'm1', sender: 'friend', text: 'Hey! Want to practice travel vocabulary tonight?' },
    { id: 'm2', sender: 'you', text: 'Sure, I am free after 8 PM.' }
  ],
  'chen-wei': [
    { id: 'm1', sender: 'friend', text: 'I can help you with tone pronunciation.' }
  ],
  nicho: [
    { id: 'm1', sender: 'friend', text: 'We can review unit 3 after class.' }
  ]
};

const FALLBACK_REPLY = [
  'Sounds good!',
  'Nice, let us practice that.',
  'Great idea. I am in!',
  'Cool, we can do that.'
];

export default function DirectChat({ onNavigate, lang, threadId }) {
  const { getChatThreadById, openChatThread, updateChatThreadPreview } = useAppContext();
  const thread = getChatThreadById(threadId);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(() => STARTER_MESSAGES[threadId] || []);

  useEffect(() => {
    if (threadId) {
      openChatThread(threadId);
      setMessages(STARTER_MESSAGES[threadId] || []);
    }
  }, [threadId, openChatThread]);

  const placeholder = useMemo(() => {
    if (!thread) return 'Type message...';
    return `Message ${thread.name}...`;
  }, [thread]);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text || !thread) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'you',
      text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    updateChatThreadPreview(thread.id, text);

    const randomReply = FALLBACK_REPLY[Math.floor(Math.random() * FALLBACK_REPLY.length)];
    const botMessage = {
      id: `f-${Date.now() + 1}`,
      sender: 'friend',
      text: randomReply
    };

    window.setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      updateChatThreadPreview(thread.id, randomReply);
    }, 400);
  };

  if (!thread) {
    return (
      <div className="h-full w-full bg-[#1E1E2A] flex items-center justify-center p-6">
        <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0_#000]">
          <p className="text-black font-black text-base mb-3">Chat thread not found.</p>
          <button
            onClick={() => onNavigate('chats')}
            className="h-10 px-4 rounded-xl bg-[#FFD100] border-4 border-black text-black font-black text-xs uppercase tracking-widest"
          >
            Back to Chats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#1E1E2A] flex flex-col relative overflow-hidden">
      <div className="p-4 pt-8 border-b-4 border-black flex items-center bg-[#2A2A3B] z-20 shadow-[0_4px_0_#000]">
        <button onClick={() => onNavigate('chats')} className="p-2 flex-none text-white transition-colors">
          <ChevronLeft size={32} strokeWidth={4} />
        </button>

        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${thread.name}`}
          alt={thread.name}
          className="w-12 h-12 rounded-xl border-4 border-black bg-white ml-2"
        />

        <div className="ml-3 min-w-0">
          <h3 className="text-white font-black text-xl leading-tight uppercase tracking-wider truncate">{thread.name}</h3>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: lang.secondaryColor }}>
            Online now
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-3 pb-44">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[86%] border-4 border-black rounded-[1.25rem] p-3 font-black text-sm leading-relaxed shadow-[4px_4px_0_#000] ${message.sender === 'you' ? 'bg-[#00FF87] text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[85px] w-full bg-[#2A2A3B] border-t-4 border-black p-4 z-10">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') sendMessage();
            }}
            placeholder={placeholder}
            className="flex-1 min-w-0 h-14 bg-white border-4 border-black rounded-2xl px-4 text-black font-black focus:outline-none shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)]"
          />
          <button
            onClick={sendMessage}
            className="w-14 h-14 flex-none rounded-2xl text-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            style={{ backgroundColor: lang.primaryColor }}
          >
            <Send size={22} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
