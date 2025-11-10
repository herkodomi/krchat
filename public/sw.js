const cacheName = "v1";
async function impl(e) {
    let cache = await caches.open(cacheName); // Cache megnyitása, async
    let cacheResponse = await cache.match(e.request); // Lookup
    if (cacheResponse) // Ha megvan
        return cacheResponse // Visszadjuk
    else {
        let networkResponse = await fetch(e.request); // Ha nincs meg, akkor elindítjuk a tényleges hálózati lekérdezést
        cache.put(e.request, networkResponse.clone()) // Eltároljuk
        return networkResponse; // Visszadjuk
    }
}

self.addEventListener("fetch", e => e.respondWith(impl(e))); // Eseményre feliratkozás

async function push(e) {
    let message = e.data?.text();
    if(message != null) {
        self.registration.showNotification("Chat Notification", {body: message, icon: 'icon.png'});
        e.waitUntil(Promise.resolve());
    }
}

self.addEventListener("push", e => push(e));