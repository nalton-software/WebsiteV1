// requires utilScripts.js, serverCommScripts.js and globalConstants.js

const usernameBarId = 'usernameInput';
const passwordBarId = 'passwordInput';

function sendLoginRequest() {
    // fID 1
    // ONLY TO BE USED BY USER BUTTON CLICK

    // read input fields
    var username = readInputBar(usernameBarId);
    var password = readInputBar(passwordBarId);

    // use php to check if password is correct
    var data = `username=${username}&password=${password}`;
    sendDataPhpEcho(phpUrls.loginAttempt, data, useLoginRequestResponse);
    
    // set login mode for error/warning handling
    sessionStorage.setItem('ACloginMode', loginModes.userInitiated);
}

function useLoginRequestResponse(serverResponse) {
    // fID 4
    // check for erorrs and warnings in the response
    var serverErrorFound = findServerError(serverResponse);
    var serverWarningFound = findServerWarning(serverResponse);

    // if no errors and no warnings:
    if (!serverErrorFound && !serverWarningFound) {
        // if didn't come here by creating account (as by creating account doesn't need this next step)
        if (sessionStorage.getItem('ACloginMode') != loginModes.createAccount) {
            // read username and password again
            var username = readInputBar(usernameBarId);
            var password = readInputBar(passwordBarId);
        }
        
        // if the user logged in (not the auto login) put username and password into sessionStorage for later use
        if (sessionStorage.getItem('ACloginMode') == loginModes.userInitiated) {
            sessionStorage.setItem('ACloggedInUsername', username);
            sessionStorage.setItem('ACloggedInPassword', password);
        }

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

function autoLogin() {
    // fID 38

    // if (first line) there is no chat page flag - so the user didn't just click back from the chat page
    // if the user came from the chat page, that flag would be set to true
    if (sessionStorage.getItem('ACchatPageFlag') === null) {
        // if login data is saved
        if (sessionStorage.getItem('ACloggedInUsername')) {
            // read saved data
            var username = sessionStorage.getItem('ACloggedInUsername');
            var password = sessionStorage.getItem('ACloggedInPassword');

            //  use php to check if password is correct
            var data = `username=${username}&password=${password}`;
            sendDataPhpEcho(phpUrls.loginAttempt, data, useLoginRequestResponse);

            // save login mode
            sessionStorage.setItem('ACloginMode', loginModes.auto);
        }
    }
}

autoLogin();

// tell future pages that the last page WASN'T the chat page
// note that this comes after autoLogin()
sessionStorage.removeItem('ACchatPageFlag');

// set up enter key to login
getElemById(passwordBarId).addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendLoginRequest();
    }
});