import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Message, MessageType } from './message';

export class WebSocketServer {
  port: number;
  app: express.Express;
  server: http.Server;
  wsServer: WebSocket.Server;
  userSet = new Set<string>();

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
        const messageJSON = JSON.parse(message) as Message;
        switch (messageJSON.type) {
          case MessageType.JOINED:
            this.addUser(messageJSON.data);
            break;
          case MessageType.LEFT:
            this.removeUser(messageJSON.data);
            break;
          case MessageType.RENAME:
            this.removeUser(messageJSON.data.user);
            this.addUser(messageJSON.data.newName);
            break;
          case MessageType.GET_USER_LIST:
            this.send(ws, new Message(MessageType.USER_LIST, this.getUsers()));
        }
        if (messageJSON.type !== MessageType.GET_USER_LIST) {
          this.broadcastMessage(ws, message);
        }
      });
      this.send(ws, new Message(MessageType.CONNECT));
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

  removeUser(username: string) {
    this.userSet.delete(username);
  }

  addUser(username: string) {
    this.userSet.add(username);
  }

  getUsers(): string[] {
    return Array.from(this.userSet);
  }
}
