/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const PRECACHE = 'precache-v0';
const RUNTIME = 'runtime';
const DEBUG = false

function debug() {
  if(DEBUG){
    console.log.apply(console, arguments)
  }
}

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  './',
  'index.html',
  'index.css',
  'index.js'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

const CACHE_TIMEOUT = 2000
// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(tryRequestWithTimeout(event.request, CACHE_TIMEOUT))
  }
});

function tryRequestWithTimeout (request, timeout) {
  // clone the request before it is read, because it can only be read once
  var cachePutRequest = request.clone()
  var cacheGetRequest = request.clone()
  var isResolved = false

  return new Promise((oldResolve, oldReject) => {
    const resolve = (val) => {
      if(!isResolved){
        isResolved = true
        oldResolve(val)
      }
    }
    const reject = (err) => {
      if(!isResolved){
        debug('Responding with error!')
        isResolved = true
        oldReject(err)
      }
    }

    // Try to fetch from the web first
    debug(`Attempting request for "${request.url}"...`)
    fetch(request).then((response) => {
      debug('Got response:', response)
      return caches.open(RUNTIME).then((cache) => {
        return {
          response: response,
          cache: cache
        }
      })
    })
    // Save the response in the cache 
    .then((res) => {
      debug('Saving response to cache...')
      return res.cache.put(cachePutRequest, res.response.clone()).then(() => res.response)
    })
    .then((response) => {
      debug('Cache saved!')
      resolve(response)
    })
    // If that fails, try to pull from the cache, and as a last resort, return the error
    .catch((err) => {
      if(isResolved){
        return
      }
      debug('An error occurred:', err, 'pulling from cache...')
      pullFromCache().then(() => {
        reject(err)
      })
    })

    // If the timeout hits before anything else, try to pull from the cache
    setTimeout(() => {
      if(isResolved){
        return
      }
      debug('Timeout ran out; pulling from cache...')
      pullFromCache() 
    }, timeout)

    function pullFromCache () {
      return caches.match(cacheGetRequest).then((cachedResponse) => {
        if(cachedResponse){
          debug('Responding with cached response!')
          resolve(cachedResponse)
        } else {
          debug('No cached response available!')
        }
      })
    }
  })
}
