// function getXPositionOfElement() {
//     let x_position = Math.floor(Math.random() * window.innerWidth);
//     return x_position;
// }
// function getYPositionOfElement() {
//     let y_position = Math.floor(Math.random() * window.innerHeight);
//     return y_position;
// }
// console.log(getXPositionOfElement())
// console.log(getYPositionOfElement())




//  function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
  
//     while (currentIndex != 0) {
  
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       [array[currentIndex], array[randomIndex]] = [
//         array[randomIndex], array[currentIndex]];
//     }
//     return array;
//   }
  
//   let arr = new Array()
//     for (let i=0; i < 5; i++) {
//         arr[i] = new Array()
//         for (let j=0; j < 5; j++){
//             arr[i][j] = Math.floor(Math.random() * 25)
//         }
//     } 
//   shuffle(arr);
//   console.log(arr);



///function createArray(){
    let arr = new Array()
    for (let i = 0; i < 5; i++) {
        arr[i] = new Array()
        for (let j = 0; j < 5; j++){
            arr[i][j] = Math.floor(Math.random() * 25)
        }
    } 
 //  return arr
///}
console.log(arr)

let testArray = [
[" "," ", " ", " ", " "],
[6,7,8,9,10],
[11,12,13,14,15],
[16,17,18,19,20],
[21,22,23,24,25]
]
// console.log(testArray)

function getRandomElement(array){
    let random = array[Math.floor(Math.random())];
    return random
}
console.log(getRandomElement(arr))




///for(let i  = 0, i < )


 // theBeginningOfAdventures() {
//     createMatrix()
//     characterPosition()
//     progressOfEvents()
// }