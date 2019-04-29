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
    console.log(data);
    if(data.responseXML){
        list_of_categories = data.responseXML.firstChild.childNodes; //The responseXML returns a document of which categories is the first element. All it's child nodes are the list of categories
    } else {
        console.log(data);
        list_of_categories = data.responseText;
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
            onSuccess: logError,
            onFailure: logError
        });
}

function addBookstoUI(d){
    var returnXML = d.responseXML;
    var books = returnXML.getElementsByTagName("books")[0];
    var currBook = books.firstChild;
    var list_of_books = [];
    while (currBook) {
        var bookAuthor = currBook.firstChild.firstChild.nodeValue;
        var bookCat = currBook.firstChild.nextSibling.firstChild.nodeValue;
        var bookYear = currBook.firstChild.nextSibling.
            nextSibling.firstChild.nodeValue;
        var bookName = currBook.lastChild.firstChild.nodeValue;
        list_of_books.push([bookAuthor, bookCat, bookYear, bookName]);
        currBook = currBook.nextSibling;
    }
    if (list_of_books) {
        var title = document.createElement("div");
        var text = document.createTextNode(list_of_books[0][1] + '":');
        title.appendChild(text);
        $("books").appendChild(title);
    }
    var listbooks = document.createElement("ul");

    for (var i=0; i < list_of_books.length; i++) {
        var li = document.createElement("li");
        var bookItem = list_of_books[i][3] + 
            ", by " + list_of_books[i][0] + 
            " (" + list_of_books[i][2] + ")";
        var row = document.createTextNode(bookItem);
        li.appendChild(row);
        listbooks.appendChild(li);
    }

    $("books").appendChild(listbooks);
}

function parseURL(){
    var format = location.search.substr(1);
    console.log(decodeURIComponent(format.split("format=").pop()));
    return decodeURIComponent(format.split("format=").pop());
}