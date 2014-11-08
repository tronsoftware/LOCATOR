<?php
header("Content-Type: text/html;charset=UTF-8");

  
    isset($_GET['account']) ? $account = $_GET['account'] : $account = '';
    isset($_GET['user']) ? $user = $_GET['user'] : $user = '';
    isset($_GET['pass']) ? $pass = $_GET['pass'] : $pass = '';
    isset($_GET['unitID']) ? $unitID = $_GET['unitID'] : $unitID = '0';
    isset($_GET['limit']) ? $limit = $_GET['limit'] : $limit = '1';

    $url = "http://3tech.com.ar:8080/events/data.jsonx?a=".$account."&p=".$pass."&u=".$user."&d=".$unitID."&l=".$limit."&at=true";
    $json = file_get_contents($url);
    
    echo $json;

  
?>