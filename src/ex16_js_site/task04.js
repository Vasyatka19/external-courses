function Book(title,authorFirstName,authorLastName,rating,image_url,cost,bookBuyCount){
    this.title = title;
    this.author = {firstName: authorFirstName, lastName: authorLastName};
    this.rating = rating;
    this.image_url = image_url;
    this.bookBuyCount = bookBuyCount;
    this.cost = cost;
    this.id = Book.count + 1;
    this.createdAt = Date.parse(new Date());
    Book.count += 1;
}
Book.count = 0;
Book.prototype.setRating = function(rating){
    this.rating = rating;
}
Book.prototype.getElement = function(){
    var div = document.createElement('div');
    div.setAttribute("class","films__list--item")
    div.innerHTML = '<img src="' + this.image_url + '" alt="1">\
        <div>' + this.title + '</div>\
        <div>' + this.author.firstName + " " + this.author.lastName + '</div>\
        <div class="films__list--star">' + getStars(this.rating,this.id) + '</div>'
    return div;

    function getStars(count,id){
        let result = '';
        for(let i = 1; i<=5;i++){
            if(i <= count){
                result += '<div id="' + id + "__" + i + '">★</div>';
            } else{
                result += '<div id="' + id + "__" + i + '">☆</div>';
            }
        }
        return result;
    }
}


function BookScreen(allBooksList){
    this.allBooksList = allBooksList;  
    for (let i = 0; i <this.allBooksList.length; i++){
        this.allBooksList[i].__proto__ = Book.prototype;
    }
    this.bookList = this.allBooksList;
    console.log (this.bookList);
}
BookScreen.prototype.addBook = function(title,authorFirstName,authorLastName,rating,image_url,cost,bookBuyCount){
    this.allBooksList.push(new Book(title,authorFirstName,authorLastName,rating,image_url,cost,bookBuyCount));
    this.bookList = this.allBooksList;
}
BookScreen.prototype.filterBookList = function(callback){
    this.bookList = this.allBooksList.filter(function(el){
        return callback.call(this,el);
    }
    )
}

BookScreen.prototype.bookShow = function(){
    let filmTag = document.getElementById("films__list");
    let history = document.getElementById('menu__item--history');
    history.innerHTML = '';
    filmTag.innerHTML = '';
    for(let i =0;i<this.bookList.length;i++){
        filmTag.appendChild(this.bookList[i].getElement());
    } 

    let sortedList = this.bookList
    for(let i = 0; i < sortedList.length;i++){
        for(let j = 0; j < sortedList.length - 1;j++){
            if(sortedList[j].createdAt < sortedList[j+1].createdAt){
                let min = sortedList[j];
                sortedList[j] = sortedList[j+1];
                sortedList[j+1] = min;
            }
        }
    }
    for(let i = 2;i>=0;i--){
        let historyItem = document.createElement('div');
        historyItem.innerHTML = '<div>🕘</div>\
                                    <div>\
                                        You added <span>' + sortedList[i].title + '</span>by <span>'
                                            + sortedList[i].author.firstName + " " + sortedList[i].author.lastName + '</span>\
                                        <div>' + calculationTime((Date.parse(new Date()) - sortedList[i].createdAt)) + '</div>\
                                    </div>'
        history.insertBefore(historyItem,history.firstChild);
    } 

    
}

makeRequest("https://rsu-library-api.herokuapp.com/books",createBookList);
makeRequest("https://rsu-library-api.herokuapp.com/filters",createFilters);
makeRequest("https://rsu-library-api.herokuapp.com/categories",createCategories);
let BOOKSCREEN;


function createBookList(response){
    BOOKSCREEN = new BookScreen(response);  
    BOOKSCREEN.bookShow();
    
        let filmsList = document.getElementById('films__list');
        filmsList.onclick = function(event){
            var target = event.target;
            while (target != filmsList) {
                if (target.parentNode.getAttribute('class') == 'films__list--star') {
                addBookRating(target);
                return;
                }
                target = target.parentNode;
            }
        }   

        let filters = document.getElementById('films__menu');
        filters.onclick = function(event){
            var target = event.target;
            while (target != this) {
                if (target.getAttribute('class') == 'films__menu--item') {
                addFilter(target);
                return;
                }
                target = target.parentNode;
            }
        }

        let search = document.forms['bookName'];
        search.addEventListener('click',addSearch.bind(null,search));

        let addBookButton = document.getElementsByClassName('menu__button--add')[0];
        addBookButton.addEventListener('click',addBookFormVisible);

        let addBookForm = document.forms['book__add'];
        let add = addBookForm.elements["add"];
        add.addEventListener('click',addBookInList.bind(null,addBookForm));

        addBookForm.onclick = function(event){
            let target = event.target;
            while(target != this){
                if(target.getAttribute('class') == "close"){
                    close(target.parentNode);
                    return;
                }
                target = target.parentNode;
            }
        } 
}

