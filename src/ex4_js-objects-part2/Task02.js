/**функция, которая создает пустой объект, но без прототипа. */
function createObject(){
    return Object.create(null);
}

//testing
console.log(createObject());