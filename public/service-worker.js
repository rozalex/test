self.addEventListener('fetch', function(event) {
    if (!navigator.onLine) {
        console.log("OFFLINE");
        const channel = new BroadcastChannel('sw-messages');
        const requestUrl = event.request.url;
        channel.postMessage({request: requestUrl});
    }
});
