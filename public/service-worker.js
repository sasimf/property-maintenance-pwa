self.addEventListener('install', e=>{self.skipWaiting();});
self.addEventListener('activate', e=>{console.log('Activated');});
self.addEventListener('fetch', e=>{e.respondWith(fetch(e.request));});
