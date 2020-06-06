<?php

// Takes raw data from the request
$rawPost = file_get_contents('php://input');

// Converts it into a PHP object
// (called _POST so that it is like coding with a 'normal' POST (sent using bare AJAX))
$_POST = json_decode($rawPost);

$msgFileUrl = '/var/wpd/fetchAsync/msgFile.dat';
header('Content-Type: application/json');

$sender = $_POST->sender;
$content = $_POST->content;

$success = false;

// read the message file - if it's ok proceed
$msgFileStr = file_get_contents($msgFileUrl);
if (strlen($msgFileStr) > 0) {
    // decode the message file - if it's ok proceed
    $msgList = json_decode($msgFileStr);
    if ($msgList !== null) {
        $msg = new Message($sender, $content);
        array_push($msgList, $msg);

        $msgListStr = json_encode($msgList);
        if ($msgListStr !== null) {
            if (strlen($msgListStr) > 0) {
                file_put_contents($msgFileUrl, $msgListStr);
                $success = true;
                echo json_encode(['SUCCESS']);
            }
        }
    }
}

if (! $success) {
    echo json_encode(['ERROR']);
}

class Message {
    function __construct($sender, $content) {
        $this->sender = $sender;
        $this->content = $content;
    }
}

?>