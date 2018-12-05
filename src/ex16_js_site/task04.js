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
    this.allBooksList = [new Book("Jevels of Nizam","Geeta Davi",5,"sources/book-cover1.jpg",155,5),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover2.jpg',1255,10),
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
    switch (paramName){
        case bookName: { this.bookList = this.bookList.filter(function(el){
            el.bookName.includes(criterial);
        })}
        case bookRating: {this.bookList = this.bookList.filter(function(el){
            el.bookRating > criterial;
        })}
        case bookBuyCount: {this.bookList = this.bookList.filter(function(el){
            el.bookBuyCount > criterial;
        })}
        case bookPrice: {this.bookList = this.bookList.filter(function(el){
            el.bookPrice = criterial;
        })}
        default: {return this.bookList.reduce();}
    }
    
}
BookScreen.prototype.bookShow = function(){
    let filmTag = document.getElementById("films__list");
    for(let i =0;i<this.bookList.length;i++){
        filmTag.appendChild(this.bookList[i].getElement());
    } 
}


const BOOKSCREEN = new BookScreen();  

window.onload = function() {
    BOOKSCREEN.bookShow();
 };
