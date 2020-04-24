// scripts that communicate with the server directly

function callPhp(url) { // doesn't return echo
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    }
    xmlhttp.open('POST', url);
    xmlhttp.send();
}

function callPhpEcho(url, callbackFunction) { // returns echo
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
        var response = xhttp.responseText;
        callbackFunction(response);
    }
    };
    xhttp.open('GET', url);
    xhttp.send();
}

function sendDataPhp(url, data) { // doesn't return echo
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

function sendDataPhpEcho(url, data, callbackFunction) { // runs callbackfunction with echo as param
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            callbackFunction(response);
        }
    }
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
}