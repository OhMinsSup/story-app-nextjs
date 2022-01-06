'use strict';

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.', event);
  const data = event.data.json();
  console.log('[Service Worker] Push had this data: ', data);
  // const data = JSON.parse(event.data.text());
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/android-chrome-192x192.png',
    }),
  );
});

// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();
//   event.waitUntil(
//     clients
//       .matchAll({ type: 'window', includeUncontrolled: true })
//       .then(function (clientList) {
//         if (clientList.length > 0) {
//           let client = clientList[0];
//           for (let i = 0; i < clientList.length; i++) {
//             if (clientList[i].focused) {
//               client = clientList[i];
//             }
//           }
//           return client.focus();
//         }
//         return clients.openWindow('/');
//       }),
//   );
// });
