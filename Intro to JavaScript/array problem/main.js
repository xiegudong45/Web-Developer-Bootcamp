function printReverse(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        console.log(array[i]);
    }
}
printReverse([3, 6, 2, 5]);

function isUniform(array) {
    var temp = array[0];
    var isUniform = true;
    array.forEach(function(arr) {
        if(arr !== temp) {
            return false;
        }
        
    });
    return true;
}

function sumArray(array) {
    var sum = 0;
    array.forEach(function(arr) {
        sum += arr;
    });
    console.log(sum);
}
sumArray([3, 6, 2, 5]);

function max(array) {
    var max = array[0];
    array.forEach(function(arr) {
        if (arr > max) {
            max = arr;
        }
    });
    console.log(max);
}
max([3, 6, 2, 5]);