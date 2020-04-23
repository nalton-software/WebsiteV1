<?php
$txtFile = 'upctxt.txt';
$setupUsername = 'UPC-SETUP';

// set up message obj
$message = new stdClass(); // create empty object
$message->username = $setupUsername;
$message->content = "A new user has joined the chat";

// get message list as string
$messageListStr = file_get_contents($txtFile);

// if message list string contains messages, then parse, else set message list to empty list
if (strlen($messageListStr) > 0) {
    $messageList = json_decode($messageListStr);
}
else {
    $messageList = [];
}

if ($messageList === null) {
    $messageList = [];
}

// add message, encode, and update file
array_push($messageList, $message);
$messageListStr = json_encode($messageList);
file_put_contents($txtFile, $messageListStr);
?>
