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

    callPhpEcho(url, callbackFunction, callbackFunctionArg) { // returns echo
        // callbackFunctionArg is optional, useful for functions like this.method.bind(this)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
            var response = xhttp.responseText;
            if (callbackFunctionArg != undefined) {
                callbackFunction(response, callbackFunctionArg);
            }
            else {
                callbackFunction(response);
            }
        }
        };
        xhttp.open('GET', url);
        xhttp.send();
    }

    sendDataPhp(url, data) { // doesn't return echo
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                console.log(response);
            }
        }
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }

    sendDataPhpEcho(url, data, callbackFunction, callbackFunctionArg) { // runs callbackfunction with echo as param
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                if (callbackFunctionArg != undefined) {
                    callbackFunction(response, callbackFunctionArg);
                }
                else {
                    callbackFunction(response);
                }
            }
        }
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);
    }

    fetchFile(url, onFetchFunction, onFetchFunctionArg) { // will call onfetchfunction with response
        // (use arrow function if you don't want seperate function)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
            var response = this.responseText;
            // this strange piece of code here allows a copy of 'this' to be passed around easily. It's weird.
            if (onFetchFunctionArg != undefined) {
                onFetchFunction(response, onFetchFunctionArg);
            }
            else {
                onFetchFunction(response);
            }
        }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}