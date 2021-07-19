const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell');
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winnigMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const restartBtn = document.getElementById("restartButton");
let circleTurn;

startGame();
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardhoverclass();
    winningMessageElement.classList.remove("show");
  
}


restartBtn.addEventListener("click", startGame);

function handleClick(e) {
    const cell = e.target;
    const currentclass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentclass);
    if (checkWin(currentclass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    }else{
        swapturns();
        setBoardhoverclass();
    }
    // place mark
    // check for win
    // check for draw
    // switch turns
   
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = "it's a draw"
   
    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentclass) {
    cell.classList.add(currentclass);
}

function swapturns() {
    circleTurn = !circleTurn;
}

function setBoardhoverclass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}


function checkWin(currentclass) {
    return WINNING_COMBINATION.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentclass)
        })
    })
}  