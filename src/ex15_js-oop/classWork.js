function Shape (type){
    this.type = type;
}
    Shape.prototype.getType = function(){
       return "Тип фигуры = " + this.type;
    }
    Shape.prototype.getPerimeter = function(){
        return "Периметр = 0 ";
    }
    Shape.prototype.draw = function(){
        console.log(this.type + " is drawn");
    }

function Triangle(a,b,c){
    Shape.call(this,"Triangle");
    this.a = a;
    this.b = b;
    this.c = c;
}
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;
Triangle.prototype.getPerimeter = function(){
    return "Периметр = " + (this.a + this.b + this.c);
}

function Square(a,b,c,d){
    Shape.call(this,"Square")
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
}
Square.prototype =  Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.getPerimeter = function(){
    return "Периметр = " + (this.a + this.b + this.c + this.d);
}

function RightTriangle(a){
    Triangle.call(this,a,a,a);
}
RightTriangle.prototype = Object.create(Triangle.prototype);
RightTriangle.prototype.constructor = RightTriangle;


var triangle = new Triangle(2,5,4);
var square = new Square(2,4,5,8);
var rightTriangle = new RightTriangle(2);
console.log(triangle.getType());
console.log(triangle.getPerimeter());
triangle.draw();
console.log(square.getType());
console.log(square.getPerimeter());
square.draw();
console.log(rightTriangle.getType());
console.log(rightTriangle.getPerimeter());
rightTriangle.draw();
