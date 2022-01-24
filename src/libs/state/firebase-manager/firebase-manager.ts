import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from 'firebase/messaging';

import { FIREBASE_VAPID_KEY } from '@constants/env';
import { api } from '@api/module';
import { API_ENDPOINTS, STORAGE_KEY } from '@constants/constant';
import { isBrowser } from '@utils/utils';
import { StoryStorage } from '@libs/storage';

import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import type { Messaging } from 'firebase/messaging';
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

  get app(): FirebaseApp | undefined {
    return this._app;
  }

  get analytics(): Analytics | undefined {
    return this._analytics;
  }

  get messaging(): Messaging | undefined {
    return this._messaging;
  }

  async initialize() {
    const hasPremeission = await this.premission();

    this._app = initializeApp(firebaseConfig);
    this._analytics = getAnalytics(this._app);

    const supported = await isSupported();

    if (!hasPremeission && !supported) return;

    this._messaging = getMessaging(this._app);

    onMessage(this._messaging, (payload) => {
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

    this.intializeMessaging(this._messaging);
  }

  async intializeMessaging(messaging: Messaging) {
    try {
      const data = await StoryStorage.getItem(STORAGE_KEY.PUSH_TOKEN_KEY);
      if (data && data.pushToken) {
        return;
      }

      const currentToken = await getToken(messaging, {
        vapidKey: FIREBASE_VAPID_KEY,
      });

      if (!currentToken) return;
      // 토큰을 서버로 보내고 필요한 경우 UI를 업데이트합니다.
      this.save(currentToken);
    } catch (error) {
      console.log(error);
    }
  }

  async save(pushToken: string) {
    const { data } = await api.post<DeviceSchema>({
      url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.TOKEN,
      body: {
        pushToken,
      },
    });

    if (!data.ok) return;
    const record = {
      deviceId: data.result.id,
      pushToken,
    };

    await StoryStorage.setItem(STORAGE_KEY.PUSH_TOKEN_KEY, record);
  }
}

export default FireBaseManager;
