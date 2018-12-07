function Calc(){
    this.result = 0;
}

Calc.prototype.valueCheck = function(a){
    return (typeof a === 'number' && !isNaN(a));
}
Calc.prototype.add = function(a)  {
    if(this.valueCheck(a)){
        this.result += a;
    
    return this;
}
Calc.prototype.subtract = function(a) {
    if(this.valueCheck(a)){
        this.result -= a;
    }
    return  this;
}
Calc.prototype.divide = function(a)  {
    if(this.valueCheck(a)){
        this.result /= a;
    }
    return  this;
}
Calc.prototype.multiply = function(a) {
    if(this.valueCheck(a)){
        this.result *= a;
    }
    return  this;
}
Calc.prototype.setState = function (a){
    if(this.valueCheck(a)){
        this.result = a;
    }
    return this;
}
Calc.prototype.getResult = function() {
    return this.result;
}
Calc.prototype.reset = function() {
    this.result = 0;
    return this;
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
 
let pocketCalc = new PocketCalc();
pocketCalc.add(NaN)
        .multiply(2)
        .divide(20)
        .reset()
        .subtract(1)
console.log(pocketCalc.getResult())
pocketCalc.putInPocket();

let tableCalc = new TableCalc();
tableCalc.add(100)
        .multiply(2)
        .divide(0)
        .reset()
        .subtract(1)
console.log(tableCalc.getResult())
tableCalc.putInTableBox();

