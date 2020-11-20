// this script requires globalConstants.js

function goToPage(url) {
    // fID 9
    window.location.href = url;
}

function replaceAll(string, search, replace) {
    // fID 41
    return string.split(search).join(replace);
}

function getTimeAsString() {
    // fID 17
    // set up date obj
    var dateObj = new Date();
    var dateDataArray = [];

    // add year month day num time
    dateDataArray.push(dateObj.getFullYear());
    dateDataArray.push(dateObj.getMonth() + 1); // because months start at 0
    dateDataArray.push(dateObj.getDate());
    dateDataArray.push(dateObj.getHours());
    dateDataArray.push(dateObj.getMinutes());
    dateDataArray.push(dateObj.getSeconds());

    // stringify the array to look nice
    var dateDataString = '';
    for (var i = 0; i < dateDataArray.length; i++) {
        dateDataString += String(dateDataArray[i]) + ':';
    }
    dateDataString = dateDataString.slice(0, -1);
    return dateDataString;
}

function findServerError(serverResponse) {
    // fID 18
    // get the bit of the response that has the same length as error prefix
    var errorHoldingSegment = serverResponse.substring(0, errorPrefix.length);
    if (errorHoldingSegment == errorPrefix) {
        return true
    } else {
        return false;
    }
    //  get the bit of response that would have error
    //  if that bit has the error prefix, return true
    //  else return false
}

function findServerWarning(serverResponse) {
    // fID 19
    // get the bit of the response that has the same length as warning prefix
    var warningHoldingSegment = serverResponse.substring(0, warningPrefix.length);
    if (warningHoldingSegment == warningPrefix) {
        return true;
    } else {
        return false;
    }
}

function handleError(fullErrorCode) {
    // fID 20
    // fullErrorCode INCLUDES the prefix (eg: ERRORundefinedVar)

    // lookup error in errorDict
    var errorMessage = errorDict[fullErrorCode];

    // if error type not found, set it to unknown
    if (errorMessage === undefined) {
        errorMessage = errorDict['unknownError'];
    }

    console.error('ERROR  type: ' + fullErrorCode + ', message: ' + errorMessage);

    // log error to log with time
    var currentTime = getTimeAsString();
    var prevErrorLog = localStorage.getItem(localStorageErrorLog);
    var newErrorLog = prevErrorLog + errorSepInLog + 'error at ' + currentTime +
        ', type: ' + fullErrorCode + ', message: ' + errorMessage;
    localStorage.setItem(localStorageErrorLog, newErrorLog);

    alert('Fatal internal error: ' + fullErrorCode + 'message: ' + errorMessage);
}

function handleWarning(fullWarningCode) {
    // fID 21
    // lookup warning in dictionary
    var functionToRun = warningDict[fullWarningCode];

    // if can find warn function, run it
    if (functionToRun !== undefined) {
        functionToRun();
    }
    // else run default warn function
    else {
        warningDict.unknownWarning();
    }
}

function readInputBar(inputId) {
    // fID 22
    // reads value of a html input elem
    var bar = document.getElementById(inputId);
    return bar.value;
}

function getElemById(id) {
    // fID 29
    return document.getElementById(id);
}

function goToCreateAccountPage() {
    // fID 7
    goToPage(createAccountPageUrl);
}

function goToLoginPage() {
    // fID 37
    
    // clear saved username and password to avoid the auto-loginner from trying to log in
    sessionStorage.setItem('ACloggedInUsername', '');
    sessionStorage.setItem('ACloggedInPassword', '');
    goToPage(loginPageUrl);
}

function WARNINGincorrectPwInChat() {
    alert('Login required: press ok to go to login page');

    // clear saved username and password to avoid the auto-loginner from trying to log in
    sessionStorage.setItem('ACloggedInUsername', '');
    sessionStorage.setItem('ACloggedInPassword', '');

    goToLoginPage();
}

function WARNINGnonExistingUsername() {
    var loginMode = sessionStorage.getItem('ACloginMode');
    switch (loginMode) {
        case loginModes.auto:
            alert('Automatic log in failed. Please log in manually');
            break;
        case loginModes.userInitiated:
            alert('Wrong username');
            break;
        default:
            alert('Wrong username');
    }
}

function WARNINGincorrectPwLogin() {
    var loginMode = sessionStorage.getItem('ACloginMode');
    switch (loginMode) {
        case loginModes.auto:
            alert('Automatic log in failed. Please log in manually');
            break;
        case loginModes.userInitiated:
            alert('Wrong password');
            break;
        default:
            alert('Wrong password');
    }
}