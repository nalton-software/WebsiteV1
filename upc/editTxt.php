<?php
$txtFile = $_GET["txtFile"];
$data = $_GET["data"];
$content = file_get_contents($txtFile);
$content .= $data;
file_put_contents($txtFile, $content);
echo $content;
?>
