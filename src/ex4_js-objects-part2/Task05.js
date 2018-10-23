/**Функция, которая ищет одну строку в другой строке и возвращает `true`,<br>
 *  если такая строка найдена. */
function searchStr(parentStr, str){
    return parentStr.includes(str);
}

//testing
console.log(searchStr('А вы львы, не вы ли выли у Невы?', ' львы'));
console.log(searchStr('А вы львы, не вы ли выли у Невы?', ' вылильвы'));