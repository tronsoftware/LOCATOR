<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '+++++';
$dbname = 'gts';

$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

if (mysqli_connect_errno()) {
	echo "Connection failed: " . mysqli_connect_error();
	exit();
}

?>