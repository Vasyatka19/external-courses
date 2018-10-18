/**функция, которая складывает два числа и результат 
 * округляется до 3го знака после запятой. 
 * Возвращаемый результат должен быть числом. */
function sumAndRounding(a,b){
    return (a + b).toFixed(3);
}

//testing
console.log(sumAndRounding(25.144411,5,1111111))