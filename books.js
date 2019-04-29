window.onload = startInitialRequest();

function startInitialRequest(){
    var format = parseURL();
    new Ajax.Request("booklist.php",{
        method: "GET",
        parameters: {format: format,selectedCategory:"false",},
        onSuccess: getAllCategoriesfromdb,
        onFailure: logError
    });
    console.log(document.getElementById('errorMsg'));
}

function logError(msg){
    console.log(msg);
}

function getAllCategoriesfromdb(data){
    var list_of_categories = []
    if(isJSON(data.responseText)){
        list_of_categories = JSON.parse(data.responseText);
    }else if(data.responseXML){
        list_of_categories = data.responseXML.firstChild.childNodes; //The responseXML returns a document of which categories is the first element. All it's child nodes are the list of categories
    }
    addCategoriestoUI(list_of_categories);
}

function addCategoriestoUI(list_of_categories){
    var container = document.getElementById('container_for_categories');
    for(var category of list_of_categories){
            var attachRadioBtn = document.createElement("input");
            attachRadioBtn.type = "checkbox";
            attachRadioBtn.value = category.nodeName;
            attachRadioBtn.name = "category_name";
            var label = document.createElement('label');
            label.appendChild(document.createTextNode(category.nodeName));
            if(attachRadioBtn){
                container.appendChild(attachRadioBtn);
                container.appendChild(label);
            }    
    }
    var submitBtn = document.createElement("button");
    submitBtn.innerHTML = "List Books";
    submitBtn.addEventListener("click", fetchBooksfromCategories);
    container.appendChild(submitBtn);
}

function fetchBooksfromCategories(){
    var categoriestoGet = [];
    var checkedCategories = document.getElementsByName("category_name");
    for (var category of checkedCategories){
        if(category.checked){
            categoriestoGet.push(category.value);
        }
    }
    if (categoriestoGet != null){
        getBooksfromCategory(categoriestoGet);
    }
}

function getBooksfromCategory(selectedCategory){
    new Ajax.Request("booklist.php",{
            method:"GET",
            parameters:{
                format:parseURL(),
                selectedCategory:selectedCategory.toString(),
            },
            onSuccess:logError,

        });
}

function parseURL(){
    var format = location.search.substr(1);
    console.log(decodeURIComponent(format.split("format=").pop()));
    return decodeURIComponent(format.split("format=").pop());
}