const elemValue = null
 function createMatrix(size){
        let matrix = new Array
            for (i = 0; i < size; i++){
                matrix[i] = new Array()
                for(j = 0; j < size; j++){
                    matrix[i][j] = elemValue
                }
            }
        return matrix
    }
const button = document.getElementById("startButton")
button.onclick = function (){
    const MATRIX_SIZE = document.getElementById("select").value
    let array = createMatrix(MATRIX_SIZE)
    charactersPosition(array)
    console.log(array)
}

function findRandomFreeCoord(array){
    const x = Math.floor(Math.random() * array.length);
    const y = Math.floor(Math.random() * array.length);
    if( array[x][y] === null ){
        return [x,y]
    }else{
       return findRandomFreeCoord(array)
    }
}
function createPositionForCharacters(array, character){
    const [x,y] = findRandomFreeCoord(array)
    array[x][y] = character
    
}
function rabbitPosition(array){
    createPositionForCharacters(array, "Rabbit")
}
function wolvesPosition(array, wolfCount){
    for(i = 0; i < wolfCount; i++){
        createPositionForCharacters(array, "Wolf")
    } 
}
function fencePosition(array,fenceCount){
    for(i = 0; i < fenceCount; i++){
        createPositionForCharacters(array, "Fence")
    }
}
function homePosition(array){
    createPositionForCharacters(array, "Home")
}
function charactersPosition(array){
    rabbitPosition(array)
    wolvesPosition(array, 3)
    fencePosition(array, 2)
    homePosition(array) 
}

















