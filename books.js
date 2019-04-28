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
    var container = document.getElementById('container_for_categories');
    console.log(data);
    if(data.responseXML){
        var list_of_categories = data.responseXML.firstChild.childNodes; //The responseXML returns a document of which categories is the first element. All it's child nodes are the list of categories
        for(var category of list_of_categories){
            var elem = document.createElement('div');
            var attachRadioBtn = document.createElement("input");
            attachRadioBtn.type = "checkbox";
            elem.id = category.nodeName;
            elem.innerHTML = category.nodeName;
            attachRadioBtn.value = category.nodeName;
            elem.appendChild(attachRadioBtn);
            if(elem){
                container.appendChild(elem);
            }    
        }
        var submitBtn = document.createElement("input");
        submitBtn.type = "submit";
        submitBtn.value = "List Books";
        container.appendChild(submitBtn);
    }
}

function parseURL(){
    var format = location.search.substr(1);
    return decodeURIComponent(format.split("=").pop());
}