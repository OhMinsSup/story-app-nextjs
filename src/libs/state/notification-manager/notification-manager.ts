import uniqueId from 'lodash-es/uniqueId';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { isBrowser } from '@utils/utils';

class NotificationManager {
  private _id: string;

  private _token?: string;

  private _isSubscribed: boolean = false;

  private _subscription?: PushSubscription;

  private _registration?: ServiceWorkerRegistration;

  public ready: Promise<boolean>;

  constructor() {
    this._id = uniqueId('notification-manager-');

    this.ready = new Promise((resolve) => {
      if (isBrowser && 'Notification' in window) {
        Notification.requestPermission((status) => {
          if (status === 'granted') {
            api
              .getResponse<string>({
                url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.TOKEN,
              })
              .then(async (res) => {
                const { ok, result } = res.data;
                if (!ok) return;

                this._token = result;

                if (
                  isBrowser &&
                  'serviceWorker' in navigator &&
                  typeof window.workbox !== 'undefined'
                ) {
                  const reg = await navigator.serviceWorker.ready;
                  // getSubscription()은 구독이 있는 경우 현재 구독으로 확인되는
                  // 프라미스를 반환하고 그렇지 않으면 null을 반환하는 메서드
                  const sub = await reg.pushManager.getSubscription();
                  this._isSubscribed = !(sub === null);
                  // 사용자가 이미 구독한 상태인지 확인하고 몇 가지 상태를 설정
                  if (sub) {
                    console.info(
                      '[NotificationManager] Subscription is already exist.',
                    );
                    this._subscription = sub;
                  } else {
                    console.info(
                      '[NotificationManager] subscription is not exist',
                    );
                  }
                  // 서비스 워크 등록
                  this._registration = reg;
                }

                resolve(true);
              })
              .catch((e) => {
                console.error(e);
                resolve(false);
              });
          }
        });
      }
    });
  }

  get id(): string {
    return this._id;
  }

  get token(): string | undefined {
    return this._token;
  }

  get isSubscribed(): boolean {
    return this._isSubscribed;
  }

  get subscription(): PushSubscription | undefined {
    return this._subscription;
  }

  get registration(): ServiceWorkerRegistration | undefined {
    return this._registration;
  }

  premission = () => {
    return new Promise<PushPermissionState | 'default'>((resolve) => {
      if (isBrowser && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager
            .permissionState({ userVisibleOnly: true })
            .then((permissionState) => {
              resolve(permissionState);
            });
        });
      } else {
        resolve('default');
      }
    });
  };

  refreshNotification = async () => {
    const { data } = await api.getResponse<string>({
      url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.TOKEN,
    });

    const { result } = data;
    if (!result) return;

    // 토큰이 다르면 새로 설정
    if (this._token !== result) {
      this._token = result;

      const sub = await this._registration?.pushManager.getSubscription();
      // 구독이 있는 경우 구독 해제
      if (sub) {
        await this.unsubscribe();
      }
      // 구독이 없는 경우 구독 신청
      await this.subscribe();
    }
  };

  unsubscribe = async () => {
    try {
      if (!this._token) {
        const error = new Error();
        error.name = 'NotificationManagerError';
        error.message = '[NotificationManager] token is not exist';
        throw error;
      }

      if (!this._subscription) {
        const error = new Error();
        error.name = 'NotificationManagerError';
        error.message = '[NotificationManager] subscription is not exist';
        throw error;
      }

      await this._subscription.unsubscribe();

      this._isSubscribed = false;
      this._subscription = undefined;
      console.info('[NotificationManager] unsubscribe success');
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'NotificationManagerError') {
          this._isSubscribed = false;
        }
      }
      console.error(e);
    }
  };

  subscribe = async () => {
    try {
      if (!this._token) {
        const error = new Error();
        error.name = 'NotificationManagerError';
        error.message = '[NotificationManager] token is not exist';
        throw error;
      }

      if (!this._registration) {
        const error = new Error();
        error.name = 'NotificationManagerError';
        error.message = '[NotificationManager] registration is not exist';
        throw error;
      }

      const sub = await this._registration.pushManager.subscribe({
        // 매개변수는 기본적으로 푸시가 전송될 때마다 알림을 표시하도록 허용하는 것입니다.
        // 작성 시점에서는 이 값이 필수이고 true여야 합니다.
        userVisibleOnly: true,
        // 브라우저가 PushSubscription 생성을 위한 세부 정보를 얻기 위해 푸시 서비스로 네트워크 요청을 보냈습니다.
        applicationServerKey: this.base64ToUint8Array(this._token),
      });

      this._subscription = sub;
      this._isSubscribed = true;
      console.info('[NotificationManager] subscribe success', sub);
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'NotificationManagerError') {
          this._isSubscribed = false;
        }
      }
      console.error(e);
    }
  };

  base64ToUint8Array = (base64: string) => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  notification = async (title: string, message: string, linkUrl?: string) => {
    try {
      await this.refreshNotification();

      await api.postResponse({
        url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.PUSH,
        body: {
          title,
          message,
          linkUrl,
          subscription: JSON.stringify(this._subscription),
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'NotificationManagerError') {
          this._isSubscribed = false;
        }
      }
      console.error(e);
    }
  };
}

export default NotificationManager;
