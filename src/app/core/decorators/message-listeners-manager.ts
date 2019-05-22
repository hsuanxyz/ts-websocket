import { Type } from '@angular/core'
import { Subject } from 'rxjs'

const MESSAGE_LISTENERS = '__MESSAGE_LISTENERS__'

export function MessageListenersManager<T>() {
  return function (cls: Type<T>) {
    let originalDestroy = cls.prototype.ngOnDestroy;

    let takeUntilDestroy$: Subject<void> = cls.hasOwnProperty(MESSAGE_LISTENERS) ?
      (cls as any)[MESSAGE_LISTENERS] :
      Object.defineProperty(cls, MESSAGE_LISTENERS, {value: new Subject()})[MESSAGE_LISTENERS];

    cls.prototype.ngOnDestroy = function (...args: any[]) {
      if (originalDestroy && typeof originalDestroy === 'function') {
        (originalDestroy as Function).apply(this, args);
      }
      if (takeUntilDestroy$) {
        takeUntilDestroy$.next()
        takeUntilDestroy$.complete();
      }
    }

    return cls
  }
}
