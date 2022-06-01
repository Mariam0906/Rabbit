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
    charactersPosition(array,MATRIX_SIZE)
    console.log(array)

    let character = "Rabbit"
    let characterCoord = findCharecterCoord(array, character)
    console.log(characterCoord[0][0])
    
   rabbitMoving(array, characterCoord)
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
function charactersPosition(array, size){
    const wolfCount = size * 60 / 100
    const fenceCount = size * 40 / 100
    rabbitPosition(array)
    wolvesPosition(array, wolfCount)
    fencePosition(array, fenceCount)
    homePosition(array) 
}
function findCharecterCoord(array, character){
    const findInMatrix = function (accumulator, row, x){
        row.forEach((elem, y) => {
            if(elem === character){
                accumulator.push([x, y])
            }            
        })
        return accumulator
    }
    return array.reduce(findInMatrix, [])
}

// function rabbitMoving(){
//     moveUp()
//     // moveRight()
//     // moveLeft()
//     // moveDown()
// }

function rabbitMoving(array, characterCoord){
    document.addEventListener("keydown",function(event){
        if(event.key == "ArrowUp"){
            const oldR = characterCoord[0][0] 
            const r = oldR - 1
            const c = characterCoord[0][1]
            array[r][c] = "Rabbit"
            array[oldR][c] = null
            console.log(array)
        }
        if(event.key == "ArrowDown"){
            const oldR = characterCoord[0][0] 
            const r = oldR + 1
            const c = characterCoord[0][1]
            array[r][c] = "Rabbit"
            array[oldR][c] = null
            console.log(array)
        }
        if(event.key == "ArrowLeft"){
            const oldR = characterCoord[0][1] 
            const r = oldR - 1
            const c = characterCoord[0][0]
            array[c][r] = "Rabbit"
            array[c][oldR] = null
            console.log(array)
        }
        if(event.key == "ArrowRight"){
            const oldR = characterCoord[0][1] 
            const r = oldR + 1
            const c = characterCoord[0][0]
            array[c][r] = "Rabbit"
            array[c][oldR] = null
            console.log(array)
        }
    })
    
    return array
}
    

