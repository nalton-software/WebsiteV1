## All of the js functions in this program

#### So that it's easy to see where I'm at

#### a function's id is called fID

<html>
<!-- use html to make a table -->
<table>
    <b>
    <tr>
    <td> fID </td><td> Name </td><td> Purpose </td><td> AKA </td><td> status </td>
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
    <td> 26 </td><td> downloadMessages() </td><td> run fID 27 and send the response to fID 28 </td><td> </td><td> written </td>
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
</html>