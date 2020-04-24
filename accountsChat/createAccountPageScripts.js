// requires utilScripts.js, serverCommScripts.js and globalConstants.js

const usernameBarId = 'usernameInput';
const passwordBarId = 'passwordInput';

function sendCreateAccountRequest() {
    // fID 8
    // read input fields
    var username = readInputBar(usernameBarId);
    var password = readInputBar(passwordBarId);

    // combine username and password into string then send to server
    var data = `username=${username}&password=${password}`;
    sendDataPhpEcho(phpUrls.createAccount, data, useCreateAccountResponse);
}

function useCreateAccountResponse(serverResponse) {
    // fID 10

    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);
    
    // if no errors and no warnings, try and login then go to chat page
    if (! serverErrorFound && ! serverWarningFound) {
        var data = `username=${username}&password=${password}`;
        sendDataPhpEcho(phpUrls.loginAttempt, data, useLoginRequestResponse);
    }
    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}