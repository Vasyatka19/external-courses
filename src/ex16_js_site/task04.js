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
    updateEventListeners();
}


const BOOKSCREEN = new BookScreen();  

window.onload = function() {
    BOOKSCREEN.bookShow();
 };




 function updateEventListeners(){

    let filters = document.getElementsByClassName('films__menu--item');
    for(let i = 0; i<filters.length; i++){
  //      filters[i].removeEventListener('click',addFilter.bind(null,filters[i]));
        filters[i].addEventListener('click',addFilter.bind(null,filters[i]));
    }
    let search = document.forms['bookName'];
 //   search.removeEventListener('click',addSearch.bind(null,search));
    search.addEventListener('click',addSearch.bind(null,search));

    let addBookButton = document.getElementsByClassName('menu__button--add')[0];
 //   addBookButton.removeEventListener('click',addBookFormVisible);
    addBookButton.addEventListener('click',addBookFormVisible);

    let addBookForm = document.forms['book__add'];
    let add = addBookForm.elements["add"];
  //  add.removeEventListener('click',addBookInList.bind(null,addBookForm));
    add.addEventListener('click',addBookInList.bind(null,addBookForm));

    let allStarsList = document.getElementsByClassName('films__list--star');
    for(let j = 0; j<allStarsList.length;j++){
        let stars = allStarsList[j].childNodes;
        for(let i = 0;i<stars.length;i++){
           // stars[i].removeEventListener('click',addBookRating.bind(null,stars[i]))
            stars[i].addEventListener('click',addBookRating.bind(null,stars[i]))
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
     
     BOOKSCREEN.addBook(
        form.elements["name"].value,
        form.elements["author"].value,
        0,
        form.elements["image"].value,
        parseInt(form.elements["price"].value),
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