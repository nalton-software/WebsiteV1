<?php
const roomDataFileUrl = "../!roomdata.txt";

$roomId = $_POST["roomId"];

// read data from file
$roomDataStr = file_get_contents(roomDataFileUrl);

if (strlen($roomDataStr) <= 0) {
    echo "||nonExistentRoom";
}

else if ($roomDataStr !== null) {
    // parse data, find room    
    $roomData = json_decode($roomDataStr);
    $room = getRoom($roomData, $roomId);

    // check if room exists
    if ($room !== null) {
        // get messages and send them back
        $messages = $room->chatMessages;
        echo json_encode($messages);
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