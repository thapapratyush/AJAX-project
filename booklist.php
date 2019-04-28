<?php
function connecttodb(){
    $connection = mysqli_connect("localhost","prat","password","listofbooks");
    if(mysqli_connect_errno()){
        echo "Failed to connect to db. Error code: $mysqli_connect_errno";
    }
    return $connection;
}

$dbase = connecttodb();

if($dbase != NULL){
    $categories = mysqli_query($dbase, "select * from category");
    $list_of_all_categories = array();
    echo json_encode($categories->fetch_all());
}
?>