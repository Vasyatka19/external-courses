function AllProperties(obj){
    for(var key in obj){
        if(typeof obj[key] === "object"){
            console.log(key + ":")
            AllProperties(obj[key]);
        }else{
            console.log(key + ": " + obj[key]);
        }
    }
}

var animals = { tiger: { name: 'Amur', age: 8, status: 'hungry' },
goal: { name: 'Timur', age: 5, status: 'hungry' } }
AllProperties(animals);