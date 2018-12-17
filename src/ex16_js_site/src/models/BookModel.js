let Book = function Book(title,authorFirstName,authorLastName,rating,image_url,cost,bookBuyCount){
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
    div.setAttribute("class","books__list--item")
    div.innerHTML = '<img src="' + this.image_url + '" alt="1">\
        <div>' + this.title + '</div>\
        <div>' + this.author.firstName + " " + this.author.lastName + '</div>\
        <div class="books__list--star">' + getStars(this.rating,this.id) + '</div>'
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

let BookModel = function BookModel(allBooksList){
    this.allBooksList = allBooksList.map(b => new Book(b.title,b.author.firstName,
        b.author.lastName,b.rating,b.image_url,b.cost,0));  
    this.bookList = this.allBooksList;
}
BookModel.prototype.addBook = function(book){
    this.allBooksList.push(book);
    this.bookList = this.allBooksList;
}
BookModel.prototype.filterBookList = function(callback){
    this.bookList = this.allBooksList.filter(function(el){
        return callback.call(this,el);
    }
    )
}
