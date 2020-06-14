function removefromArray(array, element) {
    for (let i = array.length-1; i >= 0; i--) {
        if (array[i] ==  element) {
            array.splice(i, 1);
        }
    }
}

function resetArgs() {
    dir       = [0, 1]
    hull      = []
    counter   = 0
    compare   = -1
    angle     = -1
}

function norma(arr) {
    return Math.sqrt(arr[0]**2 + arr[1]**2)
}

function dot(arr1, arr2) {
    return arr1[0] * arr2[0] + arr1[1] * arr2[1]
}