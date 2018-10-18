/**функция, которая принимает строку в другую строку, 
 * после переданного номера слова. */
function pasteToString(parentStr,includeStr,num){
    let count = 0;
    for(let i = 0; i < parentStr.length; i++){
        if(parentStr[i] === ' '){
            ++count;
        }
        if(count === num){
            return parentStr.substring(0,i) + includeStr + parentStr.substring(i, parentStr.length);
        }
    }
    if(num > count){
        return parentStr + includeStr
    }
}

//testing 
console.log(pasteToString("мама, я хочу."," Пикачу",2))