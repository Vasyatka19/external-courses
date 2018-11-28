function Shape (type){
    this.type = type;
}
    Shape.prototype.getType = function(){
        console.log(this.type)
    }
    Shape.prototype.getPerimeter = function(){

        
    }
    Shape.prototype.draw = function(){
        console.log("name is drawn");
    }

function Triangle(a,b,c){
    Shape.call(this,arguments);
    this.a = a;
    this.b = b;
    this.c = c;
}
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

function Square(a,b,c,d){
    Shape.call(this,arguments)
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}
Square.prototype =  Object.create(Shape.prototype);
Square.prototype.constructor = Square;

//function littleTriangle()
var triangle = new Triangle(2,2,2);
triangle.getPerimeter();