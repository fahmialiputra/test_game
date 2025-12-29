const CACHE_NAME = 'sadiq-timer-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './sadiq.png',
  'https://cdn.tailwindcss.com' // Cache CDN Tailwind agar UI tetap jalan offline
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});