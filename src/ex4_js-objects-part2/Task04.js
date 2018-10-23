/**Функция, которая принимает строку и возвращает эту же строку, <br>
 * но с заглавным первым символом. */
function firstSymbolToUpperCase(str){
    return str.substring(0,1).toUpperCase() 
            + str.substring(1,str.length)
}

//testing
console.log(firstSymbolToUpperCase('ля-ля, тополя..'))