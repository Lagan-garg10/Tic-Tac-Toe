const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector('.btn')

let currentPlayer
let gameGrid

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// function to initialise the game
function initialiseGame() {
    currentPlayer = 'X',
    gameGrid = ['', '', '', '', '', '', '', '', '',]
    newGameBtn.classList.remove('active')
    gameInfo.innerText = `current player - ${currentPlayer}`
    boxes.forEach((box)=>{
        box.innerText = ''
        box.style.pointerEvents = 'all'
        box.classList.remove('win')
    })
}
initialiseGame()

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O'
    }
    else{
        currentPlayer = 'X'
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = ''
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== '')&&(gameGrid[position[1]] !== '')&&(gameGrid[position[2]] !== '')&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]] === 'X'){
                answer = 'X'
            }
            else{
                answer = 'O'
            }
            boxes[position[0]].classList.add('win')
            boxes[position[1]].classList.add('win')
            boxes[position[2]].classList.add('win')
        }
    })
    if(answer !== ''){
        boxes.forEach((box)=>{
            box.style.pointerEvents = 'none'
        })
        gameInfo.innerText = `Winner Player - ${answer}`
        newGameBtn.classList.add('active')
    }

    // When There Is No Winner
    let fillCount = 0
    gameGrid.forEach((box)=>{
        if(box !== ''){
            fillCount++
        }
    })

    if(fillCount === 9){
        gameInfo.innnerText = 'Game Tied'
        newGameBtn.classList.add('active')
    }
}

function handleClick(index){
    if(gameGrid[index]===''){
        boxes[index].innerText = currentPlayer
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = 'none'

        // Swapping
        swapTurn()

        // check if someone win or not
        checkGameOver()
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener('click',()=>{
        handleClick(index)
    })
})

newGameBtn.addEventListener('click',initialiseGame)