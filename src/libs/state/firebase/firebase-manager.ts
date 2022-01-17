import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';

import { FIREBASE_VAPID_KEY } from '@constants/env';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { isBrowser } from '@utils/utils';

import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import type { Messaging } from 'firebase/messaging';

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
    this._app = initializeApp(firebaseConfig);
    this._analytics = getAnalytics(this._app);
    this._messaging = getMessaging(this._app);

    this.intializeMessaging(this._messaging);
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

  async intializeMessaging(messaging: Messaging) {
    try {
      const hasPremeission = await this.premission();
      if (!hasPremeission) return;

      const currentToken = await getToken(messaging, {
        vapidKey: FIREBASE_VAPID_KEY,
      });

      if (!currentToken) return;
      // 토큰을 서버로 보내고 필요한 경우 UI를 업데이트합니다.
      this.savePushToken(currentToken);
    } catch (error) {
      console.log(error);
    }
  }

  async savePushToken(pushToken: string) {
    try {
      const { data } = await api.postResponse({
        url: API_ENDPOINTS.LOCAL.NOTIFICATIONS.TOKEN,
        body: {
          pushToken,
        },
      });

      if (data.ok) {
        return;
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}

export default FireBaseManager;
