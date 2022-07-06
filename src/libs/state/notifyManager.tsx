import { scheduleMicrotask } from '@libs/browser-utils';
import { unstable_batchedUpdates } from '@libs/react-utils';
import { isBrowser } from '@utils/utils';

type NotifyCallback = () => void;

type NotifyCallbackData = {
  type: 'SESSION';
  payload: unknown;
};

type NotifyFunction = (callback: () => void | NotifyCallbackData) => void;

type BatchNotifyFunction = (callback: () => void) => void;

export const NOFIFY_DATA = {
  SESSION: (error: unknown) => {
    return {
      type: 'SESSION',
      payload: error,
    };
  },
};

export class NotifyManager {
  private queue: NotifyCallback[];
  private transactions: number;
  private notifyFn: NotifyFunction;
  private batchNotifyFn: BatchNotifyFunction;

  constructor() {
    this.queue = [];
    this.transactions = 0;

    this.notifyFn = (callback: () => void) => {
      callback();
    };

    this.batchNotifyFn = (callback: () => void) => {
      callback();
    };
  }

  batch<T>(callback: () => T): T {
    let result;
    this.transactions++;
    try {
      result = callback();
    } finally {
      this.transactions--;
      if (!this.transactions) {
        this.flush();
      }
    }
    return result;
  }

  schedule(callback: NotifyCallback): void {
    if (this.transactions) {
      this.queue.push(callback);
    } else {
      scheduleMicrotask(() => {
        return this.notifyFn(callback);
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  batchCalls<T extends Function>(callback: T): T {
    return ((...args: any[]) => {
      this.schedule(() => {
        callback(...args);
      });
    }) as any;
  }

  flush(): void {
    const queue = this.queue;
    this.queue = [];
    if (queue.length) {
      scheduleMicrotask(() => {
        this.batchNotifyFn(() => {
          queue.forEach((callback) => {
            return this.notifyFn(callback);
          });
        });
      });
    }
  }

  setNotifyFunction(fn: NotifyFunction) {
    this.notifyFn = fn;
  }

  setBatchNotifyFunction(fn: BatchNotifyFunction) {
    this.batchNotifyFn = fn;
  }
}

export const notifyManager = new NotifyManager();

if (isBrowser && notifyManager) {
  window.notifyManager = notifyManager;
  notifyManager.setBatchNotifyFunction(unstable_batchedUpdates);
}

export function useNotfiyManager() {
  return notifyManager;
}
