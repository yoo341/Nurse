const V="nurse-v1",FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>{const n=fetch(e.request).then(res=>{if(res.ok&&e.request.url.startsWith(self.location.origin))caches.open(V).then(c=>c.put(e.request,res.clone()));return res}).catch(()=>r);return r||n}))});
