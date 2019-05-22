import { MessageSendData } from '../interfaces/message'

export type ArgumentsType<T> = T extends (...args: infer U) => void ? U : never;
export type SendArgumentsType<K extends keyof MessageSendData> = MessageSendData[K] extends never
  ? ArgumentsType<(type: K) => void>
  : ArgumentsType<(type: K, data: MessageSendData[K]) => void>;
