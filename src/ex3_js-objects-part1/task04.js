function addPropName(str, obj){
    for(var key in obj){
        if(key===str){
            return obj;
        }
    }
    obj[str] = "new";
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

console.log(addPropName("tiger1",animals));