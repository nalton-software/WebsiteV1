<?php
$txtFile = 'upctxt.txt';
$invalidUsernames = json_decode(file_get_contents('invalidUsernames.txt'));

// get data from request
$username = $_POST["username"];
$content = $_POST["content"];

if (isUsernameValid($username)) {

    // set up message obj
    $message = new stdClass(); // create empty object
    $message->username = $username;
    $message->content = $content;

    // get message list as string
    $messageListStr = file_get_contents($txtFile);

    // if message list string contains messages, then parse, else set message list to empty list
    if (strlen($messageListStr) > 0) {
        $messageList = json_decode($messageListStr);
    }
    else {
        $messageList = [];
    }

    // add message, encode, and update file
    array_push($messageList, $message);
    $messageListStr = json_encode($messageList);
    file_put_contents($txtFile, $messageListStr);
}

else {
    echo 'badUsername';
}

function isUsernameValid($username) {
    global $invalidUsernames;

    $usernameValid = true;
    for ($i = 0; $i < count($invalidUsernames); $i ++) {
        if ($username == $invalidUsernames[$i]) {
            $usernameValid = false;
            break;
        }
    }
    return $usernameValid;
}
?>
