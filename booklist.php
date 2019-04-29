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
        $query = "SELECT title.title_name, category, year.year, author.author from title, category, year, author where title.title_id = year.title_id and title.author_id and author.author_id = title.author_id and category.category = \"". $category." \" and category.category_id = title.category_id;";
        $dbase = connecttodb();
        $booksofcategory = mysqli_query($dbase, $query);
        $list_of_book_category = $booksofcategory->fetch_all(MYSQLI_ASSOC);
        
        if (strcasecmp($_GET["format"], "json")==0) {
			$list_of_books = array();
			foreach ($list_of_book_category as $book) {
				array_push($list_of_books,array($book[author],$book[category],$book[year],$book[title_name]));
			}
			echo json_encode($list_of_books);
		} else {
            $xml = new SimpleXMLElement("<?xml version=\"1.0\" encoding=\"UTF-8\" ?><books></books>");
			foreach ($list_of_book_category as $book) {
				$bookXML = $xml->addChild("book");
				$bookXML->addChild("author", $book[author]);
				$bookXML->addChild("name", $book[category]);
				$bookXML->addChild("year", $book[year]);
				$bookXML->addChild("title", $book[title_name]);
			}
            Header('Content-type: text/xml');	
		    echo $xml->asXML();
		}
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