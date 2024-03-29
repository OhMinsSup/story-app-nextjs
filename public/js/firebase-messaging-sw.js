'use strict';
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAcpUGHqIAup5_2iAogflpfmwNyoZSrfv4',
    authDomain: 'story-push-message.firebaseapp.com',
    projectId: 'story-push-message',
    storageBucket: 'story-push-message.appspot.com',
    messagingSenderId: '753509563937',
    appId: '1:753509563937:web:14b67d913f2947095d2d60',
    measurementId: 'G-N69G0M8781',
  });
}

firebase.messaging();

//background notifications will be received here
firebase.messaging().onBackgroundMessage(async (message) => {
  if (Notification.permission === 'granted') {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistration().then(async function (reg) {
        if (reg) {
          await reg.showNotification(message.notification.title, {
            body: message.notification.body,
            icon: message.notification.icon,
          });
        }
      });
    }
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
