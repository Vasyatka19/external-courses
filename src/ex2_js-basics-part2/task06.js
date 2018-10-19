function simpleOrCompositeNumber(num){
    if(num<=1000 && num>1){
        var result = "простое число";
        for(var i = 2;i<num;i++){
            if (num%i ===0){
                result = "составное число";
                break;
            }
        }
        console.log("Число " + num + " - " + result)
    }else{
        console.log("Данные не верные")
    }
}
simpleOrCompositeNumber(78);
