function copyObject(obj){
    var resultObj = {};
    Object.assign(resultObj,obj); // clonedeep
    return resultObj;
}
copyObject(animals);

var animals = { 
    tiger: { 
        name: 'Amur', 
        age: 8, 
        status: 'hungry' },
    goal: {    
        name: 'Timur', 
        age: 5, 
        status: 'hungry' } }

console.log(copyObject(animals));