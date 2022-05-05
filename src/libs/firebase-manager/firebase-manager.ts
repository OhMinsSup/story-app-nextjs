import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
  deleteToken,
} from 'firebase/messaging';

import { FIREBASE_VAPID_KEY } from '@constants/env';
import { api } from '@api/module';
import { isFunction } from '@utils/assertion';
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';
import { isBrowser } from '@utils/utils';

import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import type { Messaging, Unsubscribe } from 'firebase/messaging';
import type { DeviceSchema } from '@api/schema/story-api';

const firebaseConfig = {
  apiKey: 'AIzaSyAcpUGHqIAup5_2iAogflpfmwNyoZSrfv4',
  authDomain: 'story-push-message.firebaseapp.com',
  projectId: 'story-push-message',
  storageBucket: 'story-push-message.appspot.com',
  messagingSenderId: '753509563937',
  appId: '1:753509563937:web:14b67d913f2947095d2d60',
  measurementId: 'G-N69G0M8781',
};

class FireBaseManager {
  // firebase app
  private _app: FirebaseApp | undefined;

  // firebase analytics
  private _analytics: Analytics | undefined;

  // firebase messaging
  private _messaging: Messaging | undefined;

  // 앱이 종료되면 이벤트를 제거합니다.
  private _unsubscribe: Unsubscribe | undefined;

  constructor() {
    this.initialize();
  }

  premission() {
    return new Promise<boolean>((resolve) => {
      if (isBrowser && 'Notification' in window) {
        Notification.requestPermission((status) => {
          if (status === 'granted') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  }

  setMessaging() {
    if (this._app) {
      this._messaging = getMessaging(this._app);
    }
  }

  setAnalytics() {
    if (this._app) {
      this._analytics = getAnalytics(this._app);
    }
  }

  get app(): FirebaseApp | undefined {
    return this._app;
  }

  get analytics(): Analytics | undefined {
    return this._analytics;
  }

  get messaging(): Messaging | undefined {
    return this._messaging;
  }

  /**
   * @description notification (firebase) 설정을 한다.
   * @date 2022-03-21
   * @author veloss
   */
  async initialize() {
    // 알림 권한 설정
    const hasPremeission = await this.premission();

    this._app = initializeApp(firebaseConfig);

    this._analytics = getAnalytics(this._app);

    // 현재 사용 할 수 있는지 체크
    const supported = await isSupported();

    if (!hasPremeission || !supported) return;

    this._messaging = getMessaging(this._app);

    return this;
  }

  /**
   * @description notification 토큰을 다시 재발급 받는 경우
   * @date 2022-03-21
   * @author veloss
   */
  async refreshMessaging() {
    // 알림 권한 설정
    const hasPremeission = await this.premission();

    // 현재 사용 할 수 있는지 체크
    const supported = await isSupported();

    if (!hasPremeission || !supported) return;

    if (!this._app) {
      const error = new Error('Firebase App is not initialized');
      throw error;
    }

    if (!this._messaging) {
      this._messaging = getMessaging(this._app);
    }

    this.forgroundMessaging(this._messaging);
    this.intializeMessaging(this._messaging);
  }

  /**
   * @description api 서버쪽에 push token 정보를 전송합니다.
   * @date 2022-03-21
   * @author veloss
   */
  async device(pushToken: string) {
    const { data } = await api.post<DeviceSchema>({
      url: API_ENDPOINTS.LOCAL.DEVICE.ROOT,
      body: {
        pushToken,
      },
    });

    if (!data.ok) return;
    switch (data.resultCode) {
      case RESULT_CODE.PUSH_TOKEN_EXPIRED: // 토큰이 만료된 경우
        if (this._messaging) {
          const isDeleted = await deleteToken(this._messaging);
          if (isDeleted) {
            await this.refreshMessaging();
          }
        }
        break;
      case RESULT_CODE.OK: // 정상적인 경우
      default:
        break;
    }
  }

  /**
   * @description 이미 사용중인 토큰이 존재하는 경우 해당 토큰을 사용 없는 경우 발급
   * @date 2022-03-21
   * @author veloss
   */
  async getPushToken(messaging: Messaging) {
    if (!messaging) return null;

    const pushToken = await getToken(messaging, {
      vapidKey: FIREBASE_VAPID_KEY,
    });

    if (!pushToken) return null;
    return pushToken;
  }

  /**
   * @description 메세지 등록
   * @date 2022-03-21
   * @author veloss
   */
  async intializeMessaging(messaging: Messaging) {
    const pushToken = await this.getPushToken(messaging);
    if (!pushToken) return;
    // 토큰을 서버로 보내고 필요한 경우 UI를 업데이트합니다.
    this.device(pushToken);
  }

  forgroundMessaging(messaging: Messaging) {
    if (this._unsubscribe && isFunction(this._unsubscribe)) {
      this._unsubscribe();
    }

    this._unsubscribe = onMessage(messaging, (payload) => {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistration().then(async function (reg) {
          if (reg) {
            const { notification } = payload;
            if (notification?.body && notification?.title) {
              await reg.showNotification(notification.title, {
                body: notification.body,
                icon:
                  (notification as any).icon ??
                  './images/android-chrome-192x192.png',
              });
            }
          }
        });
      }
    });
  }
}

let firebaseManager: FireBaseManager;

export async function hydrateFirebase() {
  if (firebaseManager && firebaseManager instanceof FireBaseManager) {
    return firebaseManager;
  }
  firebaseManager = new FireBaseManager();
  (window as any).firebaseManager = firebaseManager;
  return firebaseManager;
}

export function useFireBaseManager() {
  return firebaseManager;
}

export default FireBaseManager;
