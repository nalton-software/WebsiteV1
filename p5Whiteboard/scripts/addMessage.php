<?php
const roomDataFileUrl = "../!roomdata.txt";
//$bannedUsernames = file_get_contents("../bannedUsernames.txt");

$username = $_POST["username"];
$content = $_POST["content"];
$roomId = $_POST["roomId"];

// (check data)

// read file and find room object
$roomDataStr = file_get_contents(roomDataFileUrl);
$roomData = json_decode($roomDataStr);
$room = getRoom($roomData, $roomId);

// check if room was found
if ($room !== null) {
    // make message
    $message = new stdClass();
    $message->username = $username;
    $message->content = $content;

    // add message to room, put in file
    array_push($room->chatMessages, $message);
    $roomDataStr = json_encode($roomData);
    file_put_contents(roomDataFileUrl, $roomDataStr);
}

function getRoom($roomData, $roomId) {
    $room = null;
    for ($i = 0; $i < count($roomData); $i ++) {
        if ($roomData[$i]->roomId === $roomId) {
            $room = $roomData[$i];
            break;
        }
    }
    return $room;
}
?>