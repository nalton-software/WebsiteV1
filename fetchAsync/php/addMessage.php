<?php

$msgFileUrl = 'var/wpd/asyncFetch/msgFile.dat';

$sender = $_POST['sender'];
$content = $_POST['content'];


// read the message file - if it's ok proceed
$msgFileStr = file_get_contents(msgFileUrl);
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
                echo 'success';
            }
        }
    }
}

class Message {
    function __construct($sender, $content) {
        $this->sender = $sender;
        $this->content = $content;
    }
}

?>