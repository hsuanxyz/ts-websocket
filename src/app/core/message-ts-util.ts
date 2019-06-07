import { MessageReceiveData, MessageSendData } from '../interfaces/message';

export type ArgumentsType<T> = T extends (...args: infer U) => void ? U : never;

export type SendArgumentsType<T extends keyof MessageSendData> =
  MessageSendData[T] extends never
  ? ArgumentsType<(type: T) => void>
  : ArgumentsType<(type: T, data: MessageSendData[T]) => void>;

export type ReceiveArgumentsType<
  T extends keyof MessageReceiveData
  > = MessageReceiveData[T] extends undefined
  ? () => void
  : (data?: MessageReceiveData[T]) => void;
