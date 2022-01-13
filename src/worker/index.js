'use strict';

self.addEventListener('push', function (event) {
  let result = event.data?.json();
  if (Object.keys(result).length === 0) {
    result = event.data?.text();
  }

  console.log('[Service Worker] Push had this data: ', result);
  if (!result) {
    const error = new Error();
    error.name = 'InvalidData';
    error.message = 'No data in push notification';
    throw error;
  }

  const message = typeof result === 'string' ? result : result.message;
  const title = typeof result === 'string' ? '알림' : result.title;

  event.waitUntil(
    registration.showNotification(title, {
      body: message,
      data: result,
      badge: '/images/android-chrome-192x192.png',
      icon: '/images/android-chrome-192x192.png',
    }),
  );
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
