/**Написать функцию, которая принимает строку и возвращает данную строку,
 *  но в lowerCamelCase нотации. */
function strToLowerCamelCase(str){
    return str.toLowerCase()
        .replace(/(\s)\S/g, a => { return a.toUpperCase(); }) 
        .replace(/\s/g,'')
}
//testing
console.log(strToLowerCamelCase('мне приснилось небо лоНдонA...'));
