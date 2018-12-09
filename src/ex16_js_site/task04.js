function Book(bookName,bookAuthor,bookRating,bookImage,bookPrice,bookBuyCount){
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookRating = bookRating;
    this.bookImage = bookImage;
    this.bookBuyCount = bookBuyCount;
    this.bookPrice = bookPrice;
    this.bookID = Book.count + 1;
    Book.count += 1;
}
Book.count = 0;
Book.prototype.setRating = function(rating){
    this.bookRating = rating;
}
Book.prototype.getElement = function(){
    var div = document.createElement('div');
    div.setAttribute("class","films__list--item")
    div.innerHTML = '<img src="' + this.bookImage + '" alt="1">\
        <div>' + this.bookName + '</div>\
        <div>' + this.bookAuthor + '</div>\
        <div class="films__list--star">' + getStars(this.bookRating,this.bookID) + '</div>'
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


function BookScreen(){
    this.allBooksList = [new Book("Jevels of Nizam","Geeta Davi",4,"sources/book-cover1.jpg",155,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',2,'sources/book-cover2.jpg',1255,10),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover3.jpg',155,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover4.jpg',155,0),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover5.jpg',0,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover6.jpg',1855,25),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover7.jpg',155,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover8.jpg',0,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover9.jpg',155,15),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover10.jpg',0,40)];
    this.bookList = this.allBooksList;
}
BookScreen.prototype.addBook = function(bookName,bookAuthor,bookRating,bookImage,bookPrice,bookBuyCount){
    this.allBooksList.push(new Book(bookName,bookAuthor,bookRating,bookImage,bookPrice,bookBuyCount));
    this.bookList = this.allBooksList;
}
BookScreen.prototype.filterBookList = function(paramName,criterial){
    this.bookList = this.allBooksList.filter(function(el){
        switch(paramName){
            case "bookName": {return el.bookName.toLowerCase().includes(criterial.toLowerCase());}
            case "bookRating": {return el.bookRating >= 4;}
            case "bookBuyCount": {return el.bookBuyCount >= 4;}
            case "bookPrice": {return el.bookPrice === 0;}
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


const BOOKSCREEN = new BookScreen();  

window.onload = function() {
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
     let id = el.getAttribute('id');
     let bookID = parseInt(id.substring(0,id.indexOf("__")));
     let rating = parseInt(id.substring(id.indexOf("__")+2,id.length));
     BOOKSCREEN.allBooksList.filter(function(elem){
         return elem.bookID === bookID;
     })[0].setRating(rating)
     BOOKSCREEN.bookShow();
 }

 function close(el){
     el.style.display = 'none'
 }