self.importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js');
self.importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-messaging.js');

firebase.initializeApp({'messagingSenderId': '<@FIREBASE_MEASUREMENT_ID@>'});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  // @ts-ignore
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('push', event => {
  console.log(`Push received with data "${event.data.text()}"`);
  event.waitUntil(self.registration.showNotification("nice", {}));
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;

  if (action === 'dismiss') {
    notification.close();
  } else {
    // This handles both notification click and 'details' action,
    // because some platforms might not support actions.
    clients.openWindow(notification.data.href);
    notification.close();
  }
});
