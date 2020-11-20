## All of the JS and PHP functions in this program

#### So that it's easy to see where I'm at

#### a JS function's id is called fID eg: fID 7

#### A PHP script's id is called PS (php script) eg: PS 0. Also known in format p0

#### a PHP function's id is called PUN (php utility number) eg: PUN 1. Also known in format PU.1

#### some JS functions are prefixed with warnings. They are not required to be in here, as they are very simple. They also don't need fID's.

<html>
<!-- use html to make a table -->
<table>
    <b>
    <tr>
    <td> fID / PUN </td><td> Name </td><td> Purpose </td><td> AKA </td><td> status </td>
    <tr>
    </b>
<!-- empty line -->
    <tr>
    <td> 1 </td><td> sendLoginRequest() </td><td> check username and password </td><td> try log in, loginAttempt </td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 2 </td><td> sendDataPhpEcho(url, data, callbackFunction) </td><td> make an AJAX POST request to url. Run callbackFunction with response as parameter </td><td></td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 3 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 4 </td><td> useLoginAttemptResponse(response) </td><td> if sendLoginRequest() was successful, redirect to chat page </td><td> login response handler </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 5 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 6 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 7 </td><td> goToCreateAccountPage() </td><td> bound to a button on the login screen </td><td> new acct btn click </td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 8 </td><td> sendCreateAccountRequest() </td><td> send the person's username and password to server to try and make a new account </td> <td> create new acct button click </td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 9 </td><td> goToPage(url) </td><td> sends browser to url </td><td> redir, redirect </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 10 </td><td> useCreateAccountResponse(serverResponse) </td><td> if there are no errors/warnings, login and go to chat page </td> <td> handle new accnt response </td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 11 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 12 </td><td> sendMessage() </td><td> sends message and login data to server </td> <td></td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 13 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 14 </td><td> useSendMessageResponse(serverResponse) </td><td> handle errors, warnings, and make the little text say 'sent' </td> <td> handle message send response </td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 15 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 16 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 17 </td><td> getTimeAsString </td><td> get time from year to second in a string </td> <td></td> <td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 18 </td><td> findServerError(serverResponse) </td><td> returns true if the server echoed an error </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 19 </td><td> findServerWarning(serverResponse) </td><td> returns true if the server echoed a warning </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 20 </td><td> handleError(fullErrorCode) </td><td> log errors to all logs </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 21 </td><td> handleWarning(fullWarningCode) </td><td> appropriately alert warning </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 22 </td><td> readInputBar(inputId) </td><td> quick way to read the value of html input elem </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 23 </td><td> setChatStatusBar(text) </td><td> set the status bar at the bottom of the chat area to text </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 24 </td><td> sendJoinMessage() </td><td> send a message saying 'username has joined the chat' </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 25 </td><td> useJoinMessageResponse(serverResponse) </td><td> plain check for errors and warnings </td><td> handleJoinMsgResponse </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 26 </td><td> downloadMessages() </td><td> if showing all messages, then call PS 5, else call PS 2. In both cases set response handler to drawMessages </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 27 </td><td> calPhpEcho(url, callbackFunction) </td><td> send AJAX POST request to url. Run callbackFunction with response as paramater </td><td></td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 28 </td><td> drawMessages(messageStr) </td><td> draw the downloaded messages </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 29 </td><td> getElemById(id) </td><td> shorthand for document.getElementById() </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 30 </td><td> scrollToBottom(elemId) </td><td> scroll the html element with id elemId as far down as it can go </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 31 </td><td> isScrolledToBott0m(elemId) </td><td> returns true if elem is scrolled as far down as possible, else false </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 32 </td><td> autoScroll(isNewMessage, prevScroll, wasScrolledToBottom) </td><td> scrolls the display div to the correct amount up or down depending on whether there is a new message and where the user was scrolled to before </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 33 </td><td> formatMessageStr(messageStr) </td><td> turns the raw server response into something that can be printed into the display div </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 34 </td><td> makeNewMessageTone() </td><td> make the 'ding' noise when there is a new message. uses the pitch globals set at top </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 35 </td><td> omitted </td><td> this fID has not been used, most likely as there was a function with this fID that got removed</td> <td></td> <td></td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 36 </td><td> logout() </td><td> clears the sessionStorage username/pw and redirects to login page </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 37 </td><td> goToLoginPage() </td><td> goes to the login page </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 38 </td><td> autoLogin() </td><td> tries to automatically log in if the account details are saved </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 39 </td><td> resizeMessageInputBar() </td><td> makes the message input bar on the chat page a pleasing size </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 40 </td><td> toggleShowAllMessages() </td><td> toggle whether to show all messages in the chat </td><td> </td><td> PDL started </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 40 </td><td> safenHtmlTags(str) </td><td> break html tags in the string by inserting u200c in the start of tags. Allows for setting of innerHTML of msg draw thing. </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> 41 </td><td> replaceAll(str, search, replace) </td><td> Replace all occurences of `search` with `replace` </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 0 </td><td> attemptLogin[username, password] </td><td> check if the password matches the username </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 1 </td><td> newAccount[username, password] </td><td> create a new account if username is unique. Returns 'success', 'WARNINGpwDuplicated', or error messages </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 2 </td><td> addMessage[content, username, password] </td><td> checks password, then if it is correct add a message. Returns success or warning or error messages </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 3 </td><td> getMessages.php[username, password, msgNum] </td><td> checks password, then if it is correct returns up msgNum messages from the list </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 4 </td><td> addJoinMessage.php[username, password] </td><td> adds a simple message when someone joins the chat but only if that user is verified. </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PS 5 </td><td> getAllMessages.php[username, password] </td><td> checks password, then if it is correct returns all messages in the list (not like getMessages.php) </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PUN 1 </td><td> checkPassword(username, password, userList) </td><td> check if the password for the user with the name <i>username</i> has the password <i>password</i> by looking at the userList. Returns 'success', 'WARNINGpwIncorrect', 'WARNINGnonExistingUsername', or error messages </td><td> getUser, login attempt </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PUN 2 </td><td> findUserObj(username, userList) </td><td> return a ptr to the user obj in userList that matches username. Returns null if not found </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PUN 3 </td><td> filePutContentsChecks(pathToFile, contents) </td><td> check if the contents are not null then put in file </td><td> </td><td> written </td>
    <tr>
<!-- empty line -->
    <tr>
    <td> PUN 4 </td><td> addMessageAndSave(sender, content) </td><td> assumes that file opened alright and that user verified. Adds message to the file, return true if success, false if failed </td><td> </td><td> written </td>
    <tr>
</html>