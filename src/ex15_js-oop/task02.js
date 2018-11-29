function Calc(){
    let result = 0;
}

Calc.prototype.add = function add(a)  {
    if(typeof a === 'number'){
        result += a;
    }
    return add;
}
Calc.prototype.subtract = function subtract(a) {
    if(typeof a === 'number'){
        result -= a;
    }
    return  subtract;
}
Calc.prototype.divide = function divide(a)  {
    if(typeof a === 'number'){
        result /= a;
    }
    return  divide;
}
Calc.prototype.multiply = function multiply(a) {
    if(typeof a === 'number'){
        result *= a;
    }
    return  multiply;
}
Calc.prototype.setState = function setState(a){
    if(typeof a ==='number'){
        result = a;
    }
    return setState;
}
Calc.prototype.fetchData = function fetchData(callBack){
    callBack.call(this);
}
Calc.prototype.getResult = function() {
    return result;
}
Calc.prototype.reset = function() {
    result = 0;
}


function PocketCalc(){
    Calc.call(this);
}
PocketCalc.prototype = Object.create(Calc.prototype);
PocketCalc.prototype.calculator = PocketCalc;
PocketCalc.prototype.putInPocket = function(){
    console.log('Убран в карман.')
}

function TableCalc(){
    Calc.call(this);
}
TableCalc.prototype = Object.create(Calc.prototype);
TableCalc.prototype.calculator = TableCalc;
TableCalc.prototype.putInTableBox = function(){
    console.log('Убран в яшик стола.')
}



let calculator = Calc();

calculator.add(5)(2)()(8)(12)();
console.log(calculator.getResult());

calculator.reset();
console.log(calculator.getResult());

calculator.add(5)(2)()(8)(12)();
console.log(calculator.getResult());

calculator.subtract(5)(2)()(8)(2)();
console.log(calculator.getResult());

calculator.divide(2)(2)();
console.log(calculator.getResult());

calculator.multiply(4)(2)();
console.log(calculator.getResult());

calculator.setState(5000);
console.log(calculator.getResult());

calculator.fetchData(function(){this.setState(500);});
console.log(calculator.getResult());