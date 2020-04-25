<?php
// PS 2

// use the utility scripts
include 'utilScripts.php';

// read username and password that were sent by the JS
$username = $_POST['username'];
$password = $_POST['password'];

// read user file
$userFileStr = file_get_contents(userFileName);

// if reading ok:
if (strlen($userFileStr) > 0) {
    // decode user file
    $userList = json_decode($userFileStr);
    // if decoding ok:
    if ($userList !== null) {
        // check if the password is correct
        $passwordCheckResult = checkPassword($username, $password, $userList);
        
        echo $passwordCheckResult;
    }
    else {
        echo 'ERRORfileDecodeError';
    }
}
else {
    echo 'ERRORfileReadError';
}
?>