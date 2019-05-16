export enum MessageType {
  JOINED = 'JOINED',
  LEFT = 'LEFT',
  RENAME = 'RENAME',
  MESSAGE = 'MESSAGE',
  GET_USER_LIST = 'GET_USER_LIST'
}

export enum ServerMessageType {
  CONNECT = 'CONNECT',
  USER_LIST = 'USER_LIST'
}

export interface User {
  username: string;
  avatar: string;
}

export interface MessageData {
  form: string;
  content: string;
  time: number;
}

export class Message {
  type: string;
  data: any;

  constructor(type: string, data?: any) {
    this.type = type;
    this.data = data;
  }
}
