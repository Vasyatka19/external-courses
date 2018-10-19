function addPropName(str, obj){
    if((str in obj) === false){
        obj[str] = "new";
    }   
    return obj;
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

console.log(addPropName("tiger",animals));