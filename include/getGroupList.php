<?php

    include 'dbconnect.php';
    
    isset($_GET['account']) ? $account = $_GET['account'] : $account = '';
    isset($_GET['user']) ? $user = $_GET['user'] : $user = '';

    $query = 'CALL prcGetGroupList(\'' . $account . '\',\'' .$user.'\')' ;
    
    $json = '{ "GroupList": [';

    // execute query
    if ($mysqli->multi_query($query)) {

        do {  // build our json array
            if ($result = $mysqli->store_result()) {
                while ($row = $result->fetch_row()) {
                    $json .= $row[0];
                    $json .= ',';
                }
                $result->close();
            }
        } while ($mysqli->next_result());
    }
    else {
        die('error: '  . $mysqli->error);
    }

    $json = rtrim($json, ",");
    $json .= '] }';

$string = json_decode($json,true);

if (count($string[GroupList]) == 0) {
    
    $query = 'CALL prcGetGroup(\'' . $account . '\')' ;
    
    $json = '{ "GroupList": [{ "grupID": "TODOS"},';

    // execute query
    if ($mysqli->multi_query($query)) {

        do {  // build our json array
            if ($result = $mysqli->store_result()) {
                while ($row = $result->fetch_row()) {
                    $json .= $row[0];
                    $json .= ',';
                }
                $result->close();
            }
        } while ($mysqli->next_result());
    }
    else {
        die('error: '  . $mysqli->error);
    }

    $json = rtrim($json, ",");
    $json .= '] }';
}



    header('Content-Type: application/json');
    echo $json;

    $mysqli->close();
?>