const staticCacheName = 'static-cache-v16';
const assets = [
    '/',
    '/index.html',
    '/css/output.css',
    '/script/script.js',
    '/font/oswald-light.ttf',
    '/font/sarpanch-bold.ttf',
    '/sfx/click.wav',
    '/sfx/clickdown.wav',
    '/sfx/counterup.wav',
    '/sfx/counterdown.wav',
    '/sfx/warning.wav',
    '/sfx/key.wav',
];


// -----------------install event------------------
self.addEventListener('install', evt => {
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        cache.addAll(assets);                                 //add assets to static cache
      })
    );
});

// ----------------------activate event----------------------------
self.addEventListener('activate', evt => {
    evt.waitUntil(
      caches.keys().then(keys => {
        return Promise.all(keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
        );
      })
    );
  });

// --------------fetch event--------------
self.addEventListener('fetch', evt => {
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
    );
});