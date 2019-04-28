window.onload = startInitialRequest();

function startInitialRequest(){
    console.log(parseURL());
    new Ajax.Request("booklist.php",{
        method: "GET",
        parameters: {},
        onSuccess: getAllCategoriesfromdb,
        onFailure: logError
    });
}

function logError(msg){
    console.log(msg);
}

function getAllCategoriesfromdb(data){
    console.log(data);
}

function parseURL(){
    var format = location.search.substr(1);
    return decodeURIComponent(format.split("=").pop());
}