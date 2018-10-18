/**Написать функцию, которая посчитает сколько раз каждый символ встречается в строке. */
function symbolCount(str,symb){
    let count = 0;
    for(let i = 0; i < str.length; i++){
        if(str[i] === symb){
            ++count;
        }
    }
    return symb + ' встречается ' + count + ' раз(а).'
}

function sCount(str){
    for(let i = 0; i < str.length; i++){
        if(str.indexOf(str[i]) === i){
            console.log(symbolCount(str,str[i]))
        }
    }
} 

//testing
sCount("keep calm and features");