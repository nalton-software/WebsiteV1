<?php
const roomDataFileUrl = "../!roomdata.txt";

$roomId = $_POST["roomId"];
$whiteboardDataStr = $_POST["whiteboardData"];
$editMadeBy = $_POST["editMadeBy"]; // unused as of now, may be used later on

// read data from file
$roomDataStr = file_get_contents(roomDataFileUrl);

if (strlen($roomDataStr) <= 0) {
    echo "||nonExistentRoom";
}

// do check for null
if ($roomDataStr !== null) {
    // if data file is empty, then just make empty array for data instead of reading file
    if (strlen($roomDataStr) <= 0) {
        $roomData = [];
    }
    else { // otherwise parse data
        $roomData = json_decode($roomDataStr);
    }

    $room = getRoom($roomData, $roomId);

    // check if room exists
    if ($room !== null) {
        // parse the whiteboard data and then put it in the room
        // this will kill the program is there's a problem with the whiteboard data, so no checks needed
        $whiteboardData = json_decode($whiteboardDataStr);
        $room->whiteboardData = $whiteboardData;
        echo "rd" . json_encode($roomData);

        // encode the room data
        $roomDataStr = json_encode($roomData);
        echo $roomDataStr;
        // put in file
        if (strlen($roomDataStr) > 0) {
            file_put_contents(roomDataFileUrl, $roomDataStr);
        }
        else {
            echo "**unknownServerError";
        }
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