const CACHE_NAME = "version-1"; //ones reload it will save the data in the browser cache
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
}); //self is the sw itself

//Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(()=>{
      return fetch(event.request).catch(()=>caches.match('offline.html'))
    }
  ))
}); //self is the sw itself

//Activate the SW  remove the old one on the cache and update with the new ones/
self.addEventListener("activate", (event) => {
  const cacheWhiteList=[];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames)=>Promise.all(
      cacheNames.map((cachename)=>{
          if(!cacheWhiteList.includes(cachename)){
            return caches.delete(cachename)
          }
      })
    )

    )
  )
}); //self is the sw itself
