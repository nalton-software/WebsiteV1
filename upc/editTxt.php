<?php
$txtFile = $_POST["txtFile"];
$data = $_POST["data"];
chmod($txtFile, 0666); // allow everyone to read, everyone to write
$content = file_get_contents($txtFile);
$content .= $data;
file_put_contents($txtFile, $content);
?>
