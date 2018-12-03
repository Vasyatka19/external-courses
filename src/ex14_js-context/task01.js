function Calculator(){
        this.result = 0;
        this.add =  function(a)  {
            if(typeof a === 'number'){
                this.result += a;
            }
            return this;
        }
        this.subtract =  function(a) {
            if(typeof a === 'number'){
                this.result -= a;
            }
            return  this;
        }
        this.divide = function(a)  {
            if(typeof a === 'number'){
                this.result /= a;
            }
            return  this;
        }
        this.multiply = function(a) {
            if(typeof a === 'number'){
                this.result *= a;
            }
            return  this;
        }
        this.setState = function(a){
            if(typeof a ==='number'){
                this.result = a;
            }
            return this;
        }
        this.fetchData = function(callBack){
            setTimeout(callBack.bind(this),2000);
        }
        this.getResult = function() {
            return this.result;
        }
        this.reset = function() {
            this.result = 0;
            return this;
        }

}

var Calculator = new Calculator();

const result = Calculator.add(100)
.multiply(2)
.divide(20)
.reset()
.subtract(1)
.getResult();

console.log(result); // -1

Calculator.setState(1);

console.log(Calculator.getResult()); // 1

Calculator.fetchData(function(){this.setState(500);});
