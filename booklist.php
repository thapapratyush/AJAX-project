<?php
function connecttodb(){
    $connection = mysqli_connect("localhost","prat","password","listofbooks");
    if(mysqli_connect_errno()){
        echo "Failed to connect to db. Error code: $mysqli_connect_errno";
    }
    return $connection;
}

function printXMLorJSON($printArray, $parameter){
    if(strcasecmp($parameter, "json") == 0){
        echo json_encode($printArray);
    }else{
        $xml = new SimpleXMLElement("<?xml version=\"1.0\" encoding=\"UTF-8\" ?><categories></categories>");
        array_walk_recursive($printArray, array($xml, 'addChild'));
        header('Content-Type: application/xml; charset=utf-8');
        echo $xml->asXML();
    }
}

$dbase = connecttodb();
$parameter = $_GET["format"];

if($dbase != NULL){
    $categories = mysqli_query($dbase, "select * from category");
    $list_of_all_categories = array();
    $finfo = $categories->fetch_all(MYSQLI_ASSOC);
    foreach ($finfo as $val){
        array_push($list_of_all_categories, $val[category]);
    }
    printXMLorJSON($list_of_all_categories, $parameter);
}
?>