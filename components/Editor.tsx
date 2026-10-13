'use client';

import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { Language } from '@/types';

interface EditorProps {
  doc: Y.Doc | null;
  provider: WebsocketProvider | null;
  language: Language;
  username: string;
  color: string;
}

export default function Editor({ doc, provider, language, username, color }: EditorProps) {
  const editorRef = useRef<any>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  useEffect(() => {
    if (!isEditorReady || !doc || !provider || !editorRef.current) return;

    const type = doc.getText('monaco');
    const editor = editorRef.current;
    const model = editor.getModel();

    if (!model) return;

    bindingRef.current = new MonacoBinding(
      type,
      model,
      new Set([editor]),
      provider.awareness
    );

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
    };
  }, [isEditorReady, doc, provider]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme="vs-dark"
        onMount={handleEditorMount}
        options={{
          automaticLayout: true,
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}
