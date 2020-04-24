const errorPrefix   = 'ERROR';
const warningPrefix = 'WARNING';

const localStorageErrorLog = 'ACerrorLog';
const errorSepInLog = '  -  ';

const phpUrls = {
    loginAttempt    : 'loginAttempt.php',
    createAccount   : 'createAccount.php',
    addMessage      : 'addMessage.php',
    addJoinMessage  : 'addJoinMessage.php',
    getMessages     : 'getMessages.php'
}

// relative to any of the html pages
const chatPageUrl           = 'chatPage.html';
const loginPageUrl          = 'index.html';
const createAccountPageUrl  = 'createAccount.html';

// full of messages
const errorDict = {
    unknownError : '#0 Unknown internal error'
}

// full of functions
const warningDict = {
    unknownWarning : () => alert('Warning: small internal error. We recommend that you close this tab and reopen it')
}