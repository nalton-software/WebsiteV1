class ServerCommunicator {
    constructor() {
    }
    
    callPhp(url) { // doesn't return echo
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        }
        xmlhttp.open('POST', url);
        xmlhttp.send();
    }

    callPhpEcho(url) { // returns echo

    }

    sendDataPhp(url, data) { // doesn't return echo
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        }
        xmlhttp.open('POST', url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }

    sendDataPhpEcho(url, data) { // returns echo

    }

    fetchFile(url, onFetchFunction) { // will call onfetchfunction with response
        // (use arrow function if you don't want seperate function)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
            var response = this.responseText;
            onFetchFunction(response);
        }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}