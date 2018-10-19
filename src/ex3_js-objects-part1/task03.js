function searchProp(str, obj){
    return str in obj;
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

      console.log(searchProp("tiger1",animals)); 

