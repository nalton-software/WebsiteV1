<?php
// PS 2

// use the utility scripts
include 'utilScripts.php';

// read username that was sent by the JS
$username = $_POST['username'];
$password = $_POST['password'];

$sender = userEndSystemName;
$content = $username . ' has joined the chat';

// read user and message files
$userFileStr = file_get_contents(userFileName);
$messageFileStr = file_get_contents(messageFileName);

// if reading ok:
if (strlen($userFileStr) > 0 && strlen($messageFileStr) > 0) {
    // decode user file
    $userList = json_decode($userFileStr);
    $messageList = json_decode($messageFileStr);
    // if decoding ok:
    if ($userList !== null && $messageList !== null) {
        // check if the password is correct
        $passwordCheckResult = checkPassword($username, $password, $userList);
        
        if ($passwordCheckResult === 'success') {
            addMessageAndSave($sender, $content, $messageList);
        }
        else {
            echo 'WARNINGincorrectPwInChat';
        }
    }
    else {
        echo 'ERRORfileDecodeError';
    }
}
else {
    echo 'ERRORfileReadError';
}
?>