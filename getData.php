<?php
    $filePath = "data/track.txt";
    $fileSize = filesize($filePath);
    $dataFile = fopen($filePath,"r");
    $readData = fread($dataFile,$fileSize);
    fclose($dataFile);
    echo $readData;
?>