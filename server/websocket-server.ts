import { WebSocketServer } from 'ws';
import * as http from 'http';
// @ts-ignore
import { setupWSConnection } from 'y-websocket/bin/utils';

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Yjs WebSocket Server is running\n');
});

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: true });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

const PORT = process.env.PORT || 1234;
server.listen(PORT, () => {
  console.log(`[WebSocket Server] running on port ${PORT}`);
});
