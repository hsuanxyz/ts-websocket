 import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Message, ServerMessageType } from './message';

export class WebSocketServer {
  port: number;
  app: express.Express;
  server: http.Server;
  wsServer: WebSocket.Server;
  constructor(port = 8080) {
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
    this.wsServer =  new WebSocket.Server({ server: this.server, path: '/ws' });
  }

  listen(): void  {
    this.server.listen(this.port, () => {
      console.log(`WebSocket Server is listening on localhost:${this.port}/ws`);
    });

    this.wsServer.on('connection', ws => {
      ws.on('message', (message: string) => {
        this.broadcastMessage(ws, message);
      });
      this.send(ws, new Message(ServerMessageType.CONNECT));
    });
  }

  broadcastMessage(ws: WebSocket, message: string) {
    try {
      this.wsServer.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          this.send(ws, JSON.parse(message));
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  send(ws: WebSocket, message: Message): void {
    ws.send(JSON.stringify(message));
  }
}
