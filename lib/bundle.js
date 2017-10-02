/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


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
  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);
  // document.addEventListener("keydown", function(e){
  //   console.log(e.key);
  //   if (e.key === "Enter"){
  //     let splash = document.getElementById("splash");
  //     splash.remove();
      game.play();
    // }
  // })
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemy__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__power__ = __webpack_require__(6);






class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */](ctx);
    this.play = this.play.bind(this);
    this.score = 0;
    this.handleCollision =this.handleCollision.bind(this);
    this.token = null;
    this.enemy = null;
    this.checkObjectCollision = this.checkObjectCollision.bind(this);
    this.moveObject = this.moveObject.bind(this);
    this.power = null;
    this.timer = false;
    this.handleTimer = this.handleTimer.bind(this);
    this.highScore = localStorage.getItem("highscore");
    this.dying = false;
    this.music = new Audio("./assets/sounds/SuperMarioBros.ogg");
    this.splash = this.splash.bind(this);
  }

  clear(){
    this.ctx.clearRect(0,0, 480, 500);
  }

  splash(){
    
  }

  resetAll(){
    this.character = new __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */](this.ctx);
    this.platforms = [];
    this.enemy = null;
    this.token = null;
    this.score = 0;
    window.newGame = false;
    this.dying = false;
  }

  createPlatforms(){
    let y = 0;
    for(let i = 0; i < 6; i++ ){
      const x = Math.floor(Math.random() * (480 - 70));
      this.platforms.push(new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, y));
       y += Math.floor(500 / 6);
    }
  }

  replacePlatform(){
    if (this.platforms[5].y >= 500){
      this.platforms.pop();
      this.score++;
      const x = Math.floor(Math.random() * (480 -70));
      const type = Math.floor(Math.random() * 10);
      let y = this.platforms[0].y;
      y -= Math.floor(500/6);
      this.platforms.unshift( new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, y, type));
    }
  }

  movePlatforms(){
    this.platforms.forEach( (platform) => {
      platform.y += this.character.jumpVel;
    });
  }

  checkPlatformCollision(){
    if (this.character.falling && this.dying === false){
      this.platforms.forEach( (platform) => {
        if ((platform.y  > this.character.y
          && platform.y + platform.height < this.character.y + this.character.height
          ) &&
          (platform.x + platform.width > this.character.x
            && platform.x < this.character.x + this.character.width)){
          this.handleCollision(platform.type);
        }
      });
    }
  }

  handleCollision(type){
    this.character.stopFall();
    this.character.jump(type);
  }

  createToken(){
    const x = Math.floor(Math.random() * (480 - 30));
    this.token = new __WEBPACK_IMPORTED_MODULE_2__token__["a" /* default */](this.ctx, x, -200 );
  }

  moveObject(obj){
    if (!!obj){
      obj.y += this.character.jumpVel;
    }
  }
  checkObjectCollision(obj){
    if(obj.y  < this.character.y + this.character.height
      && obj.y + obj.height > this.character.y
      && obj.x < this.character.x + this.character.width &&
      obj.x + obj.width > this.character.x){
        if (obj === this.token){
          this.handleTokenCollision();
        } else if (obj === this.enemy) {
          this.handleEnemyCollision()
        } else {
          this.handlePowerCollision();
        }
      }
    if (obj === null || obj.y > 510){
      if (obj === this.token){
        this.token = null;
      } else if (obj === this.enemy){
        this.enemy = null;
      } else{
        this.power = null;
      }
    }
  }

  handleTokenCollision(){
    this.score += 10;
    this.token = null;
  }

  handleEnemyCollision(){
    if (this.character.powered === '0'){
      this.score += 35;
      this.enemy = null;
    }else{
      this.dying = true;
    }
  }

  handlePowerCollision(){
    this.score += 5;
    this.character.powered = this.power.type.toString();
    this.power = null;
  }

  createEnemy(){
    const x = Math.floor(Math.random() * (480 - 60));
    this.enemy = new __WEBPACK_IMPORTED_MODULE_3__enemy__["a" /* default */](this.ctx, x, -100);
  }

  createPower(){
    const x = Math.floor(Math.random() * (480 - 30));
    const type = Math.floor(Math.random() * 2);
    this.power = new __WEBPACK_IMPORTED_MODULE_4__power__["a" /* default */](this.ctx, x, -200, type);
  }

  checkPlayerMove(){
    if(left){
      this.character.moveLeft();
    } else if (right){
      this.character.moveRight();
    }
  }

  handleTimer(){
    this.character.resetPower();
    this.timer = false;
  }

  checkHighScore(){
    if (this.score > this.highScore){
      localStorage.setItem("highscore", this.score);
      this.highScore = this.score;
    }
  }

  over(){
    if (this.character.y - this.character.height >= 510){
      return true;
    } else{
      return false;
    }
  }

  endScreen(){
    this.ctx.fillStyle = "Black";
    this.ctx.font = "30px Arial";
    this.ctx.fillText("You Lose! Please Try Again", 50, 100);
    this.ctx.fillStyle = "Black";
    this.ctx.font = "15px Arial";
    this.ctx.fillText("Press Enter to Play Again" , 150, 135);
  }

  play(){
    cancelAnimationFrame(this.splashAnimation)
    this.clear();
    if (window.newGame){
      this.resetAll();
    }
    if (window.sound){
      this.music.play();
    }
    if (window.sound === false){
      this.music.pause();
    }
    if (this.platforms.length === 0){
      this.createPlatforms();
    }
    this.replacePlatform();
    this.platforms.forEach((platform) => {
      platform.render();
    });
    this.checkPlayerMove();
    if (this.character.x === null && this.character.y === null){
      this.character.setPos(300, 300);
      this.character.jump();
    }
    this.checkPlatformCollision();
    if (this.character.y <= 200){
      this.movePlatforms();
      this.moveObject(this.token);
      this.moveObject(this.enemy);
      this.moveObject(this.power);
    }
    if (this.score % 10 === 0 && this.score > 10 && this.token === null){
      this.createToken();
    }
    if (this.character.powered && this.timer === false){
      this.timer = true;
      this.character.handlePower();
      setTimeout(this.handleTimer, 7000)
    }
    if (this.score > 0 && this.score % 50 === 0 && this.enemy === null){
      this.createEnemy();
    }
    if (this.score > 0 && this.score % 5 === 0 && this.power === null
        && this.character.powered === false){
      this.createPower();
    }
    if (!!this.token){
      this.token.render();
      this.checkObjectCollision(this.token);
    }
    if (!!this.enemy){
      this.enemy.render();
      this.enemy.makeMovement();
      this.checkObjectCollision(this.enemy);

    }
    if (!!this.power && !this.character.powered){
      this.power.render();
      this.checkObjectCollision(this.power);
    }
    this.ctx.fillStyle = "White";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("SCORE: " + this.score, 1, 15);
    this.ctx.fillStyle = "White";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("High Score: " + this.highScore, 325, 15);
    this.character.render();
    if (this.character.jumping){
      this.character.updateJump();
    }
    if (this.character.falling){
      this.character.updateFall();
    }
    this.checkHighScore();
    this.animation = requestAnimationFrame(this.play);
    if (this.over()){
      this.endScreen();
    }
  }
}

