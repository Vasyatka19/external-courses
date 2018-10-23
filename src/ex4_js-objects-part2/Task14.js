/**Написать функцию, которая возвращает целое случайное число в диапазоне от [`min`; `max`] */
function randomNum(){
    return Math.floor(Math.random() * 100);
}

//testing
console.log(randomNum())