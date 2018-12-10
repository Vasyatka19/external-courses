function Book(title,author,rating,image_url,cost,bookBuyCount){
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.image_url = image_url;
    this.bookBuyCount = bookBuyCount;
    this.cost = cost;
    this.id = Book.count + 1;
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
        <div>' + this.author + '</div>\
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
BookScreen.prototype.addBook = function(title,author,rating,image_url,cost,bookBuyCount){
    this.allBooksList.push(new Book(title,author,rating,image_url,cost,bookBuyCount));
    this.bookList = this.allBooksList;
}
BookScreen.prototype.filterBookList = function(paramName,criterial){
    this.bookList = this.allBooksList.filter(function(el){
        switch(paramName){
            case "bookName": {return el.title.toLowerCase().includes(criterial.toLowerCase());}
            case "bookRating": {return el.rating >= 4;}
            case "bookBuyCount": {return el.bookBuyCount >= 4;}
            case "bookPrice": {return el.cost === 0;}
            default: {return true;}
        }
    }
    )
}

BookScreen.prototype.bookShow = function(){
    let filmTag = document.getElementById("films__list");
    filmTag.innerHTML = '';
    for(let i =0;i<this.bookList.length;i++){
        filmTag.appendChild(this.bookList[i].getElement());
    } 
}

makeRequest("https://rsu-library-api.herokuapp.com/books");
let BOOKSCREEN;
function createBookList(response){
    BOOKSCREEN = new BookScreen(response);  
   // window.onload = function() {
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
        //add.addEventListener('click',makeRequest.bind(null,"https://rsu-library-api.herokuapp.com/books"));
        add.addEventListener('click',addBookInList.bind(null,addBookForm));
        //makeRequest

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
  //  }
}

 function addFilter(el){
    let filters = document.getElementsByClassName('films__menu--item');
    for(let i = 0; i<filters.length; i++){
        filters[i].style.backgroundColor = '#edf0f6';
    }
     el.style.backgroundColor = "#96b2cd";
     BOOKSCREEN.filterBookList(el.getAttribute('name'));
     BOOKSCREEN.bookShow();
 }
 function addSearch(el){
    let criterial = el.elements["search"].value;
    if(criterial!==null){
        BOOKSCREEN.filterBookList('bookName',criterial);
        BOOKSCREEN.bookShow();
    }
 }
 function addBookFormVisible(){
    document.getElementById('book__add').style.display = "block";

 }
 function addBookInList(form){

    let name = form.elements["name"].value;
    let author = form.elements["author"].value;
    let image = form.elements["image"].value;
    let price = parseInt(form.elements["price"].value);
    if(image === ""){
        image = "https://rsu-library-api.herokuapp.com/static/images/nocover.jpg";
    } 
     
     BOOKSCREEN.addBook(
        name,
        author,
        0,
        image,
        price,
        0
     )
     let history = document.getElementById('menu__item--history');
     let historyItem = document.createElement('div');
     historyItem.innerHTML = '<div>🕘</div>\
                                    <div>\
                                        You added <span>' + form.elements["name"].value + '</span>by <span>'
                                         + form.elements["author"].value + '</span> to your Must Read Titles\
                                        <div>24 minutes ago</div>\
                                    </div>'
     history.insertBefore(historyItem,history.firstChild);
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


 function makeRequest(url) {
	var httpRequest;

	if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
        httpRequest.responseType = 'json';
	} 

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
    }
	httpRequest.onreadystatechange = function() { loadContents(httpRequest); };
	httpRequest.open('GET', url, true);
    httpRequest.send('');
    //return httpRequest.response;
}

function loadContents(httpRequest) {
	if (httpRequest.readyState == 4) {
		if (httpRequest.status == 200) {
            createBookList(httpRequest.response);
		} else {
			alert('There was a problem with the request.');
		}
	}
}