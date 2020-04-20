<?php
$txtFile = $_POST["txtFile"];
chmod($txtFile, 0666); // allow everyone to read, everyone to write
file_put_contents($txtFile, "");
?>