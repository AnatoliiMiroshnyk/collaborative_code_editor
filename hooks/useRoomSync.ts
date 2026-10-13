'use client';

import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { User } from '@/types';

export function useRoomSync(roomId: string, username: string, color: string) {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1234',
      roomId,
      ydoc
    );

    wsProvider.on('status', (event: { status: string }) => {
      setIsConnected(event.status === 'connected');
    });

    const awareness = wsProvider.awareness;
    awareness.setLocalStateField('user', {
      name: username,
      color: color,
    });

    const handleAwarenessChange = () => {
      const states = awareness.getStates();
      const activeUsers: User[] = [];
      states.forEach((state, clientId) => {
        if (state.user) {
          activeUsers.push({
            clientId,
            name: state.user.name,
            color: state.user.color,
          });
        }
      });
      setUsers(activeUsers);
    };

    awareness.on('change', handleAwarenessChange);

    setDoc(ydoc);
    setProvider(wsProvider);

    return () => {
      awareness.off('change', handleAwarenessChange);
      wsProvider.destroy();
      ydoc.destroy();
    };
  }, [roomId, username, color]);

  return { doc, provider, users, isConnected };
}
