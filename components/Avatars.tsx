'use client';

import React from 'react';
import { User } from '@/types';

interface AvatarsProps {
  users: User[];
}

export default function Avatars({ users }: AvatarsProps) {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Collaborators</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.clientId}
            className="flex items-center space-x-3 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50"
          >
            <div
              className="w-3 h-3 rounded-full shadow-sm"
              style={{ backgroundColor: user.color }}
            />
            <span className="text-sm font-medium text-slate-200">{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
