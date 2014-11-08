<?php
    
    
    isset($_GET['account']) ? $account = $_GET['account'] : $account = '';
    isset($_GET['user']) ? $user = $_GET['user'] : $user = '';
    isset($_GET['pass']) ? $pass = $_GET['pass'] : $pass = '';
    
    $url = "http://3tech.com.ar:8080/events/data.jsonx?a=".$account."&p=".$pass."&u=".$user."&g=all&l=0";
    

    $json = file_get_contents($url);

    header('Content-Type: application/json; charset=UTF-8');
    echo $json;
?>
