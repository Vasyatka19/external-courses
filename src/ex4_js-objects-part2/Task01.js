function serchPropInPorototype(propName, obj){
    let proto = obj.__proto__
    return propName in proto;
}


let animals = { 
    tiger: { 
        name: 'Amur', 
        age: 8, 
        status: 'hungry' },
    goal: {    
        name: 'Timur', 
        age: 5, 
        status: 'hungry' } }

let tiger1 = Object.create(animals.tiger);
tiger1["color"] = "red";

console.log(serchPropInPorototype("name",tiger1));

