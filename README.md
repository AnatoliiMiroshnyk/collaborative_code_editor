<div align="center">
  <h1 align="center">CollabCode Studio</h1>
  <p align="center">
    <strong>A lightning-fast, production-grade real-time collaborative code editor built for modern engineering teams.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/WebSocket-Realtime-orange?style=flat-square&logo=socket.io" alt="WebSocket">
    <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
  </p>
</div>

---

## 🚀 Overview

**CollabCode Studio** is an advanced web-based collaborative code editor engineered to provide seamless, low-latency multi-user synchronization. Designed with a modular architecture, it combines a robust Next.js frontend with a custom WebSocket signaling and state server to deliver real-time cursor presence, concurrent text editing, and instant room management.

---

## ✨ Key Features

- **Real-Time Multi-User Synchronization:** Instantly broadcast code modifications across active session participants with minimal latency.
- **Live Presence & Cursors:** Track team members' active edits and cursor positions in real-time.
- **Modular Sidebar & Tooling:** Dedicated `ChatSidebar` for team coordination and contextual discussions right alongside the workspace.
- **Advanced Editor Interface:** Feature-rich code editor with syntax highlighting, line numbering, and customizable themes.
- **Zero-Config Room Management:** Easily spin up secure collaborative rooms and share session URLs instantly.

---

## 🛠️ Tech Stack

- **Frontend & Routing:** [Next.js 14](https://nextjs.org/) (App Router), React 18, TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Real-Time Transport:** WebSockets (`ws`) & Custom Hooks (`useRoomSync`)
- **State Management:** React Hooks & Event-driven synchronization pipes

---

## 📁 Project Structure

```text
collaborative-code-editor/
├── app/
│   ├── layout.tsx         # Root layout with Tailwind provider & font config
│   ├── page.tsx           # Landing / Room creation dashboard
│   └── room/
│       └── [id]/          # Dynamic collaborative session workspace
│           └── page.tsx
├── components/
│   ├── ChatSidebar.tsx    # Real-time chat & participant side panel
│   ├── Editor.tsx         # Core code editor canvas & binding interface
│   └── Toolbar.tsx        # Session controls, sharing, and status indicators
├── hooks/
│   └── useRoomSync.ts     # WebSocket connection & state synchronization hook
├── server/
│   └── ws-server.js       # Standalone WebSocket broadcast & room management server
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Getting Started

### Prerequisites
Ensure you have Node.js (v18+ recommended) installed on your system.

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/collaborative-code-editor.git
   cd collaborative-code-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the real-time WebSocket server:
   ```bash
   node server/ws-server.js
   ```

4. In a separate terminal window, start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to create or join a collaborative room!

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory if you need to configure custom WebSocket ports or production endpoints:

```env
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for bug reports and feature requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).