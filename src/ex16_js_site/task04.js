function Book(bookName,bookAuthor,bookRating,bookImage){
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookRating = bookRating;
    this.bookImage = bookImage;
}
Book.prototype.getElement = function(){
    var div = document.createElement('div');
        div.className = 'films__list--item';
        div.innerHTML = '<div class="films__list--item">\
        <img src="' + this.bookImage + '" alt="1">\
        <div>' + this.bookName + '</div>\
        <div>' + this.bookAuthor + '</div>\
        <div class="films__list--star">★★★★★</div>\
    </div>'
    return div;
}

function BookScreen(){
    this.bookList = [new Book("Jevels of Nizam","Geeta Davi",5,"sources/book-cover1.jpg"),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover2.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover3.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover4.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover5.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover6.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover7.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover8.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover9.jpg'),
                    new Book('Cakes and Bakes','Sanjeev Kapoor',5,'sources/book-cover10.jpg')];
    
}
BookScreen.prototype.addBook = function(bookName,bookAuthor,bookRating,bookImage){
    bookList.push(new Book(bookName,bookAuthor,bookRating,bookImage));
}
BookScreen.prototype.getBookList = function(){
    return this.bookList;
}
BookScreen.prototype.filterBookList = function(){
    return this.bookList.reduce();
}
BookScreen.prototype.bookShow = function(){
    let filmTag = document.getElementById("films__list");
    filmTag.innerHTML = '<div><div>'
    // var container = document.createElement('div')
    // for(let i =0;i<this.bookList.length;i++){
    //     alert(this.bookList[i].getElement());
    //     container.innerHTML = this.bookList[i].getElement();
    // } 
}

const BOOKSCREEN = new BookScreen();  

BOOKSCREEN.bookShow();