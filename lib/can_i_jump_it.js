import Game from './game.js';

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  let game = new Game();
});
