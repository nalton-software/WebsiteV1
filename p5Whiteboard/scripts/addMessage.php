<?php
const roomDataFileUrl = "../!roomdata.txt";
//$bannedUsernames = file_get_contents("../bannedUsernames.txt");

$username = $_POST["username"];
$content = $_POST["content"];
$roomId = $_POST["roomId"];

// (check data - implement in future)

// read file
$roomDataStr = file_get_contents(roomDataFileUrl);

// do checks for null, empty file
if (strlen($roomDataStr) > 0 && $roomDataStr !== null) {
    // parse data, get room
    $roomData = json_decode($roomDataStr);
    $room = getRoom($roomData, $roomId);

    // check if room was found
    if ($room !== null) {
        // make message
        $message = new stdClass();
        $message->sender = $username;
        $message->content = $content;

        // add message to room, put in file
        array_push($room->chatMessages, $message);
        $roomDataStr = json_encode($roomData);
        file_put_contents(roomDataFileUrl, $roomDataStr);
    }
    else {
        echo "||nonExistentRoom";
    }
}
else {
    echo "**roomFileEmpty";
}

function getRoom($roomData, $roomId) {
    $room = null;
    for ($i = 0; $i < count($roomData); $i ++) {
        $currentRoom = $roomData[$i];
        if ($currentRoom->id === $roomId) {
            $room = $currentRoom;
            break;
        }
    }
    return $room;
}
?>