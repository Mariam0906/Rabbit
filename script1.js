const characters = [
  {
    name: "Rabbit",
    img: "images/bunny.png",
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
    img: "images/wolf.jpg",
  },
]

const FREE_CELL = null

const SIZE = 76
function createMatrix(size) {
  let matrix = new Array()
  for (i = 0; i < size; i++) {
    matrix[i] = new Array()
    for (j = 0; j < size; j++) {
      matrix[i][j] = FREE_CELL
    }
  }
  return matrix
}

let GAME_BOARD_NUMBER = 1
const button = document.getElementById("startButton")

button.onclick = function () {
  const MATRIX_SIZE = document.getElementById("select").value
  const array = createMatrix(MATRIX_SIZE)
  const gameState = {
    gameArray: array,
    isGameStart: true
  }
  let character = "Rabbit"
  createButtonsForMove()
  charactersPosition(gameState, MATRIX_SIZE)
  console.log(gameState.gameArray)
  moveWithButtons(gameState, character)
  paintBoard(gameState)
}

function calcRabbitNextCoord(gameState, direction) {
  const [x, y] = findCharecterCoord(gameState, character)[0]
  let newX = x
  let newY = y
  if (direction === "ArrowUp") {
    newX = x - 1
    if (x === 0) {
      newX = gameState.gameArray.length - 1
    }
  } else if (direction === "ArrowDown") {
    newX = x + 1
    if (x === gameState.gameArray.length - 1) {
      newX = 0
    }
  } else if (direction === "ArrowLeft") {
    newY = y - 1
    if (y === 0) {
      newY = gameState.gameArray.length - 1
    }
  } else if (direction === "ArrowRight") {
    newY = y + 1
    if (y === gameState.gameArray.length - 1) {
      newY = 0
    }
  }
  return [newX, newY]
}

function userMove(gameState, character, direction) {
  if (gameState.isGameStart === false) {
    return
  }

  const [newX, newY] = calcRabbitNextCoord(gameState, direction)
  moveRabbit(gameState, newX, newY)
  moveWolves(gameState)
  paintBoard(gameState)
}

