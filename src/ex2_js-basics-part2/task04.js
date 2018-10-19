function identicalCheck(arr){
    var result = true;
    for(var i =1; i<arr.length;i++){
        if(arr[i]!==arr[i-1]){
            result = false;
            break;
        }
    }
    console.log(result)
}
identicalCheck([1,1,1,2]);