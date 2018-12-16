//VIEW-------------------------------------------------------------------
export let BookView = function BookView(BOOKCONTROLLER){
    this.BOOKCONTROLLER = BOOKCONTROLLER;
}
BookView.prototype.addListeners = function(){
    let thisObj = this;
    let filmsList = document.getElementById('films__list');
    filmsList.onclick = function(event){
        var target = event.target;
        while (target != filmsList) {
            if (target.parentNode.getAttribute('class') == 'films__list--star') {
                thisObj.addBookRating(target);
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
                thisObj.addFilter(target);
            return;
            }
            target = target.parentNode;
        }
    }

    let search = document.forms['bookName'];
    search.addEventListener('keyup',this.addSearch.bind(thisObj,search));

    let addBookButton = document.getElementsByClassName('menu__button--add')[0];
    addBookButton.addEventListener('click',this.addBookFormVisible);

    let addBookForm = document.forms['book__add'];
    let add = addBookForm.elements["add"];
    add.addEventListener('click',this.addBookInList.bind(thisObj,addBookForm));

    addBookForm.onclick = function(event){
        let target = event.target;
         while(target != this){
            if(target.getAttribute('class') == "close"){
                thisObj.close(target.parentNode);
                return;
            }
            target = target.parentNode;
        }
    } 
}


BookView.prototype.bookShow = function(){
    let filmTag = document.getElementById("films__list");
    let history = document.getElementById('menu__item--history');
    history.innerHTML = '';
    filmTag.innerHTML = '';
    this.BOOKCONTROLLER.getBookList().forEach(function(element) {
        filmTag.appendChild(element.getElement());
    })
    let sortedList = this.BOOKCONTROLLER.getAllBooksList().slice(0);
    sortedList.sort((a,b)=>{
        return b.createdAt - a.createdAt;
    });
    for(let i = 2;i>=0;i--){
        let historyItem = document.createElement('div');
        historyItem.innerHTML = '<div>🕘</div>\
                                    <div>\
                                        You added <span>' + sortedList[i].title + '</span>by <span>'
                                            + sortedList[i].author.firstName + " "
                                            + sortedList[i].author.lastName + '</span>\
                                        <div>' 
                                        + this.calculationTime((Date.parse(new Date()) 
                                        - sortedList[i].createdAt)) 
                                        + '</div>\
                                    </div>'
        history.insertBefore(historyItem,history.firstChild);
    }
}
BookView.prototype.createFilters = function (response){ //view
    filmsMenu = document.getElementById('films__menu');
    for(let i = response.length - 1; i>=0;i--){
        let div = document.createElement('div');
        div.setAttribute("id",response[i].id)
        div.setAttribute("class","films__menu--item");
        div.innerHTML = response[i].title;
        filmsMenu.insertBefore(div,filmsMenu.firstChild);
    }
}
BookView.prototype.createCategories = function (response){ //view
    categoriesMenu = document.getElementById("menu__item--two");
    for(let i = response.length - 1; i>=0;i--){
        let div = document.createElement('div');
        div.innerHTML = '<span>●</span>' + response[i].title;
        categoriesMenu.appendChild(div);
    }
}
BookView.prototype.addFilter = function(el){ //view
    let filters = document.getElementsByClassName('films__menu--item');
    for(let i = 0; i<filters.length; i++){
        filters[i].style.backgroundColor = '#edf0f6';
    }
     el.style.backgroundColor = "#96b2cd";
     this.BOOKCONTROLLER.applyFilter(el.getAttribute("id"));    
     this.bookShow();
 }
 BookView.prototype.addSearch = function(el){ //view
    let criterial = el.elements["search"].value;
    if(criterial!==null){
        this.BOOKCONTROLLER.applySearch(criterial);
        this.bookShow();
    }
 }
 BookView.prototype.addBookFormVisible = function(){//view
    let forma = document.getElementById('book__add');
    forma.style.display = "block";
 }
 BookView.prototype.addBookInList = function(form){//view
    let title = checkOnNull(form,"name",null);
    let authorFirstName = checkOnNull(form,"firstName",null);
    let authorLastName = checkOnNull(form,"lastName",null);
    let image = checkOnNull(form,"image","https://rsu-library-api.herokuapp.com/static/images/nocover.jpg");
    let cost = parseInt(checkOnNull(form,"cost",0));
    
    if(title !== null && authorFirstName !== null && authorLastName !== null){
        this.BOOKCONTROLLER.addBook(title,authorFirstName,authorLastName,image,cost);
        form.style.display = 'none';
        form.reset();
        this.bookShow();
    }

     function checkOnNull(el,fieldID,defaultValue){
        if(el.elements['' + fieldID + ''].value===''){
            if(defaultValue === null){
                el.elements['' + fieldID + ''].style.backgroundColor = '#FFB6C1';
            }
            return defaultValue;
        }else {return el.elements['' + fieldID + ''].value}
     }
 }
 BookView.prototype.addBookRating = function(el){//view
     let bookId = el.getAttribute('id');
     let ID = parseInt(bookId.substring(0,bookId.indexOf("__")));
     let rating = parseInt(bookId.substring(bookId.indexOf("__")+2,bookId.length));
     this.BOOKCONTROLLER.addBookRating(ID,rating);
     this.bookShow();
 }

 BookView.prototype.close = function (el){ //view
     el.style.display = 'none'
 }
 BookView.prototype.calculationTime = function(num){
    switch(true){
        case num > 31536000000 : {return Math.floor(num/31536000000) + " years ago";}
        case num > 2592000000 : {return Math.floor(num/2592000000) + " months ago";}
        case num > 604800000 : {return Math.floor(num/604800000) + " weeks ago";}
        case num > 86400000 : {return Math.floor(num/86400000) + " days ago";}
        case num > 3600000 : {return Math.floor(num/3600000) + " hours ago";}
        default : {return Math.abs(Math.floor(num/60000)) + " minutes ago";}
    }
}
