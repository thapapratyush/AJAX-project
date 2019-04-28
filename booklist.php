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

function querydbforBooksfromCategories($chosenCategory){
    foreach($chosenCategory as $category){
        $query = "select t.title_name, a.author, y.year, c.category from title t ";
        $query .= "join category c on c.category_id = t.category_id and ";
        $query .= "c.category_id=" . $category . " ";
        $query .= "join year y on y.title_id = t.title_id ";
        $query .= "join author a on a.author_id = t.author_id;";

        echo $query;
        $booksofcategory = mysqli_query($dbase, $query);

        // echo json_encode($booksofcategory);
    }
        
}

$dbase = connecttodb();
$parameter = $_GET["format"];


if($dbase != NULL){
    $selectedCategory = $_GET["selectedCategory"];
    if($selectedCategory=="false") {
        $categories = mysqli_query($dbase, "select * from category");
        $list_of_all_categories = array();
        $finfo = $categories->fetch_all(MYSQLI_ASSOC);
        foreach ($finfo as $val){
            array_push($list_of_all_categories, $val[category]);
        }
        printXMLorJSON($list_of_all_categories, $parameter);
    }else{
        querydbforBooksfromCategories(explode(",",$selectedCategory));
    }
}
?>