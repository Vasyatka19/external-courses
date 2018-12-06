function Present(){
    this.candyArr = [];
}
Present.prototype.addCandy = function(candy){
    this.candyArr.push(candy)
    return this;
}
Present.prototype.getWeight = function(){
    return this.candyArr.reduce(function(acc,elem){
        return acc +=elem.weight;
    },0)
}
Present.prototype.sortByWeight = function(){
    for(let i = 0;i<this.candyArr.length;i++){
        for(let j = 0;j<this.candyArr.length-1;j++){
            if(this.candyArr[j].weight>=this.candyArr[j+1].weight){
                var max = this.candyArr[j];
                this.candyArr[j] = this.candyArr[j+1];
                this.candyArr[j+1] = max;
            }
        }
    }
    return this;
}

Present.prototype.searchForName = function(name){
   return this.candyArr.filter(function(elem){
        return elem.name === name;
    });
}


function Candy(type,name,weight){
    this.type = type;
    this.name = name;
    this.weight = weight;
}
function ChocolateCandy(name,weight){
    this.name = name;
    Candy.call(this,'Chocolate',name,weight)
}
ChocolateCandy.prototype = Object.create(Candy.prototype);
ChocolateCandy.prototype.constructor = ChocolateCandy;
function CaramelCandy(name,weight){
    this.name = name;
    Candy.call(this,'Caramel',name,weight)
}
CaramelCandy.prototype = Object.create(Candy.prototype);
CaramelCandy.prototype.constructor = CaramelCandy;

present = new Present();
present.addCandy(new ChocolateCandy("Мишка на севере",25));
present.addCandy(new ChocolateCandy("Умка",15));
present.addCandy(new ChocolateCandy("Сникерс",30));

present.addCandy(new CaramelCandy("Барбариска",17));
present.addCandy(new CaramelCandy("Дюшес",24));
present.addCandy(new CaramelCandy("Шок",48));

console.log(present.getWeight());
console.log(present.sortByWeight().candyArr);
console.log(present.searchForName('Умка'));
