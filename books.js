window.onload = startInitialRequest();

function startInitialRequest(){
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