var animals = {};

animals["tiger"] = {};
animals["goal"] = {};

animals["tiger"]["name"] = "Amur";
animals["tiger"]["age"] = 8;
animals["tiger"]["status"] = "hungry";

animals["goal"]["name"] = "Timur";
animals["goal"]["age"] = 5;
animals["goal"]["status"] = "hungry";

console.log(animals);
delete animals["goal"]; //Amur has ate Timur
animals["tiger"]["status"] = "full and happy";

console.log("\n");
console.log(animals);

