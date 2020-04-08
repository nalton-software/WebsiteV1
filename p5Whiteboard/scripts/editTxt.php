<?php
$txtFile = $_POST["txtFile"];
$data = $_POST["data"];
chmod($txtFile, 0666); // allow everyone to read, everyone to write
file_put_contents($txtFile, $data);
?>
