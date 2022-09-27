const playButton = document.getElementById("button");
const flyDown = document.getElementById("fly-down");
const bee = document.getElementById("bee");
const daisy = document.getElementById("daisy");

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to Start button to start the game
  playButton.addEventListener("click", startGame);
  // Enable the bee to fly adding an event listener for a key down
  flyDown.addEventListener("click", fly);
})

function startGame(){
  // Shows the first daisy on screen, as hidden from CSS
  if (daisy.style.visibility === "hidden") {
    daisy.style.visibility = "visible";
  } else {
    daisy.style.visibility = "visible";  
  }

  // Change the text on the paragraph and the button
  document.getElementById("start").innerHTML = "Click below to reset the game";
  playButton.innerHTML = "Reset";

  // Starts the animation of the daisies
  daisy.classList.add("ground");

  // Starts the countdown
  startCountDown();

  

  // Add the collision detection
  checkCollision ();
}

function fly(){
  if (bee.classList != "animate"){
    bee.classList.add("animate");
  }
  setTimeout(function() {
    bee.classList.remove("animate");
  },500)
}

function checkCollision (){}

function incrementScore (){}

function clock (){}

function resetGame (){}

