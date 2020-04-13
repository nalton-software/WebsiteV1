<?php
const roomDataFileUrl = "../!roomdata.txt";

$roomId = $_POST["roomId"];

$roomDataStr = file_get_contents(roomDataFileUrl);
if (strlen($roomDataStr) > 0) {
    $roomData = json_decode($roomDataStr);
    $room = getRoom($roomData, $roomId);
    
    if ($room !== null) {
        $roomname = $room->name;
        echo $roomname;
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