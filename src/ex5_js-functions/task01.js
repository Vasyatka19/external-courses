function calc(){
    let result = 0;
    return {
        add:  function add(a)  {
            if(typeof a === 'number'){
                result += a;
            }
            return  function(b)  {return add(b);}
        },
        subtract:  function subtract(a) {
            if(typeof a === 'number'){
                result -= a;
            }
            return  function(b) {return subtract(b);}
        },
        divide: function divide(a)  {
            if(typeof a === 'number'){
                result /= a;
            }
            return  function(b) {return divide(b);}
        },
        multiply: function multiply(a) {
            if(typeof a === 'number'){
                result *= a;
            }
            return  function(b) {return multiply(b);}
        },
        getResult: function() {
            return result;
        },
        reset: function() {
            result = 0;
        }
    }
}

let calculator = calc();

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