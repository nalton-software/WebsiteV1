<?php

define('userFileName', '/var/wpd/accountsChat/userFile.txt');
define('messageFileName', '/var/wpd/accountsChat/messageFile.txt');
define('userEndSystemName', 'AC-Setup'); // what the system is called in the chat

$bannedUsernames = ['', 'null', 'Null', 'void', 'Void',
    userEndSystemName];

class User {
    function __construct($username, $passwordHashed) {
        $this->username = $username;
        $this->passwordHashed = $passwordHashed;
    }
}

class Message {
    function __construct($sender, $content, $timestamp) {
        $this->sender = $sender;
        $this->content = $content;
        $this->timestamp = $timestamp;
    }
}

function checkPassword($username, $password, $userList) {
    // PUN 1
    // get user obj that matches username
    $userObj = findUserObj($username, $userList);
    // if no user with that username exists:
    if ($userObj !== null) {
        // check password using hash stored in user and sent password
        $passwordHashed = $userObj->passwordHashed;
        $passwordCorrect = password_verify($password, $passwordHashed);

        // if it matches, return success message
        if ($passwordCorrect) {
            return 'success';
        }
        // if password incorrect, return that
        else {
            return 'WARNINGpwIncorrect';
        }
    }
    // if the username doesn't even exist, return that
    else {
        return 'WARNINGnonExistingUsername';
    }
}

function findUserObj($username, $userList) {
    // PUN 2

    $userObj = null;
    // loop through users, checking if the username matches
    for ($i = 0; $i < count($userList); $i ++) {
        $currUser = $userList[$i];
        if ($currUser->username === $username) {
            $userObj = $currUser;
            break;
        }
    }
    return $userObj;
}

function filePutContentsChecks($pathToFile, $jsonContents) {
    // PUN 3

    $success = false;
    // encode contents into string
    $contentsStr = json_encode($jsonContents);
    // check contents and if they are ok then put in file
    if ($contentsStr !== null) {
        if (strlen($contentsStr) > 0) {
            file_put_contents($pathToFile, $contentsStr);
            $success = true;
        }
    }
    return $success;
}

function addMessageAndSave($sender, $content, $messageList) {
    // PUN 4

    // create message obj
    $messageObj = new Message($sender, $content, 'no timestamp yet, sorry!');

    // add to end of list and safely save
    array_push($messageList, $messageObj);
    $success = filePutContentsChecks(messageFileName, $messageList);
    // return whether it worked
    return $success;
}

?>