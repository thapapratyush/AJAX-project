window.onload = startInitialRequest(err);

function startInitialRequest(err){
    var request = new Ajax.request("booklist.php",{
        method: "GET",
        parameters: {},
        onSuccess: getAllCategoriesfromdb,
        onFailure: logError(err)
    });
}

function logError(msg){
    console.log(msg);
}