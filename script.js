let playerText=document.getElementById('playerText')
let resetBtn=document.getElementById('reset')
let boxes=document.getElementsByClassName('box')
let winnerIndicator= getComputedStyle(document.body).getPropertyValue('--winning_blocks')
const O_Text='O'
const X_Text='X'
const boxesArray = Array.from(boxes);
let current_player= X_Text
let spaces= Array(9).fill(null)
console.log(spaces)
let gameEnded = false;
const startGame=()=>{
  
  boxesArray.forEach((box) => box.addEventListener('click', boxClicked));
}

function boxClicked(e){
  console.log(e.target)
  if (gameEnded) {
    return;
  }
  
  const id=e.target.id
  
  if(!spaces[id]){
     spaces[id]=current_player
    e.target.innerText=current_player
    
    if(playerWon() !==false){
    playerText.innerText='You have won!'
      let winning_blocks=playerWon()
      winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
      console.log(winning_blocks)
     gameEnded = true;
      return
    }
     if (!spaces.includes(null) && playerWon() === false) {
          playerText.innerText = "It's a draw!";
       gameEnded = true;
          return
        }
    current_player=current_player==X_Text ? O_Text : X_Text
    if (current_player == O_Text) {
      playerText.innerText = "Computer's turn";
      setTimeout(() => {
        let emptySpaces = spaces.map((space, index) => {
          if (space == null) {
            return index;
          }
        })
        emptySpaces = emptySpaces.filter(space => space != null)
        const randomIndex = Math.floor(Math.random() * emptySpaces.length);
        const computerChoice = emptySpaces[randomIndex];
        spaces[computerChoice] = current_player;
        boxes[computerChoice].innerText = current_player;

        if (playerWon() !== false) {
          playerText.innerText = "Computer wins!";
          let winning_blocks = playerWon()
          winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)
          console.log(winning_blocks)
          gameEnded = true;
          return
        }
        current_player = X_Text;
        playerText.innerText = `Your turn`;
      }, 500)
    } else {
      playerText.innerText = `Your turn`;
    }
    
     }
  
}

const winningCombo=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
function playerWon(){
  for(const condition of winningCombo){
    let [a,b,c]=condition
    
    if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]== spaces[c])){
       return [a,b,c]
       } 
  }
  return false;

}
resetBtn.addEventListener('click', restart)
function restart(){
  spaces.fill(null)
  boxesArray.forEach((box) => {
    box.innerText=''
    box.style.backgroundColor=''
    playerText.innerText="TIC-TAC-TOE"
    gameEnded=false;
  })
  current_player=X_Text
}


startGame()