import Game from './game.js';

window.left = false;
window.right = false;
window.newGame = false;

window.addEventListener("keydown", checkKey);
window.addEventListener("keyup", keyedUp);

function checkKey(){
  switch(event.keyCode){
    case 13:
      window.newGame = true;
      break;
    case 37:
      window.left = true;
      break;
    case 39:
      window.right = true;
  }
}

function keyedUp(){
  window.left = false;
  window.right = false;
  window.newGame = false;
}

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 480;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  let game = new Game(ctx);
  game.play();
});
