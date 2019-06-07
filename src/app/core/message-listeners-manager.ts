import { Subject } from 'rxjs';
import { MessageService } from '../services/message.service';

export class MessageListenersManager {
  // tslint:disable-next-line
  static __messageListeners__: Function[] = [];
  // tslint:disable-next-line
  readonly __messageListenersTakeUntilDestroy$__ = new Subject<void>();

  constructor(public messageService: MessageService) {
    while (MessageListenersManager.__messageListeners__.length > 0) {
      const fun = MessageListenersManager.__messageListeners__.pop();
      fun.apply(this);
    }
  }

  // tslint:disable-next-line
  ngOnDestroy(): void {
    this.__messageListenersTakeUntilDestroy$__.next();
    this.__messageListenersTakeUntilDestroy$__.complete();
  }
}
