<?php
$txtFile = 'upctxt.txt';
$setupUsername = 'UPC-SETUP';

// set up message obj
$message = new stdClass(); // create empty object
$message->username = $setupUsername;
$message->content = "Welcome to Unnamed Prototype Chat";

// add message, encode, and update file
$messageList = [];
array_push($messageList, $message);
$messageListStr = json_encode($messageList);
file_put_contents($txtFile, $messageListStr);
?>
