// requires utilScripts.js, serverCommScripts.js loginPageScripts.js and globalConstants.js

const createAccountUsernameBarId = 'createAccountUsernameInput';
const createAccountPasswordBarId = 'createAccountPasswordInput';

function sendCreateAccountRequest() {
    // fID 8
    // read input fields
    var username = readInputBar(createAccountUsernameBarId);
    var password = readInputBar(createAccountPasswordBarId);

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
        // read input fields
        var username = readInputBar(createAccountUsernameBarId);
        var password = readInputBar(createAccountPasswordBarId);

        var data = `username=${username}&password=${password}`;
        sendDataPhpEcho(phpUrls.loginAttempt, data, useLoginRequestResponse);
        sessionStorage.setItem('ACloginMode', loginModes.createAccount);
        
        // save username/password
        sessionStorage.setItem('ACloggedInUsername', username);
        sessionStorage.setItem('ACloggedInPassword', password);
    }
    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

// set up enter key to create account
getElemById(passwordBarId).addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendCreateAccountRequest();
    }
});