self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('cache-POMO')
            .then(function(cache) {
                return cache.addAll(
                    [
                        '/main.css',
                        '/index.html',
                        '/main.js'
                    ]
                );
            })
            .catch(function(error) { console.log("ERROR CACHE")})
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});