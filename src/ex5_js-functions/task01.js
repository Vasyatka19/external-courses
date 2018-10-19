let calculator = {
    add:  (a) => {
        if(typeof a === 'number'){
            calculator.result += a;
        }
        return  (b) => {return calculator.add(b);}
    },
    subtract:  (a) => {
        if(typeof a === 'number'){
            calculator.result -= a;
        }
        return  (b) => {return calculator.subtract(b);}
    },
    divide: (a) => {
        if(typeof a === 'number'){
            calculator.result /= a;
        }
        return  (b) => {return calculator.divide(b);}
    },
    multiply: (a) => {
        if(typeof a === 'number'){
            calculator.result *= a;
        }
        return  (b) => {return calculator.multiply(b);}
    },
    getResult: () => {
        return calculator.result;
    },
    reset: () => {
        calculator.result = 0;
    },
    result: 0
}

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
