
// theBeginningOfAdventures() {
//     createMatrix()
//     characterPosition()
//     progressOfEvents()
// }
// characterPosition(){
//     rabbitPosition()
//     wolvesPosition()
//     homePosition()
//     fencePosition()
// }
const rabbit = 1
const wolf = 2
const fence = 3
const home = 4

const MATRIX_SIZE = document.getElementById("select").value
console.log(MATRIX_SIZE)
function createMatrix(MATRIX_SIZE){
    let array = new Array
    for (i = 0; i < MATRIX_SIZE; i++){
        array[i] = new Array()
        for(j = 0; j < MATRIX_SIZE; j++){
            array[i][j] = null
        }
    }
    return array
}
console.log(createMatrix(MATRIX_SIZE))

function findRandomFreeCoord(array){
    let rand1 = Math.floor(Math.random() * array.length);
    // let rand2 = Math.floor(Math.random() * array.length);
    console.log(array[rand1][0])
}
function rabbitPosition(){
    const newArray = (createMatrix(MATRIX_SIZE)).map((elem)=>findRandomFreeCoord(createMatrix(MATRIX_SIZE)))
    return newArray
}
rabbitPosition()


findRandomFreeCoord(createMatrix(MATRIX_SIZE))











