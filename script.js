const FREE_CELL = null
const RABBIT = "Rabbit"
const WOLF = "Wolf"
const HOME = "Home"
const FENCE = "Fence"
let GAME_BOARD_NUMBER = 1
const BOARD_SIZE = 76

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
function createGameArea(GAME_BOARD_NUMBER) {
  const gameArea = `
    <div class="gameArea" id = "area_${GAME_BOARD_NUMBER}">
      <button class="start" id = "start">Start</button>
      <select name="sizeBoard" id="sizeBoard">
        <option value="5">5X5</option>
        <option value="7">7X7</option>
        <option value="10">10X10</option>
      </select>
      <div class="board" id = "board"></div>
      <div class="movementDiv"></div>
    </div>
  `
  const container = document.getElementById("gameConteiner")
  container.insertAdjacentHTML("beforeend", gameArea)
}

function newGameButtonEvent(GAME_BOARD_NUMBER) {
  const button = document.getElementById("newGame")
  button.addEventListener("click", function () {
    createGameArea(GAME_BOARD_NUMBER)
    startButtonEvent(GAME_BOARD_NUMBER)
    GAME_BOARD_NUMBER += 1
  })
}

newGameButtonEvent(GAME_BOARD_NUMBER)

function startButtonEvent(GAME_BOARD_NUMBER){
  const button = document.querySelector(`#area_${GAME_BOARD_NUMBER} .start`)
  button.onclick = function () {
    const MATRIX_SIZE = document.querySelector("select").value
    const array = createMatrix(MATRIX_SIZE)
    const gameState = {
      gameArray: array,
      isGameStart: true,
      GAME_BOARD_NUMBER,
    }
    GLOBAL_GAME_STATES[GAME_BOARD_NUMBER] = gameState
    let character = RABBIT
    createButtonsForMove()
    charactersPosition(gameState, MATRIX_SIZE)
    console.log(gameState.gameArray)
    moveWithButtons(gameState, character)
    paintBoard(gameState)
  }
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
  createPositionForCharacters(gameState, RABBIT)
}
function wolvesPosition(gameState, wolfCount) {
  for (i = 0; i < wolfCount; i++) {
    createPositionForCharacters(gameState, WOLF)
  }
}
function fencePosition(gameState, fenceCount) {
  for (i = 0; i < fenceCount; i++) {
    createPositionForCharacters(gameState, FENCE)
  }
}
function homePosition(gameState) {
  createPositionForCharacters(gameState, HOME)
}
function charactersPosition(gameState, size) {
  const wolfCount = (size * 60) / 100
  const fenceCount = (size * 40) / 100
  rabbitPosition(gameState)
  wolvesPosition(gameState, wolfCount)
  fencePosition(gameState, fenceCount)
  homePosition(gameState)
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
  const img = createImg(gameState.gameArray[x][y])
  div.appendChild(img)
  return div
}
function createImg(coord) {
  const img = document.createElement("img")
  img.style.width = `${BOARD_SIZE}px`
  img.style.height = `${BOARD_SIZE}px`
  if (coord === RABBIT) {
    img.src = "images/bunny.png"
  }
  if (coord === HOME) {
    img.src = "images/home.png"
  }
  if (coord === FENCE) {
    img.src = "images/fence.jpg"
  }
  if (coord === WOLF) {
    img.src = "images/wolf.jpg"
  }
  return img
}

function paintBoard(gameState) {
  const array = gameState.gameArray
  removeChildes()
  const board = document.getElementById("board")
  const width = array.length * BOARD_SIZE
  board.style.width = `${width}px`
  board.style.height = `${width}px`
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      div = createDivs(gameState, i, j)
      board.appendChild(div)
    }
  }
}

function findCharecterCoord(gameState, character) {
  const findInMatrix = function (accumulator, row, x) {
    row.forEach((element, y) => {
      if (element === character) {
        accumulator.push([x, y])
      }
    })
    return accumulator
  }
  return gameState.gameArray.reduce(findInMatrix, [])
}

function calcRabbitNextCoord(gameState, character, direction) {
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
  const [newX, newY] = calcRabbitNextCoord(gameState, character, direction)
  moveRabbit(gameState, newX, newY)
  moveWolves(gameState)
  paintBoard(gameState)
}
function moveRabbit(gameState, x, y) {
  const [oldX, oldY] = findCharecterCoord(gameState, RABBIT)[0]
  if (gameState.gameArray[x][y] === FREE_CELL) {
    gameState.gameArray[oldX][oldY] = FREE_CELL
    gameState.gameArray[x][y] = RABBIT
  }
  if (gameState.gameArray[x][y] === HOME) {
    alert("RABBIT WON")
    gameState.isGameStart = false
  }
}

function findAllNullCoords(gameState) {
  const nullCoord = findCharecterCoord(gameState, FREE_CELL)
  console.log(nullCoord)
}
function isInRange([x, y], gameState) {
  if (
    x >= 0 &&
    x != gameState.gameArray.length &&
    y >= 0 &&
    y != gameState.gameArray.length
  ) {
    return true
  }
}
function nearCells(coord) {
  const [x, y] = coord
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]
}

function cellsNextToTheWolf(gameState, wolf) {
  function _isValid(coord) {
    const validCell = [FREE_CELL, RABBIT]
    return validCell.includes(gameState.gameArray[coord[0]][coord[1]])
  }
  function _isInRange(coord) {
    return isInRange(coord, gameState)
  }
  return nearCells(wolf).filter(_isInRange).filter(_isValid)
}

function calculateDistance([A, B], [A1, B1]) {
  const distance = Math.sqrt(Math.pow(A - A1, 2) + Math.pow(B - B1, 2))
  return distance
}

function moveWolves(gameState) {
  const coords = findCharecterCoord(gameState, WOLF)
  const rabbitCoordArray = findCharecterCoord(gameState, RABBIT)
  const rabbitCoord = rabbitCoordArray[0]
  const wolfPosibleStep = (wolf) => {
    if (gameState.isGameStart === false) {
      return
    }
    const steps = cellsNextToTheWolf(gameState, wolf)

    if (steps.length === 0) {
      return
    }

    const distances = steps.map((step) => calculateDistance(rabbitCoord, step))
    const i = distances.indexOf(Math.min(...distances))
    const nearCell = steps[i]
    const [x, y] = nearCell

    if (gameState.gameArray[x][y] === FREE_CELL) {
      gameState.gameArray[x][y] = WOLF
      gameState.gameArray[wolf[0]][wolf[1]] = FREE_CELL
    }
    if (gameState.gameArray[x][y] === RABBIT) {
      gameState.gameArray[x][y] = WOLF
      gameState.gameArray[wolf[0]][wolf[1]] = FREE_CELL
      gameState.isGameStart = false
      if (gameState.isGameStart === false) {
        alert("WOLVES WON")
      }
    }
  }
  coords.forEach(wolfPosibleStep)
}

function appendDirectionButton(name, divToAppend) {
  const button = document.createElement("button")
  button.innerHTML = name
  button.classList.add(name)
  divToAppend.appendChild(button)
}

function createButtonsForMove() {
  const buttonsDiv = document.querySelector(".movementDiv")
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
  const btnUp = document.querySelector(".up")
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
