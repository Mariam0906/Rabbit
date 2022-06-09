const elemValue = null
let characters = [
  {
    name: "Rabbit",
    img: "images/rabbit.jpg",
  },
  {
    name: "Home",
    img: "images/home.png",
  },
  {
    name: "Fence",
    img: "images/fence.jpg",
  },
  {
    name: "Wolf",
    img: "images/wolf.jpg"
  },
]

function createMatrix(size) {
  let matrix = new Array()
  for (i = 0; i < size; i++) {
    matrix[i] = new Array()
    for (j = 0; j < size; j++) {
      matrix[i][j] = elemValue
    }
  }
  return matrix
}
const button = document.getElementById("startButton")
button.onclick = function () {
  const MATRIX_SIZE = document.getElementById("select").value
  let array = createMatrix(MATRIX_SIZE)
  charactersPosition(array, MATRIX_SIZE)
  console.log(array)
  toPaintBoard(array)
  let character = "Rabbit"
  document.addEventListener("keydown", function (event) {
    let characterCoord = findCharecterCoord(array, character)
    let oldX = characterCoord[0][0]
    const oldY = characterCoord[0][1]
    const y = oldY - 1
    const Y = oldY + 1
    const x = oldX - 1
    const X = oldX + 1
    if (event.key === "ArrowUp") {
      moveCharactertUp(array, oldX, x, oldY)
    }
    if (event.key === "ArrowDown") {
      moveCharactertDown(array, oldX, X, oldY)
    }
    if (event.key === "ArrowLeft") {
      moveCharactertLeft(array, oldX, y, oldY)
    }
    if (event.key === "ArrowRight") {
      moveCharactertRight(array, oldX, Y, oldY)
    }
    wolfCoord = findWolfCoords(array)
    wolfPosibleSteps(array)
    //console.log(cellsNextToTheWolf(array, wolfCoord))

    //console.log(chackCoordLegality([oldX,oldY], array))
  })
}

