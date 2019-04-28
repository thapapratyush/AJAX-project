<?php
function connecttodb(){
    $connection = mysqli_connect("localhost","prat","password","listofbooks");
    if(mysqli_connect_errno()){
        echo "Failed to connect to db. Error code: $mysqli_connect_errno";
    }
    return $connection;
}

$dbase = connecttodb();
$parameter = $_GET["format"];
echo $parameter;

if($dbase != NULL){
    $categories = mysqli_query($dbase, "select * from category");
    $list_of_all_categories = array();
    // printXMLorJSON($categories->fetch_all());
}

function printXMLorJSON($printArray){
    if(strcasecmp($parameter, "json") == 0){
        echo json_encode($printArray);
    }else{
        echo $printArray;
    }
}
?>