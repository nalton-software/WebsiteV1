<?php

$msgFileUrl = 'var/wpd/asyncFetch/msgFile.dat';

$amount = $_POST['amount'];

// read the message file - if it's ok proceed
$msgFileStr = file_get_contents(msgFileUrl);
if (strlen($msgFileStr) > 0) {
    // decode the message file - if it's ok proceed
    $msgList = json_decode($msgFileStr);
    if ($msgList !== null) {
        echo json_encode($msgList);
    }
}

?>