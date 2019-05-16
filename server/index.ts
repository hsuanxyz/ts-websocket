import { WebSocketServer } from './server';

const port = process.env.PORT || 8080;
const ws = new WebSocketServer(+port);
ws.listen();
