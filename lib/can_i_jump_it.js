import Game from './game.js';

window.left = false;
window.right = false;

window.addEventListener("keydown", checkKey);
window.addEventListener("keyup", keyedUp);

function checkKey(){
  switch(event.keyCode){
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
}

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  let game = new Game(ctx);
  game.render();
});
