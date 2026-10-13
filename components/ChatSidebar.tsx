'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/types';
import Avatars from './Avatars';
import { X, Send } from 'lucide-react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  doc: Y.Doc | null;
  provider: WebsocketProvider | null;
  username: string;
}

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

export default function ChatSidebar({
  isOpen,
  onClose,
  users, 
  provider,
  doc,
  username,
}: ChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!doc) return;
    const yarray = doc.getArray<Message>('chat-messages');

    const observer = () => {
      setMessages(yarray.toArray());
    };

    yarray.observe(observer);
    setMessages(yarray.toArray());

    return () => {
      yarray.unobserve(observer);
    };
  }, [doc]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !doc) return;

    const yarray = doc.getArray<Message>('chat-messages');
    const newMessage: Message = {
      sender: username,
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    yarray.push([newMessage]);
    setInput('');
  };

  //if (!isOpen) return null;

  return (
    <aside 
      className={`fixed top-16 right-0 z-40 w-80 h-[calc(100vh-4rem)] border-l border-slate-800 bg-slate-900 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="font-semibold text-slate-200">Room Info & Chat</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 border-b border-slate-800">
        <Avatars users={users} />
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Live Chat</h3>
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500 italic">No messages yet. Say hello!</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-indigo-400 text-xs">{msg.sender}</span>
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
              </div>
              <p className="text-slate-300 text-xs break-words">{msg.text}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 border-t border-slate-800 flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
}
