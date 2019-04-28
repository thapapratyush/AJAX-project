window.onload = startInitialRequest();

function startInitialRequest(){
    var format = parseURL();
    new Ajax.Request("booklist.php",{
        method: "GET",
        parameters: {format: format},
        onSuccess: getAllCategoriesfromdb,
        onFailure: logError
    });
    console.log(document.getElementById('errorMsg'));
}

function logError(msg){
    console.log(document.getElementById('errorMsg'));
}

function getAllCategoriesfromdb(data){
    if(data.responseXML){
        console.log(data.responseXML);
    }
}

function parseURL(){
    var format = location.search.substr(1);
    return decodeURIComponent(format.split("=").pop());
}