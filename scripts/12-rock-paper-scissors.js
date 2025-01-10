let score= JSON.parse(localStorage.getItem('score')) || {wins: 0,losses: 0,ties: 0 };

//Pre-load Info

resetbutton();
updateScoreElement();

let isAutoPlaying = false;
let intervalId; 
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').innerHTML='Stop';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML='Auto Play';
  }
}

//Event Handlers

document.querySelector('.js-rock-button')
  .addEventListener('click',() =>{
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  })
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  })
// eventHandlers - Play using Keyboard
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors');
  }
});

// Player's move calculation.
function playGame(playerMove)
{
  const computerMove = pickComputerMove();
  let result='';

  if(playerMove==='rock')
  {
    if(computerMove==='rock')
    {
      result='Its a tie';
    }
    else if(computerMove=='paper')
    {
      result='You lost';
    }
    else if(computerMove=='scissors')
    {
      result='You win';
    }
  }
  else if(playerMove==='paper')
  {
    if(computerMove==='paper')
    {
      result='Its a tie';
    }
    else if(computerMove=='scissors')
    {
      result='You lost'
    }
    else if(computerMove=='rock')
    {
      result='You win'
    }
  }
  else if(playerMove==='scissors')
  {
    if(computerMove==='scissors')
    {
      result='Its a tie';
    }
    else if(computerMove=='rock')
    {
      result='You lost';
    }
    else if(computerMove=='paper')
    {
      result='You win';
    }
  }
  if(result==="You win")
  {
    score.wins+=1;
  }
  else if(result==="You lost")
  {
    score.losses+=1;
  }
  else if(result==="Its a tie")
  {
    score.ties+=1;
  }
  localStorage.setItem('score',JSON.stringify(score));
  //pre-load info update. 
  document.querySelector('.js-result').innerHTML=`${result}!`;
  document.querySelector('.js-move').innerHTML=`PLAYER01 <img class="move-icon" src="Images-rock-paper-scissors/${playerMove}-emoji.png">
  <img class="move-icon" src="Images-rock-paper-scissors/${computerMove}-emoji.png">COMPUTER`;
  
  updateScoreElement();
}

//pre-load function
function updateScoreElement()
{
  document.querySelector('.js-score')
  .innerHTML=`Wins: ${score.wins}   -   Losses: ${score.losses}   -   Ties: ${score.ties}`;
}

// pre-load info & reset button actions
function resetbutton(){
  document.querySelector('.js-result').innerHTML=`Game Result`;
  document.querySelector('.js-move').innerHTML=`PLAYER01&nbsp&nbsp<img class="move-icon" src="Images-rock-paper-scissors/player-emoji.png">
<img class="move-icon" src="Images-rock-paper-scissors/computer-emoji.png">&nbsp&nbspCOMPUTER`;
}

// Computer's Move calculation.
function pickComputerMove()
{
  const randomNumber  = Math.random();
  let computerMove='';

  if(randomNumber>=0 && randomNumber<1/3)
  {
    computerMove='rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3)
  {
    computerMove='paper';
  }
  else if(randomNumber>=2/3 && randomNumber<1)
  {
    computerMove='scissors';
  }

  return computerMove;
}

        