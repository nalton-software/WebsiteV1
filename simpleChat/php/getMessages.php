<?php

// Takes raw data from the request
$rawPost = file_get_contents('php://input');

// Converts it into a PHP object
// (called _POST so that it is like coding with a 'normal' POST (sent using bare AJAX))
$_POST = json_decode($rawPost);

$msgFileUrl = '/var/wpd/fetchAsync/msgFile.dat';
header('Content-Type: application/json');

$amount = $_POST->amount;

$success = false;

// read the message file - if it's ok proceed
$msgFileStr = file_get_contents($msgFileUrl);
if (strlen($msgFileStr) > 0) {
    // decode the message file - if it's ok proceed
    // it's not strictly neccesary to decode and then enocode but it's handy to check that
    // the contents are valid JSON
    $msgList = json_decode($msgFileStr);
    
    if ($msgList !== null) {
        $success = true;
        echo json_encode($msgList);
    }
}

if ($success === false) {
    echo json_encode(['ERROR']);
}

?>