function calc(){
    let result = 0;
    return {
        add:  function(a)  {
            if(typeof a === 'number'){
                result += a;
            }
            return  function(b)  {return calculator.add(b);}
        },
        subtract:  function(a) {
            if(typeof a === 'number'){
                result -= a;
            }
            return  function(b) {return calculator.subtract(b);}
        },
        divide: function(a)  {
            if(typeof a === 'number'){
                result /= a;
            }
            return  function(b) {return calculator.divide(b);}
        },
        multiply: function(a) {
            if(typeof a === 'number'){
                result *= a;
            }
            return  function(b) {return calculator.multiply(b);}
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