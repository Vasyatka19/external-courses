function Book(bookName,bookAuthor,bookRating,bookImage,bookPrice,bookBuyCount){
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookRating = bookRating;
    this.bookImage = bookImage;
    this.bookBuyCount = bookBuyCount;
    this.bookPrice = bookPrice;
}
Book.prototype.getElement = function(){
    var div = document.createElement('div');
    div.setAttribute("class","films__list--item")
    div.innerHTML = '<img src="' + this.bookImage + '" alt="1">\
        <div>' + this.bookName + '</div>\
        <div>' + this.bookAuthor + '</div>\
        <div class="films__list--star">★★★★★</div>'
    return div;
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
BookScreen.prototype.addBook = function(bookName,bookAuthor,bookRating,bookImage){
    allBooksList.push(new Book(bookName,bookAuthor,bookRating,bookImage));
}
BookScreen.prototype.getBookList = function(){
    return this.bookList;
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

    let filters = document.getElementsByClassName('films__menu--item');
    for(let i = 0; i<filters.length; i++){
        filters[i].addEventListener('click',addFilter.bind(null,filters[i]));
    }
    let search = document.forms['bookName'];
    search.addEventListener('click',addSearch.bind(null,search));
 };

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