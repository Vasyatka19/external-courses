function copyObjectWithRecursion(obj){
    var resultObj = {};
    for(var key in obj){
        if(typeof obj[key] === "object"){
            resultObj[key] = copyObjectWithRecursion(obj[key]);
        } else{
            resultObj[key] = obj[key];
        }
    }
    return resultObj;
}

var animals = { 
    tiger: { 
        name: 'Amur', 
        age: 8, 
        status: 'hungry' },
    goal: {    
        name: 'Timur', 
        age: 5, 
        status: 'hungry' } }

console.log(copyObjectWithRecursion(animals));