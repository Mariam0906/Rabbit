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



// function moveCharactertUp(array, oldX, x, oldY){
//   if (oldX === 0) {
//     newX = array.length - 1
//     if (array[newX][oldY] === null) {
//       array[newX][oldY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   } else {
//     const newFreeCoord = array[x][oldY]
//     if (newFreeCoord === null) {
//       array[x][oldY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   }
//   console.log(array)
// }

// function moveCharactertDown(array, oldX, x, oldY) {
//   if (oldX === array.length - 1) {
//     newX = 0
//     if (array[newX][oldY] === null) {
//       array[newX][oldY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   } else {
//     const newFreeCoord = array[x][oldY]
//     if (newFreeCoord === null) {
//       array[x][oldY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   }
//   console.log(array)
// }

// function moveCharactertLeft(array, oldX, y, oldY) {
//   if (oldY === 0) {
//     newY = array.length - 1
//     if (array[oldX][newY] === null) {
//       array[oldX][newY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   } else {
//     const newFreeCoord = array[oldX][y]
//     if (newFreeCoord === null) {
//       array[oldX][y] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   }
//   console.log(array)
// }

// function moveCharactertRight(array, oldX, y, oldY) {
//   if (oldY === array.length - 1) {
//     newY = 0
//     if (array[oldX][newY] === null) {
//       array[oldX][newY] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   } else {
//     const newFreeCoord = array[oldX][y]
//     if (newFreeCoord === null) {
//       array[oldX][y] = "Rabbit"
//       array[oldX][oldY] = null
//     }
//   }
//   console.log(array)
// }






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
//     const MATRIX_SIZE = document.getElementById("select").value
//         let array = createMatrix(MATRIX_SIZE)
//         let character = "Rabbit"
//         let characterCoord = findCharecterCoord(array, character)
//         const x = characterCoord[0][0] - 1
//         const y = characterCoord[0][1]
// }