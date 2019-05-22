
export enum Receive {
  CONNECT = 'CONNECT',
  USER_LIST = 'USER_LIST',
  MESSAGE = 'MESSAGE',
}

export enum Send {
  JOINED = 'JOINED',
  LEFT = 'LEFT',
  RENAME = 'RENAME',
  MESSAGE = 'MESSAGE',
  GET_USER_LIST = 'GET_USER_LIST'
}

export type User = string;

export interface ChatMessage {
  form: User;
  content: string;
  time: number;
}

export interface MessageReceiveData {
  [Receive.CONNECT]: never;
  [Receive.USER_LIST]: User[];
  [Receive.MESSAGE]: ChatMessage
}

export interface MessageSendData {
  [Send.MESSAGE]: ChatMessage;
  [Send.GET_USER_LIST]: never;
  [Send.JOINED]: User;
  [Send.LEFT]: User;
  [Send.RENAME]: {
    user: User;
    rename: User;
  };
}
