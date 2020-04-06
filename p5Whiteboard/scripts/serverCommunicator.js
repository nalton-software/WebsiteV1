class ServerCommunicator {
    constructor() {}
    
    callPhp(url) { // doesn't return echo

    }

    callPhpEcho(url) { // returns echo

    }

    sendDataPhpA(url, data) { // IS A STUB. AS STUB DOES APPEND doesn't return echo
        if (localStorage[url]) {
            localStorage[url] = localStorage[url] + data;
        }
        else {
            localStorage[url] = data;
        }
    }

    sendDataPhp(url, data) { // IS A TEST METHOD, WILL BE DELETED, DOESN'T APPEND
        localStorage[url] = data;
    }

    sendDataPhpEcho(url, data) { // returns echo

    }

    fetchFile(url) { // IS A STUB
        /*var promise = fetch(url);

        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            var data = await response.text();
        }
        else {
            console.log('HTTP-Error: ' + response.status);
        }
        return data;*/
        
        return localStorage.getItem(url);
    }
}