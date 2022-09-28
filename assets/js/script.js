const playButton = document.getElementById("button");
const flyDown = document.getElementById("fly-down");
const bee = document.getElementById("bee");
const daisy = document.getElementById("daisy");

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
  var collision = false;
  let checkLand = setInterval(function() {

    // get current bee Y position
    let beeBottom = parseInt(window.getComputedStyle(bee).getPropertyValue("bottom"));
  
    // get current flower X position
    let daisyLeft = parseInt(window.getComputedStyle(daisy).getPropertyValue("left"));

    // detect collision and increment score
    let score = 0;
    if (daisyLeft<50 && daisyLeft>0 && beeBottom<=50) {
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
  let oldScore = parseInt(document.getElementById("score").innerText);
  
  document.getElementById("score").innerText = ++oldScore;
}

// set 1-minute timer to establish max time
var seconds = 59;
var timer;

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

// Add event listener to Start button to start the game
playButton.addEventListener("click", startGame);
  startGame();
