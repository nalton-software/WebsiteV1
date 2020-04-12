<?php
const roomDataFileUrl = "../!roomdata.txt";

$roomname = $_POST["roomname"];
$roomId = $_POST["roomId"];

// (check data - implement in future)

// read file
$roomDataStr = file_get_contents(roomDataFileUrl);

// do checks for null, empty file
if (strlen($roomDataStr) > 0 && $roomDataStr !== null) {
    // parse data
    $roomData = json_decode($roomDataStr);

    // make room
    $room = new stdClass();
    $room->name = $roomname;
    $room->id = $roomId;
    $room->whiteboardData = [];
    $room->chatMessages = [];

    // add message to room, put in file
    array_push($roomData, $room);
    $roomDataStr = json_encode($roomData);
    file_put_contents(roomDataFileUrl, $roomDataStr);
}
else {
    echo "**roomFileEmpty";
}
?>