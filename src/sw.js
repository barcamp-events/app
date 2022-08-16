importScripts('workbox-v4.3.1/workbox-sw.js')

/*
  This is our code to handle push events.
*/
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`, event.data.json().notification);
  const notif = event.data.json().notification;
  const data = event.data.json().data;

  console.log(notif.data);

  const title = notif.title;
  const options = {
    body: notif.body,
    icon: notif.image,
    badge: notif.image,
    image: notif.image,
    data: data
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received. event:%s', event);

  if (clients.openWindow && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
})


self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
