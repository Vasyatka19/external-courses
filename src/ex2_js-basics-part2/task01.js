function getType(val){
    switch(typeof val){
        case "string": {
            return "Строка";
        } 
        case "number": {
            return "Число";
        }
        default: {
            return "undefined";
        }
    }
}
console.log(getType("ffh"));


// function getType1(val){
// return typeof(val);
// }
// console.log(getType1(1z));