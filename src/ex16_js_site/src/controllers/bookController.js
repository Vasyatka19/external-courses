//CONTROLLER-------------------------
export let BookController = function BookController(BOOKMODEL){
    this.BOOKMODEL = BOOKMODEL;
}

BookController.prototype.applyFilter = function(criterial){
    switch(criterial){
        case "1": this.BOOKMODEL.filterBookList(function(elem){return true;}); break;
        case "2": this.BOOKMODEL.filterBookList(function(elem){return elem.rating >= 4;}); break;
        case "3": this.BOOKMODEL.filterBookList(function(elem){return elem.bookBuyCount >= 4;}); break;
        case "4": this.BOOKMODEL.filterBookList(function(elem){return elem.cost === 0;}); break;
    }
}
BookController.prototype.applySearch = function(criterial){
    this.BOOKMODEL.filterBookList(function(elem){
        return elem.title.toLowerCase().includes(criterial.toLowerCase())
    });
}
BookController.prototype.addBook = function(title,authorFirstName,authorLastName,image,cost){
    this.BOOKMODEL.addBook(title, authorFirstName, authorLastName, 0,image,cost,0);
}
BookController.prototype.addBookRating = function(ID,rating){
    this.BOOKMODEL.allBooksList.find((elem) => {return elem.id === ID;}).setRating(rating);
}
BookController.prototype.getBookList = function(){
    return this.BOOKMODEL.bookList;
}
BookController.prototype.getAllBooksList = function(){
    return this.BOOKMODEL.allBooksList;
}