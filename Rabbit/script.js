
function getXPositionOfElement() {
    let x_position = Math.floor(Math.random() * window.innerWidth);
    return x_position;
}
function getYPositionOfElement() {
    let y_position = Math.floor(Math.random() * window.innerHeight);
    return y_position;
}
console.log(getXPositionOfElement())
console.log(getYPositionOfElement())

function getArrayWithRandNums(){
    Array.prototype.random = function (length) {
    return this[Math.floor((Math.random() * length))];
}
    let arr = new Array()
    for (let i=0; i < 5; i++) {
        arr[i] = new Array()
        for (let j=0; j < 5; j++){
            arr[i][j]=Math.floor(Math.random() * 0)
        }
       let chosenItem = arr.random(arr.length)
    }
   console.log(arr,chosenItem = 1 )
  // = arr.random(arr.length) 
   //console.log()
}
getArrayWithRandNums()





