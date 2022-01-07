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
            const sub = await reg.pushManager.getSubscription();
            if (sub) {
              console.warn(
                '[NotificationManager] Subscription is already exist.',
              );
              const { expirationTime } = sub.toJSON();
              if (
                expirationTime &&
                Date.now() > expirationTime - 5 * 60 * 1000
              ) {
                this._subscription = sub;
                this._isSubscribed = true;
                console.warn('[NotificationManager] subscription expired');
              }
            } else {
              console.warn('[NotificationManager] subscription is not exist');
            }
            this._registration = reg;
          }

          resolve(true);
        })
        .catch((e) => {
          console.error(e);
          resolve(false);
        });
    });
  }

  unsubscribe = async () => {
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
    console.warn('[NotificationManager] unsubscribe success');
  };

  subscribe = async () => {
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
    console.warn('[NotificationManager] subscribe success', sub);
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

  notification = async () => {
    if (!this._subscription) {
      const error = new Error();
      error.name = 'NotificationManagerError';
      error.message = '[NotificationManager] subscription is not exist';
      throw error;
    }

    await api.postResponse({
      url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.PUSH,
      body: {
        title: '알림',
        message: '알림 메시지',
        subscription: JSON.stringify(this._subscription),
      },
    });
  };
}

export default NotificationManager;
