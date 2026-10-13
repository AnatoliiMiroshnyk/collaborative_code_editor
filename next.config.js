import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Принудительно связываем старый путь, который ищет y-monaco,
    // с реальным файлом инициализации в новой версии monaco-editor
    config.resolve.alias['monaco-editor/esm/vs/editor/editor.api.js'] = path.resolve(
      __dirname,
      'node_modules/monaco-editor/esm/vs/editor/editor.api.js'
    );
    
    return config;
  },
};

export default nextConfig;