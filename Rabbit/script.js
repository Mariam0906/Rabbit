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
            document.addEventListener("keydown",function(event){
            let characterCoord = findCharecterCoord(array, character)
                rabbitMoving(array, characterCoord,event.key)
        })
        findWolfCoords(array)
       findAllNullCoords(array)
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

function rabbitMoving(array, characterCoord,eventKey){
    if(eventKey === "ArrowUp"){
        let oldR = characterCoord[0][0] 
        const c = characterCoord[0][1]
        if(oldR === 0){
             array[oldR][c] = null
             oldR = array.length - 1
             array[oldR][c] = "Rabbit" 
        }else{
            let r = oldR - 1 
            const newFreeCoord = array[r][c]
            if(newFreeCoord === null){
                array[r][c] = "Rabbit"
                array[oldR][c] = null
            }
        }
        let r = oldR - 1 
            const newFreeCoord = array[r][c]
        if(newFreeCoord === "Home"){ 
            alert("Մալադեց, դու դեմք ես")
        } 
        if(newFreeCoord === "Wolf"){
            alert("Հուսահատվեեես ոչ")
        }
       
         
    }
    if(eventKey === "ArrowDown"){
        const oldR = characterCoord[0][0] 
        const r = oldR + 1
        const c = characterCoord[0][1]
        const newFreeCoord = array[r][c]
        if(newFreeCoord === "Home"){ 
            alert("Մալադեց, դու դեմք ես")
        }else if(newFreeCoord === "Wolf"){
            alert("Հուսահատվեեես ոչ")
        }else if(newFreeCoord === null){
            array[r][c] = "Rabbit"
            array[oldR][c] = null
        }
    }
    if(eventKey === "ArrowLeft"){
        const oldR = characterCoord[0][1] 
        const r = oldR - 1
        const c = characterCoord[0][0]
        const newFreeCoord = array[c][r]
        if(newFreeCoord === "Home"){ 
            alert("Մալադեց, դու դեմք ես")
        }else if(newFreeCoord === "Wolf"){
            alert("Հուսահատվեեես ոչ")
        }else if(newFreeCoord === null){
            array[c][r] = "Rabbit"
            array[c][oldR] = null
        }
    }
    if(eventKey === "ArrowRight"){
        const oldR = characterCoord[0][1] 
        const r = oldR + 1
        const c = characterCoord[0][0]
        const newFreeCoord = array[c][r]
        if(newFreeCoord === "Home"){ 
            alert("Մալադեց, դու դեմք ես")
        }else if(newFreeCoord === "Wolf"){
            alert("Հուսահատվեեես ոչ")
        }else if(newFreeCoord === null){
            array[c][r] = "Rabbit"
            array[c][oldR] = null
            
        }
    } 
    console.log(array)
}
function findWolfCoords(array){
    const wolfCoord =  findCharecterCoord(array, "Wolf")
    console.log(wolfCoord)
}

function findAllNullCoords(array){
    const nullCoord =  findCharecterCoord(array, null)
    console.log(nullCoord)
}


