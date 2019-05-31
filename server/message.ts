export enum MessageType {
  JOINED = 'JOINED',
  LEFT = 'LEFT',
  RENAME = 'RENAME',
  MESSAGE = 'MESSAGE',
  GET_USER_LIST = 'GET_USER_LIST',
  CONNECT = 'CONNECT',
  USER_LIST = 'USER_LIST'
}

export class Message {
  type: string;
  data: any;

  constructor(type: MessageType, data?: any) {
    this.type = type;
    this.data = data;
  }
}
