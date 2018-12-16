import {BookController} from '/controllers/bookController.js'
import {BookModel} from  "src/models/BookModel.js"
import {BookModel} from  "/models/State.js";
import {BookView} from  "src/views/bookView.js"

let STATE = new State();
STATE.makeRequest("https://rsu-library-api.herokuapp.com/books",createBookList)
function createBookList(bookList){
    const BOOKVIEW = new BookView(new BookController(new BookModel(bookList)));
    STATE.makeRequest("https://rsu-library-api.herokuapp.com/filters",BOOKVIEW.createFilters);
    STATE.makeRequest("https://rsu-library-api.herokuapp.com/categories",BOOKVIEW.createCategories);
    BOOKVIEW.bookShow();
    BOOKVIEW.addListeners();  
}
