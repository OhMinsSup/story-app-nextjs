'use strict';

self.addEventListener('push', function (event) {
  try {
    console.log('[Service Worker] Push had this data: ', event.data);
    const data = event.data?.json() ?? event.data?.text();
    if (!data) {
      const error = new Error();
      error.name = 'InvalidData';
      error.message = 'No data in push notification';
      throw error;
    }
    event.waitUntil(
      registration.showNotification(data.title, {
        body: data.message,
        data: data,
        badge: '/images/android-chrome-192x192.png',
        icon: '/images/android-chrome-192x192.png',
      }),
    );
  } catch (error) {
    event.waitUntil(
      registration.showNotification('알림', {
        body: '알림 메세지 발송 실패',
        badge: '/images/android-chrome-192x192.png',
        icon: '/images/android-chrome-192x192.png',
      }),
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow('/');
      }),
  );
});