function findRandomFreeCoord(array) {
  const x = Math.floor(Math.random() * array.length)
  const y = Math.floor(Math.random() * array.length)
  if (array[x][y] === null) {
    return [x, y]
  } else {
    return findRandomFreeCoord(array)
  }
}
function createPositionForCharacters(array, character) {
  const [x, y] = findRandomFreeCoord(array)
  array[x][y] = character
}
function rabbitPosition(array) {
  createPositionForCharacters(array, "Rabbit")
}
function wolvesPosition(array, wolfCount) {
  for (i = 0; i < wolfCount; i++) {
    createPositionForCharacters(array, "Wolf")
  }
}
function fencePosition(array, fenceCount) {
  for (i = 0; i < fenceCount; i++) {
    createPositionForCharacters(array, "Fence")
  }
}
function homePosition(array) {
  createPositionForCharacters(array, "Home")
}
function charactersPosition(array, size) {
  const wolfCount = (size * 60) / 100
  const fenceCount = (size * 40) / 100
  rabbitPosition(array)
  wolvesPosition(array, wolfCount)
  fencePosition(array, fenceCount)
  homePosition(array)
}
function findCharecterCoord(array, character) {
  const findInMatrix = function (accumulator, row, x) {
    row.forEach((elem, y) => {
      if (elem === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return array.reduce(findInMatrix, [])
}
function moveCharactertUp(array, oldX, x, oldY) {
  if (oldX === 0) {
    newX = array.length - 1
    if (array[newX][oldY] === null) {
      array[newX][oldY] = "Rabbit"
      array[oldX][oldY] = null
    }
  } else {
    const newFreeCoord = array[x][oldY]
    if (newFreeCoord === null) {
      array[x][oldY] = "Rabbit"
      array[oldX][oldY] = null
    }
  }
  console.log(array)
}
function moveCharactertDown(array, oldX, x, oldY) {
  if (oldX === array.length - 1) {
    newX = 0
    if (array[newX][oldY] === null) {
      array[newX][oldY] = "Rabbit"
      array[oldX][oldY] = null
    }
  } else {
    const newFreeCoord = array[x][oldY]
    if (newFreeCoord === null) {
      array[x][oldY] = "Rabbit"
      array[oldX][oldY] = null
    }
  }
  console.log(array)
}
function moveCharactertLeft(array, oldX, y, oldY) {
  if (oldY === 0) {
    newY = array.length - 1
    if (array[oldX][newY] === null) {
      array[oldX][newY] = "Rabbit"
      array[oldX][oldY] = null
    }
  } else {
    const newFreeCoord = array[oldX][y]
    if (newFreeCoord === null) {
      array[oldX][y] = "Rabbit"
      array[oldX][oldY] = null
    }
  }
  console.log(array)
}
function moveCharactertRight(array, oldX, y, oldY) {
  if (oldY === array.length - 1) {
    newY = 0
    if (array[oldX][newY] === null) {
      array[oldX][newY] = "Rabbit"
      array[oldX][oldY] = null
    }
  } else {
    const newFreeCoord = array[oldX][y]
    if (newFreeCoord === null) {
      array[oldX][y] = "Rabbit"
      array[oldX][oldY] = null
    }
  }
  console.log(array)
}
function findWolfCoords(array) {
  const wolfCoord = findCharecterCoord(array, "Wolf")
  return wolfCoord
}
function findAllNullCoords(array) {
  const nullCoord = findCharecterCoord(array, null)
  console.log(nullCoord)
}
function chackCoordLegality([x, y], array) {
  if (x >= 0 && x != array.length && y >= 0 && y != array.length) {
    return true
  } else {
    return false
  }
}
function cellsNextToTheWolf(array, coord) {
  const [x, y] = [0, 1]
  const legalMove = []
  const [X, Y] = coord
  const up = [X - 1, Y]
  const down = [X + 1, Y]
  const left = [X, Y - 1]
  const right = [X, Y + 1]
  if (chackCoordLegality(up, array)) {
    legalMove.push(up)
  }
  if (chackCoordLegality(down, array)) {
    legalMove.push(down)
  }
  if (chackCoordLegality(left, array)) {
    legalMove.push(left)
  }
  if (chackCoordLegality(right, array)) {
    legalMove.push(right)
  }
  return legalMove.filter(
    (item) =>
      array[item[x]][item[y]] === null || array[item[x]][item[y]] === "Rabbit"
  )
}

// function moveWolf(array,[newX,newY],[oldX,oldY]){
//     if(array[newX][newY] === "Rabbit"){
//         message("You lose")
//     }else{
//         array[newX][newY] = "Wolf"
//         array[oldX][oldY] = null
//     }
// }

function calculateDistance([A, B], [A1, B1]) {
  dis = Math.sqrt(Math.pow(A - A1, 2) + Math.pow(B - B1, 2))
  return dis
}

// function wolfPosibleSteps(array) {
//   const coords = findCharecterCoord(array, "Wolf")
//   const rabbitCoordArray = findCharecterCoord(array, "Rabbit")
//   coords.forEach(coord => {
//     const wolfNearCells = cellsNextToTheWolf(array, coord)
//     const nearCellIndexes = []
//     let dist = []
//     wolfNearCells.forEach(cell => {
//       dist.push(calculateDistance(cell, rabbitCoordArray))
//       nearCellIndexes.push(cell)
//     })

//     ind = dist.indexOf(Math.min(...dist))
// console.log(ind)
//     //moveWolf(array, nearCellIndexes[ind],coord)
//   })
// }

function wolfPosibleSteps(array) {
  const coords = findCharecterCoord(array, "Wolf")
  const rabbitCoordArray = findCharecterCoord(array, "Rabbit")
  const rabbitCoord = rabbitCoordArray[0]
  const wolfPosibleStep = (wolf) => {
    const steps = cellsNextToTheWolf(array, wolf)
    if (steps !== undefined) {
      const dist = steps.map((step) => calculateDistance(rabbitCoord, step))
      const i = dist.indexOf(Math.min(...dist))
      const nearCell = steps[i]
      if (nearCell !== undefined) {
        array[nearCell[0]][nearCell[1]] = "Wolf"
        array[wolf[0]][wolf[1]] = null
      }
    }
  }
  coords.forEach(wolfPosibleStep)
  return array
}

function toPaintBoard(array) {
  board = document.getElementById("board")
  board.innerHTML = ""

  const width = array.length * 30 + 2 * array.length
  board.style.width = `${width}px`
  board.style.height = `${width}px`
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      div = createDivs(array, i, j)
      board.append(div)
    }
  }
}

function createDivs(array, x, y) {
  const div = document.createElement("div")
  div.id = `${x}${y}`
  img = createImg(array[x][y])
  div.appendChild(img)
  return div
}

function createImg(coord) {
  const width = 150
  img = document.createElement("img")
  img.style.width = `${width}px`
  img.style.height = `${width}px`
  if (coord === "Rabbit") {
    img.src = "images/rabbit.jpg"
  }
  if (coord === "Home") {
    img.src = "images/home.png"
  }
  if (coord === "Fence") {
    img.src = "images/fence.jpg"
  }
  if (coord === "Wolf") {
    img.src = "images/wolf.jpg"
  }
  return img
}
