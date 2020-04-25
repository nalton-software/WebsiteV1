<?php
// PS 1

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
        // see if any users exist with that username already
        $possibleUsernameDuplicate = findUserObj($username, $userList);
        
        // if not found user:
        if ($possibleUsernameDuplicate === null) {
            // hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $newUserObj = new User($username, $hashedPassword);
            // add to list
            array_push($userList, $newUserObj);
            // save to file safely
            $fileWriteSuccess = filePutContentsChecks(userFileName, $userList);
            
            // echo whether file writing worked
            if ($fileWriteSuccess) {
                echo 'success';
            }
            else {
                echo 'ERRORfileWriteError';
            }
            echo json_encode($userList);
        }
        // else echo that username is already in use
        else {
            echo 'WARNINGusernameNotUnique';
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