<?php
// this script basically just verifies if the room exists
const roomDataFileUrl = "../!roomdata.txt";

$roomId = $_POST["roomId"];

// (check data - implement in future)

// read file
$roomDataStr = file_get_contents(roomDataFileUrl);

if (strlen($roomDataStr) <= 0) {
    echo "||nonExistentRoom";
}

// do checks for null, empty file
if ($roomDataStr !== null) {
    // parse data, get room
    $roomData = json_decode($roomDataStr);
    $room = getRoom($roomData, $roomId);

    // check if room exists
    if ($room !== null) {
        echo "success";
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