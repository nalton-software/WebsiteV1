function submit() {
    var text = prompt('Enter some random text!');
    sendToServer(text);
}

function sendToServer(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
        console.log(this.responseText)
    }
    };
    xhttp.open('GET', 'phpy.php');
    xhttp.send();
}

function update() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {// Typical action to be performed when the document is ready:
        var response = xhttp.responseText;
        console.log(response);
    }
    };
    xhttp.open('GET', 'upctxt.txt' + '?t=' + Date.now(), true);
    xhttp.send();
}