function findRandomFreeCoord(gameState) {
  const x = Math.floor(Math.random() * gameState.gameArray.length)
  const y = Math.floor(Math.random() * gameState.gameArray.length)
  if (gameState.gameArray[x][y] === FREE_CELL) {
    return [x, y]
  } else {
    return findRandomFreeCoord(gameState)
  }
}
function createPositionForCharacters(gameState, character) {
  const [x, y] = findRandomFreeCoord(gameState)
  gameState.gameArray[x][y] = character
}
function rabbitPosition(gameState) {
  createPositionForCharacters(gameState, "Rabbit")
}
function wolvesPosition(gameState, wolfCount) {
  for (i = 0; i < wolfCount; i++) {
    createPositionForCharacters(gameState, "Wolf")
  }
}
function fencePosition(gameState, fenceCount) {
  for (i = 0; i < fenceCount; i++) {
    createPositionForCharacters(gameState, "Fence")
  }
}
function homePosition(gameState) {
  createPositionForCharacters(gameState, "Home")
}
function charactersPosition(gameState, size) {
  const wolfCount = (size * 60) / 100
  const fenceCount = (size * 40) / 100
  rabbitPosition(gameState)
  wolvesPosition(gameState, wolfCount)
  fencePosition(gameState, fenceCount)
  homePosition(gameState)
}
function findCharecterCoord(gameState, character) {
  const findInMatrix = function (accumulator, row, x) {
    row.forEach((elem, y) => {
      if (elem === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return gameState.gameArray.reduce(findInMatrix, [])
}
function moveRabbit(gameState, x, y) {
  const [oldX, oldY] = findCharecterCoord(gameState, "Rabbit")[0]
  if (gameState.gameArray[x][y] === FREE_CELL) {
    gameState.gameArray[oldX][oldY] = FREE_CELL
    gameState.gameArray[x][y] = "Rabbit"
  }

  if (gameState.gameArray[x][y] === "Home") {
    alert("RABBIT WON")
    gameState.isGameStart = false
  }

  if (gameState.gameArray[x][y] === "Wolf") {
    alert("WOLVES WON")
    gameState.isGameStart = false
  }
}

function findAllNullCoords(gameState) {
  const nullCoord = findCharecterCoord(gameState, FREE_CELL)
  console.log(nullCoord)
}
function chackCoordLegality([x, y], gameState) {
  if (
    x >= 0 &&
    x != gameState.gameArray.length &&
    y >= 0 &&
    y != gameState.gameArray.length
  ) {
    return true
  } else {
    return false
  }
}
function cellsNextToTheWolf(gameState, coord) {
  const [x, y] = [0, 1]
  const legalMove = []
  const [X, Y] = coord
  const up = [X - 1, Y]
  const down = [X + 1, Y]
  const left = [X, Y - 1]
  const right = [X, Y + 1]
  if (chackCoordLegality(up, gameState)) {
    legalMove.push(up)
  }
  if (chackCoordLegality(down, gameState)) {
    legalMove.push(down)
  }
  if (chackCoordLegality(left, gameState)) {
    legalMove.push(left)
  }
  if (chackCoordLegality(right, gameState)) {
    legalMove.push(right)
  }
  return legalMove.filter(
    (item) =>
      gameState.gameArray[item[x]][item[y]] === FREE_CELL ||
      gameState.gameArray[item[x]][item[y]] === "Rabbit"
  )
}
function calculateDistance([A, B], [A1, B1]) {
  dis = Math.sqrt(Math.pow(A - A1, 2) + Math.pow(B - B1, 2))
  return dis
}

function moveWolves(gameState) {
  const coords = findCharecterCoord(gameState, "Wolf")
  const rabbitCoordArray = findCharecterCoord(gameState, "Rabbit")
  const rabbitCoord = rabbitCoordArray[0]

  const wolfPosibleStep = (wolf) => {
    // is game over ?

    const steps = cellsNextToTheWolf(gameState, wolf)

    if (steps.length === 0) {
      return
    }

    const distances = steps.map((step) => calculateDistance(rabbitCoord, step))
    const i = distances.indexOf(Math.min(...distances))
    const nearCell = steps[i]
    const [x, y] = nearCell

    if (gameState.gameArray[x][y] === FREE_CELL) {
      gameState.gameArray[x][y] = "Wolf"
      gameState.gameArray[wolf[0]][wolf[1]] = FREE_CELL
    }
    if (gameState.gameArray[x][y] === "Rabbit") {
      gameState.gameArray[x][y] = "Wolf"
      gameState.gameArray[wolf[0]][wolf[1]] = FREE_CELL
      /// game over !!!
    }
  }

  coords.forEach(wolfPosibleStep)
}

function paintBoard(gameState) {
  const array = gameState.gameArray
  board = document.getElementById("board")
  board.innerHTML = ""
  //removeChildes()
  console.log(board)
  const width = array.length * SIZE
  board.style.width = `${width}px`
  board.style.height = `${width}px`
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      div = createDivs(gameState, i, j)
      board.appendChild(div)
    }
  }
}

function removeChildes() {
  const board = document.getElementById("board")
  while (board.lastElementChild) {
    board.removeChild(board.lastElementChild)
  }
}

function createDivs(gameState, x, y) {
  const div = document.createElement("div")
  div.id = `${x}${y}`
  img = createImg(gameState.gameArray[x][y])
  div.appendChild(img)
  return div
}
function createImg(coord) {
  img = document.createElement("img")
  img.style.width = `${SIZE}px`
  img.style.height = `${SIZE}px`
  if (coord === "Rabbit") {
    img.src = "images/bunny.png"
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

function appendDirectionButton(name, divToAppend) {
  const button = document.createElement("button")
  button.innerHTML = name
  button.classList.add(name)
  divToAppend.appendChild(button)
}

function createButtonsForMove() {
  const buttonsDiv = document.getElementById("buttons")
  buttonsDiv.id = GAME_BOARD_NUMBER
  while (buttonsDiv.lastElementChild) {
    buttonsDiv.removeChild(buttonsDiv.lastElementChild)
  }

  const btnUp = appendDirectionButton("up", buttonsDiv)
  const btnLeft = appendDirectionButton("left", buttonsDiv)
  const btnDown = appendDirectionButton("down", buttonsDiv)
  const btnRight = appendDirectionButton("right", buttonsDiv)
}

function moveWithButtons(gameState, character) {
  const btnUp = document.querySelector(`#${GAME_BOARD_NUMBER} .up`)
  const btnDown = document.querySelector(".down")
  const btnLeft = document.querySelector(".left")
  const btnRight = document.querySelector(".right")
  btnUp.addEventListener("click", function () {
    userMove(gameState, character, "ArrowUp")
  })
  btnDown.addEventListener("click", function () {
    userMove(gameState, character, "ArrowDown")
  })
  btnLeft.addEventListener("click", function () {
    userMove(gameState, character, "ArrowLeft")
  })
  btnRight.addEventListener("click", function () {
    userMove(gameState, character, "ArrowRight")
  })
}
