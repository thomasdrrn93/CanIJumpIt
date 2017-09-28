import Game from './game.js';

window.left = false;
window.right = false;
window.newGame = false;
window.sound = true;


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
      break;
    case 84:
      window.sound ? window.sound = false : window.sound = true;
      break;
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
  // document.addEventListener("keydown", function(e){
  //   console.log(e.key);
  //   if (e.key === "Enter"){
  //     let splash = document.getElementById("splash");
  //     splash.remove();
      game.play();
    // }
  // })
});
