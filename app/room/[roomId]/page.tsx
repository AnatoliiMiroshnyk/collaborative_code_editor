'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRoomSync } from '@/hooks/useRoomSync';
import Editor from '@/components/Editor';
import Toolbar from '@/components/Toolbar';
import ChatSidebar from '@/components/ChatSidebar';
import { Language } from '@/types';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];
const NAMES = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Morgan', 'Casey', 'Riley'];

export default function RoomPage() {
  const params = useParams();
  const roomId = (params.roomId as string) || 'default-room';

  const [username, setUsername] = useState('');
  const [color, setColor] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    setUsername(NAMES[Math.floor(Math.random() * NAMES.length)] + Math.floor(Math.random() * 900 + 100));
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

  const { doc, provider, users, isConnected } = useRoomSync(roomId, username, color);

  if (!isJoined) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Join Coding Room
            </h1>
            <p className="text-sm text-slate-400">Room ID: <code className="text-slate-200 bg-slate-800 px-2 py-0.5 rounded">{roomId}</code></p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Your Display Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => setIsJoined(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition shadow-lg shadow-indigo-600/30"
            >
              Enter Room
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col overflow-hidden">
      <Toolbar
        roomId={roomId}
        language={language}
        setLanguage={setLanguage}
        isConnected={isConnected}
        userCount={users.length}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
      />
      {/* Добавляем относительное позиционирование для главного контейнера */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Добавляем плавный переход transition-all и динамический отступ справа pr-80, когда чат открыт */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isChatOpen ? 'mr-80' : 'mr-0'}`}>
          <Editor
            doc={doc}
            provider={provider}
            language={language}
            username={username}
            color={color}
          />
        </main>
        <ChatSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          users={users}
          doc={doc}
          provider={provider}
          username={username}
        />
      </div>
    </div>
  );
}
