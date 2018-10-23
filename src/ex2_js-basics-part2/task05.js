function getMax(arr){
    var max = arr[0];
    for(var i = 1; i< arr.length;i++){
        if (arr[i]>max){
            max = arr[i];
        }
    }
    console.log("Максимальное значение: " + max)
}
getMax([1,3,6,9,34,5]);