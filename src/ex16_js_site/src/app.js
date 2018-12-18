
makeRequest("https://rsu-library-api.herokuapp.com/books",createBookList)
function createBookList(bookList){
    const BOOKVIEW = new BookView(new BookController(new BookModel(bookList)));
    makeRequest("https://rsu-library-api.herokuapp.com/filters",BOOKVIEW.createFilters);
    makeRequest("https://rsu-library-api.herokuapp.com/categories",BOOKVIEW.createCategories);
    BOOKVIEW.bookShow();
    BOOKVIEW.addListeners();  
}
