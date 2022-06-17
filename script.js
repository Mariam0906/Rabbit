const FREE_CELL = null
const RABBIT = "Rabbit"
const WOLF = "Wolf"
const HOME = "Home"
const FENCE = "Fence"
let GAME_BOARD_NUMBER = 1

function createNewGameButton(GAME_BOARD_NUMBER) {
  const gameConteiner = document.getElementById("gameConteiner")
  const button = document.createElement("button")
  button.id = `newgamebutton_${GAME_BOARD_NUMBER}`
  button.innerHTML = "New Game"
  gameConteiner.appendChild(button)
  return gameConteiner
}
createNewGameButton(GAME_BOARD_NUMBER)

function createNewBoard() {
  const conteiner = document.createElement("conteiner")
  const div = document.createElement("div")

  const startButton = document.getElementById("`start_${GAME_BOARD_NUMBER}`")
  const select = document.createElement("select")
  div.append(startButton, select)
}

function createStartButton(GAME_BOARD_NUMBER) {
  const div = document.createElement("div")
  div.id = `startDiv_${GAME_BOARD_NUMBER}`
  const btn = document.createElement("button")
  btn.id = `start_${GAME_BOARD_NUMBER}`
  btn.innerHTML = "Start"
  div.appendChild(btn)

  
  const options = document.createElement("option")


  return div
}
