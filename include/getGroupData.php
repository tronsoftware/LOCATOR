<?php

  
    isset($_GET['account']) ? $account = $_GET['account'] : $account = '';
    isset($_GET['user']) ? $user = $_GET['user'] : $user = '';
    isset($_GET['pass']) ? $pass = $_GET['pass'] : $pass = '';
    isset($_GET['groupID']) ? $groupID = $_GET['groupID'] : $groupID = '';
    isset($_GET['limit']) ? $limit = $_GET['limit'] : $limit = '1';
    if ($groupID == 'TODOS') {
        $groupID = 'all';
	}
    $url = "http://3tech.com.ar:8080/events/data.jsonx?a=".$account."&p=".$pass."&u=".$user."&g=".$groupID."&l=".$limit."&at=true";
    $json = file_get_contents($url);
    header('Content-Type: application/json');
    echo $json;

  
?>