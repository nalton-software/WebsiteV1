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
const createAccountPageUrl  = 'createAccountPage.html';

// full of messages
const errorDict = {
    'unknownError' : '#0 Unknown internal error',
    'ERRORfileReadError' : '#1 File read error',
    'ERRORfileDecodeError' : '#2 File decode error',
    'ERRORfileWriteError' : '#3 File write error'
}

// full of functions
const warningDict = {
    'unknownWarning' : () => alert('Warning: small internal error. We recommend that you close this tab and reopen it'),
    'WARNINGpwIncorrect' : () => alert('Password incorrect'),
    'WARNINGnonExistingUsername' : () => alert('Username incorrect'),
    'WARNINGusernameNotUnique' : () => alert('Username already exists'),
    'WARNINGincorrectPwInChat' : () => alert('sheesh, you naughty person! You tried scamming your way in!')
}