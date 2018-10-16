function searchProp(str, obj){

    return str in obj;
    // for(var key in obj){
    //     if(key===str){
    //         return true;
    //     }
    // }
    // return false;
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

