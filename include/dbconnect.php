<?php

$dbhost = 'localhost'; //host:port de el SQL Server
$dbuser = 'root'; // Usuario con privilegios ALL sobre BD
$dbpass = '+++++';
$dbname = 'gts'; // Normalmente gts

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if (mysqli_connect_errno()) {
	echo "Connection failed: " . mysqli_connect_error();
	exit();
}

?>
