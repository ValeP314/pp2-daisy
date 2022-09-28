const playButton = document.getElementById("button");
const flyDown = document.getElementById("fly-down");
const bee = document.getElementById("bee");
const daisy = document.getElementById("daisy");
const scoreDisplay = document.getElementById("score");
let seconds = 10;
let timer;

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
// Add event listener to Start button to start the game
playButton.addEventListener("click", startGame);
})

function startGame(){
  // Shows the first daisy on screen, as hidden from CSS
  if (daisy.style.visibility === "hidden") {
    daisy.style.visibility = "visible";
  } else {
    daisy.style.visibility = "visible";  
  }

  //Reset the game-area, in case this is a game restart
  score = 0;
  scoreDisplay.innerText = score;
  bee.style.display = ""  
  daisy.style.animation = "";
  daisy.style.display = "";  

  // Change the text on the paragraph and the button
  document.getElementById("start").innerHTML = "Let's play!";
  playButton.style.visibility = "hidden";

  // Enable the bee to fly adding an event listener for a key down
  flyDown.addEventListener("click", fly);

  // Starts the animation of the daisies
  daisy.classList.add("ground");

  // Starts the countdown
  startCountDown();

  // Add the collision detection
  checkCollision ();

}

function fly(){
  bee.classList.add("animate");
  
  setTimeout(function() {
    if (bee.classList.contains ("animate")){
      bee.classList.remove("animate");
    }
  },500)
}

function checkCollision (){
  
  //set interval to check position
  let collision = false;
  let checkLand = setInterval(function() {

    // get current bee X and Y position
    let beeBottom = parseInt(window.getComputedStyle(bee).getPropertyValue("bottom"));
    let beeRight = parseInt(window.getComputedStyle(bee).getPropertyValue("right"));
    let beeLeft = parseInt(window.getComputedStyle(bee).getPropertyValue("left"));
  
    // get current flower X and Y position
    let daisyLeft = parseInt(window.getComputedStyle(daisy).getPropertyValue("left"));
    let daisyRight = parseInt(window.getComputedStyle(daisy).getPropertyValue("right"));
    let daisyHeight = parseInt(window.getComputedStyle(daisy).getPropertyValue("height"));
    let daisyBottom = parseInt(window.getComputedStyle(daisy).getPropertyValue("bottom"));

    // detect collision and increment score
    if (daisyLeft<beeRight && daisyRight>beeLeft && beeBottom<(daisyBottom + daisyHeight)) {
      collision = true;
      console.log(collision);
      incrementScore();
    } else{
      collision = false;
    }
    
  }, 25);


/*
  let checkLand = setInterval(function (){
  let beeCoord = bee.getBoundingClientRect();
  console.log(beeCoord)
  let daisyCoord = daisy.getBoundingClientRect();
  console.log(daisyCoord)
  
  let beeLeftOfDaisy = (beeCoord.x + beeCoord.width) < daisyCoord.x;
  let beeRightofDaisy = beeCoord.x > (daisyCoord.x + daisyCoord.width);
  let beeAboveDaisy = (beeCoord.y + beeCoord.height) < daisyCoord.y;
  let beeBelowDaisy = beeCoord.y > (daisyCoord.y + daisyCoord.height);
  var collision = false;
  console.log (beeLeftOfDaisy,beeRightofDaisy,beeAboveDaisy, beeBelowDaisy)

  if (!(beeLeftOfDaisy || beeRightofDaisy || beeAboveDaisy || beeBelowDaisy)) {
    collision = true;
  } else {
    collision = false;
  }

  console.log(collision);
  
  incrementScore();

}, 25);
*/
}

function incrementScore (){
  score += 1;
  scoreDisplay.innerText = score;
}

// set 1-minute timer to establish max time
function startCountDown (){
  if(!timer) {
    timer = window.setInterval(function() {
      clock();
    }, 1000);
  }
}

//add alert when the time is up
function clock (){
    if (seconds < 60) {
        document.getElementById("counter").innerHTML = seconds;
      }
      if (seconds > 0) {
        seconds--;
      } else {
        clearInterval(timer);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Game over!',
        });
        gameOver();
      }
}

function gameOver (){
  // stop flowers and reset the timer
  bee.style.display = "none"  
  daisy.style.animation = "none";
  daisy.style.display = "none";
  
  // Change the text on the paragraph and the button
  document.getElementById("start").innerHTML = "Click below to play again";
  playButton.style.visibility = "visible"
  playButton.innerHTML = "Play again";
}