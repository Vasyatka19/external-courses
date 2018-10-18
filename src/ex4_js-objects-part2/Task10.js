/**Написать функцию, которая принимает строку и возвращает перевернутую строку.*/
function oppositeStr(str){
    var result = "";
    for (let i = str.length - 1;i >= 0;i--){
        result = result + str[i];
    }
    return result;
}

//testing
console.log(oppositeStr('А роза упала на лапу Азора'))