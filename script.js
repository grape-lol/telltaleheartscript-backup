document.getElementById('exportBtn').addEventListener('click', async function () {
    const data = {};

    // Export Local Storage
    data.localStorage = { ...localStorage };

    // Export Session Storage
    data.sessionStorage = { ...sessionStorage };

    // Export Cookies
    data.cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
    }, {});

    // Export IndexedDB
    data.indexedDB = await exportIndexedDB();

    // Cache Storage (simplified)
    data.cacheStorage = await exportCacheStorage();

    // Convert to JSON and export
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'browser-storage.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Export IndexedDB Data
async function exportIndexedDB() {
    const dbs = await indexedDB.databases();
    const dbData = {};

    for (let db of dbs) {
        const dbName = db.name;
        dbData[dbName] = {};

        const openRequest = indexedDB.open(dbName);
        
        openRequest.onupgradeneeded = function (event) {
            const thisDB = event.target.result;
            for (let i = 0; i < thisDB.objectStoreNames.length; i++) {
                const storeName = thisDB.objectStoreNames[i];
                dbData[dbName][storeName] = [];
            }
        };

        openRequest.onsuccess = function (event) {
            const dbConnection = event.target.result;
            // Convert DOMStringList to an array
            const objectStoreNames = Array.from(dbConnection.objectStoreNames);

            objectStoreNames.forEach((storeName) => {
                const transaction = dbConnection.transaction(storeName, 'readonly');
                const objectStore = transaction.objectStore(storeName);
                const allRecords = objectStore.getAll();

                allRecords.onsuccess = function () {
                    dbData[dbName][storeName] = allRecords.result;
                };
            });
        };

        await new Promise((resolve) => {
            openRequest.oncomplete = () => resolve();
        });
    }

    return dbData;
}

// Export Cache Storage
async function exportCacheStorage() {
    const cacheNames = await caches.keys();
    const cacheData = {};

    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        const responseData = {};

        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const responseClone = response.clone();
                responseData[request.url] = await responseClone.text();
            }
        }

        cacheData[cacheName] = responseData;
    }

    return cacheData;
}
