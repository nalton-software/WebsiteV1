const errorPrefix   = 'ERROR';
const warningPrefix = 'WARNING';

const localStorageErrorLog = 'ACerrorLog';
const errorSepInLog = '  -  ';

const userEndSystemName = 'AC-Setup';

const notificationToneUrl = 'assets/notification.mp3';

const phpUrls = {
    loginAttempt    : 'loginAttempt.php',
    createAccount   : 'createAccount.php',
    addMessage      : 'addMessage.php',
    addJoinMessage  : 'addJoinMessage.php',
    getMessages     : 'getMessages.php',
    getAllMessages  : 'getAllMessages.php'
}

const loginModes = {
    auto          : 'auto',
    userInitiated : 'userInitiated',
    createAccount : 'createAccount'
}

// url is relative to any of the html pages
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
    'unknownWarning'             : () => alert('Warning: small internal error. We recommend that you close this tab and reopen it'),
    'WARNINGpwIncorrect'         : WARNINGincorrectPwLogin,
    'WARNINGnonExistingUsername' : WARNINGnonExistingUsername,
    'WARNINGusernameNotUnique'   : () => alert('Username already exists'),
    'WARNINGusernameBanned'      : () => alert('Username invalid'),
    'WARNINGincorrectPwInChat'   : WARNINGincorrectPwInChat
}