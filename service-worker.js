self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('panic-app-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/panic.html',
          '/style.css',
          '/panic.js',
          '/manifest.json',
          '/icons/button.png',
          '/icons/button1.png' 
        ]);
      })
    );
    console.log('Service Worker Installed');
});

  
  // Service Worker - Serve Cached Resources
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  // Service Worker - Activate and Remove Old Caches
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['panic-app-v1'];
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    console.log('Service Worker Activated');
  });
  