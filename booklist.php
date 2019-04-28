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
    for ($i=0; $i<count($categories->fetch_assoc());$i++){
         array_push($list_of_all_categories , $categories->fetch_assoc()[category]);
    }
    echo $list_of_all_categories;
}
?>