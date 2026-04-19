const CACHE_NAME = 'solsnake-v1';
const urlsToCache = [
  '/solsnake-game/',
  '/solsnake-game/index.html',
  '/solsnake-game/manifest.json',
  '/solsnake-game/icon-72.png',
  '/solsnake-game/icon-96.png',
  '/solsnake-game/icon-128.png',
  '/solsnake-game/icon-144.png',
  '/solsnake-game/icon-152.png',
  '/solsnake-game/icon-192.png',
  '/solsnake-game/icon-384.png',
  '/solsnake-game/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