function createFilters(response){
    filmsMenu = document.getElementById('films__menu');
    for(let i = response.length - 1; i>=0;i--){
        let div = document.createElement('div');
        div.setAttribute("id",response[i].id)
        div.setAttribute("class","films__menu--item");
        div.innerHTML = response[i].title;
        filmsMenu.insertBefore(div,filmsMenu.firstChild);
    }
}

function createCategories(response){
    categoriesMenu = document.getElementById("menu__item--two");
    for(let i = response.length - 1; i>=0;i--){
        let div = document.createElement('div');
        div.innerHTML = '<span>●</span>' + response[i].title;
        categoriesMenu.appendChild(div);
    }
}

 function addFilter(el){
    let filters = document.getElementsByClassName('films__menu--item');
    for(let i = 0; i<filters.length; i++){
        filters[i].style.backgroundColor = '#edf0f6';
    }
     el.style.backgroundColor = "#96b2cd";

     switch(el.getAttribute("id")){
         case "1": BOOKSCREEN.filterBookList(function(elem){return true;}); break;
         case "2": BOOKSCREEN.filterBookList(function(elem){return elem.rating >= 4;}); break;
         case "3": BOOKSCREEN.filterBookList(function(elem){return elem.bookBuyCount >= 4;}); break;
         case "4": BOOKSCREEN.filterBookList(function(elem){return elem.cost === 0;}); break;
     }
     BOOKSCREEN.bookShow();
 }
 function addSearch(el){
    let criterial = el.elements["search"].value;
    if(criterial!==null){
        BOOKSCREEN.filterBookList(function(elem){return elem.title.toLowerCase().includes(criterial.toLowerCase())});
        BOOKSCREEN.bookShow();
    }
 }
 function addBookFormVisible(){
    document.getElementById('book__add').style.display = "block";

 }
 function addBookInList(form){

    let name = form.elements["name"].value;
    let authorFirstName = form.elements["firstName"].value;
    let authorLastName = form.elements["lastName"].value;
    let image = form.elements["image"].value;
    let price = parseInt(form.elements["price"].value);
    if(image === ""){
        image = "https://rsu-library-api.herokuapp.com/static/images/nocover.jpg";
    } 
     
     BOOKSCREEN.addBook(
        name,
        authorFirstName,
        authorLastName,
        0,
        image,
        price,
        0
     )

     form.style.display = 'none';
     form.reset();
     BOOKSCREEN.bookShow();
 }
 function addBookRating(el){
     let bookId = el.getAttribute('id');
     let ID = parseInt(bookId.substring(0,bookId.indexOf("__")));
     let rating = parseInt(bookId.substring(bookId.indexOf("__")+2,bookId.length));
     BOOKSCREEN.allBooksList.filter(function(elem){
         return elem.id === ID;
     })[0].setRating(rating)
     BOOKSCREEN.bookShow();
 }

 function close(el){
     el.style.display = 'none'
 }


 function makeRequest(url,callback) {
	var httpRequest;

	if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
        try{
            httpRequest.responseType = 'json';
        }catch(e){ alert("dfh");}     
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {}
		}
	}

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
    }
	httpRequest.onreadystatechange = function() { loadContents(httpRequest,callback); };
	httpRequest.open('GET', url, true);
    httpRequest.send('');
}

function loadContents(httpRequest,callback) {
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
            callback.call(null,httpRequest.response);
		} else {
			alert('There was a problem with the request.');
		}
	}
}
function calculationTime(num){
    switch(true){
        case num > 31536000000 : {return Math.floor(num/31536000000) + " years ago";}
        case num > 2592000000 : {return Math.floor(num/2592000000) + " months ago";}
        case num > 604800000 : {return Math.floor(num/604800000) + " weeks ago";}
        case num > 86400000 : {return Math.floor(num/86400000) + " days ago";}
        case num > 3600000 : {return Math.floor(num/3600000) + " hours ago";}
        default : {return Math.abs(Math.floor(num/60000)) + " minutes ago";}
    }
}