/**функция, которая принимает строку и возвращает эту же строку, 
 * но с заглавным первым символом каждого слова. */

function EveryFirstToUpperCase(str){
    return str.replace(/(?:^|\s)\S/g, a => { return a.toUpperCase(); });
}

//testing
console.log(EveryFirstToUpperCase('А вы львы, не вы ли выли у Невы?'));