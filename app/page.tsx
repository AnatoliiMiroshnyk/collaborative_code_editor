'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Code2, Cpu, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [roomInput, setRoomInput] = useState('');

  const createRoom = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    router.push(`/room/${randomId}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomInput.trim()) return;
    router.push(`/room/${roomInput.trim()}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-8 md:p-16">
      <nav className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <Terminal className="w-8 h-8 text-indigo-500" />
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DevSync
          </span>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
          Real-Time Collaborative Code Editor
        </div>
      </nav>

      <div className="max-w-4xl mx-auto w-full text-center space-y-8 my-auto">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Code together, <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">instantly.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A lightning-fast, CRDT-powered collaborative code editor built with Next.js, Monaco, and Yjs. Zero latency conflicts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={createRoom}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2"
          >
            <span>Create New Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <form onSubmit={joinRoom} className="w-full sm:w-auto flex space-x-2">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-indigo-500 w-full"
            />
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-3 rounded-xl transition border border-slate-700 text-sm whitespace-nowrap"
            >
              Join
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Code2 className="w-6 h-6 text-indigo-400" />
            <h2 className="font-semibold text-slate-200">Monaco Engine</h2>
            <p className="text-xs text-slate-400">Powered by the exact same editor core as VS Code with full syntax highlighting.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="font-semibold text-slate-200">Yjs CRDTs</h2>
            <p className="text-xs text-slate-400">Conflict-free state synchronization ensures seamless concurrent multi-user editing.</p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-2">
            <Terminal className="w-6 h-6 text-emerald-400" />
            <h2 className="font-semibold text-slate-200">Real-Time Chat</h2>
            <p className="text-xs text-slate-400">Integrated WebSocket chat and live user presence indicators in every room.</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-500 max-w-6xl mx-auto w-full pt-8 border-t border-slate-900">
        DevSync Collaborative Code Editor • Built for Professional Portfolios
      </footer>
    </main>
  );
}
