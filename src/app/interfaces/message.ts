
export enum Receive {
  CONNECT = 'CONNECT',
  USER_LIST = 'USER_LIST',
  MESSAGE = 'MESSAGE',
  JOINED = 'JOINED',
  LEFT = 'LEFT',
  RENAME = 'RENAME',
}

export enum Send {
  JOINED = 'JOINED',
  LEAVE = 'LEAVE',
  RENAME  = 'RENAME',
  MESSAGE = 'MESSAGE',
  GET_USER_LIST = 'GET_USER_LIST'
}

export type User = string;

export interface ChatMessage {
  form: User;
  content: string;
  time: number;
}

type DataType<T extends (Send | Receive)> = T extends Send ? MessageSendData[Send] : MessageReceiveData[Receive];

export interface MessageBody<T extends (Send | Receive)> {
  type: T;
  data: DataType<T>
}

export interface MessageReceiveData {
  [Receive.CONNECT]: never;
  [Receive.USER_LIST]: User[];
  [Receive.MESSAGE]: ChatMessage
  [Receive.JOINED]: User;
  [Receive.LEFT]: User;
  [Receive.RENAME]: {
    user: User;
    newName: User;
  };
}

export interface MessageSendData {
  [Send.MESSAGE]: ChatMessage;
  [Send.GET_USER_LIST]: never;
  [Send.JOINED]: User;
  [Send.LEAVE]: User;
  [Send.RENAME]: {
    user: User;
    newName: User;
  };
}