// this.platforms.forEach((platform) => {
//   platform.y++;
// });
/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Character {
  constructor(ctx){
    this.image = new Image();
    this.image.src = "./assets/images/mario.png";
    this.ctx = ctx;
    this.x = null;
    this.y = null;
    this.jumping = false;
    this.falling = false;
    this.jumpVel = 0;
    this.fallVel = 0;
    this.width = 30;
    this.height = 50;
    this.powered = false;
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }

  jump(type){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      if (type === 0) {
        this.jumpVel = 45;
      } else {
        this.jumpVel = 17;
      }
    }
  }

  updateFall(){
    if (this.falling){
      this.setPos(this.x, this.y + this.fallVel);
      if (this.fallVel < 15){
        this.fallVel++;
      }
    }
  }

  updateJump(){
    if (this.y > 200){
      this.setPos(this.x, this.y - this.jumpVel);
    }
    this.jumpVel--;

    if (this.jumpVel === 0){
      this.jumping = false;
      this.falling = true;
      this.fallVel = 1;
    }
  }

  moveRight(){
    if (this.x < 480 - 30){
      this.setPos(this.x + 8, this.y);
    }
  }

  moveLeft(){
    if (this.x > 0){
      this.setPos(this.x -8, this.y);
    }
  }

  stopFall(){
    this.falling = false;
    this.fallVel = 0;
  }

  handlePower(){
    if (this.powered === '1'){
      this.width = 60;
      this.height = 100;
    } else {
      this.image.src ="./assets/images/supermario.png";
    }
  }

  resetPower(){
  this.image.src = "./assets/images/mario.png";
  this.width = 30;
  this.height = 50;
  this.powered = false;
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Character);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform{
  constructor(ctx, x, y, type){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 10;
    this.type = type;
  }

  render(){
    if (this.type === 0) {
      this.ctx.fillStyle = 'silver';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Token{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.image = new Image();
    this.image.src = "./assets/images/coin.png";
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Token);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Enemy{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 60;
    this.direction = 'left';
    this.image = new Image();
    this.image.src = './assets/images/shell.png';
    this.makeMovement = this.makeMovement.bind(this);
  }

  makeMovement(){
    if(this.direction === 'left'){
      this.x -= 3;
      if (this.x <= 0) {
        this.direction = 'right';
      }
    } else {
      this.x += 3;
      if (this.x + 40 >= 480){
        this.direction = 'left';
      }
    }
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Power{
  constructor(ctx, x, y, type){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = new Image();
    if (this.type === 0){
      this.image.src = './assets/images/star.png';
    } else {
      this.image.src = './assets/images/mushroom.png';
    }
    this.width = 30;
    this.height = 40;
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Power);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map