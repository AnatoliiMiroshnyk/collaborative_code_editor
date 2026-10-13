'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { Copy, Check, Terminal, Users, Wifi, WifiOff } from 'lucide-react';

interface ToolbarProps {
  roomId: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  isConnected: boolean;
  userCount: number;
  onToggleChat: () => void;
}

export default function Toolbar({
  roomId,
  language,
  setLanguage,
  isConnected,
  userCount,
  onToggleChat,
}: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between text-slate-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-6 h-6 text-indigo-500" />
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DevSync
          </span>
        </div>
        <div className="h-6 w-px bg-slate-800" />
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span>Room: <code className="text-slate-200 bg-slate-800 px-2 py-0.5 rounded">{roomId}</code></span>
          <button
            onClick={copyRoomLink}
            className="p-1.5 hover:bg-slate-800 rounded-md transition text-slate-400 hover:text-slate-200"
            title="Copy Room Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg text-xs">
          {isConnected ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-rose-400 font-medium">Connecting...</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          <span>{userCount} active</span>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
        </select>

        <button
          onClick={onToggleChat}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20"
        >
          Chat & Users
        </button>
      </div>
    </header>
  );
}
