// requires utilScripts.js, serverCommScripts.js and globalConstants.js

function sendLoginRequest() {
    // fID 1
    //  read input fields
    var username = readInputBar(usernameBarId);
    var password = readInputBar(passwordBarId);

    //  use php to check if password is correct
    var data = `username=${username}&password=${password}`;
    sendDataPhpEcho(phpUrls.loginAttempt, data, useLoginRequestResponse);
}

function useLoginRequestResponse(serverResponse) {
    // fID 4
    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    // if no errors and no warnings:
    if (! serverErrorFound && ! serverWarningFound) {
            // read username and password again
            var username = readInputBar(usernameBarId);
            var password = readInputBar(passwordBarId);

            // put username and password into sessionStorage for later use
            sessionStorage.setItem('ACloggedInUsername', username);
            sessionStorage.setItem('ACloggedInPassword', password);

            // go to chat page
            goToPage(chatPageUrl);
    }
    // handle errors and warnings
    if (serverErrorFound) {
        handleError(serverResponse);
    }
    if (serverWarningFound) {
        handleWarning(serverResponse);
    }
}

function goToCreateAccountPage() {
    // fID 7
    goToPage(createAccountPageUrl);
}