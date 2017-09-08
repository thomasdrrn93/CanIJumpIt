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
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  let game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](ctx);
  game.play();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__character__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemy__ = __webpack_require__(5);





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

  }

  clear(){
    this.ctx.clearRect(0,0, 500, 500);
  }

  resetAll(){
    this.character = new __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */](this.ctx);
    this.platforms = [];
    this.enemy = null;
    this.token = null;
    this.score = 0;
    window.newGame = false;
  }

  createPlatforms(){
    let y = 0;
    for(let i = 0; i < 5; i++ ){
      const x = Math.floor(Math.random() * (500 - 70));
      this.platforms.push(new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, y));
       y += Math.floor(500 / 5);
    }
  }

  replacePlatform(){
    if (this.platforms[4].y >= 500){
      this.platforms.pop();
      this.score++;
      const x = Math.floor(Math.random() * (500 -70));
      const type = Math.floor(Math.random() * 200);
      let y = this.platforms[0].y;
      y -= Math.floor(500/5);
      this.platforms.unshift( new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, 0, type));
    }
  }

  movePlatforms(){
    this.platforms.forEach( (platform) => {
      platform.y += this.character.jumpVel;
    });
  }

  checkPlatformCollision(){
    if (this.character.falling){
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
    const x = Math.floor(Math.random() * (500 - 30));
    this.token = new __WEBPACK_IMPORTED_MODULE_2__token__["a" /* default */](this.ctx, x, 0 );
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
          this.score += 10;
          this.token = null;
        } else{
          this.character.y = 600;
        }
      }
      if (obj === null || obj.y > 510){
        obj === this.token ? this.token = null : this.enemy = null;
      }
    }

  createEnemy(){
    const x = Math.floor(Math.random() ^ (500 - 60));
    this.enemy = new __WEBPACK_IMPORTED_MODULE_3__enemy__["a" /* default */](this.ctx, x, 0);
  }

  checkPlayerMove(){
    if(left){
      this.character.moveLeft();
    } else if (right){
      this.character.moveRight();
    }
  }

  over(){
    if (this.character.y - this.character.height >= 510){
      return true;
    } else{
      return false;
    }
  }

  play(){
    this.clear();
    if (window.newGame){
      this.resetAll();
      requestAnimationFrame(this.play);
      this.play();
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
      this.character.setPos(300, 400);
      this.character.jump();
    }
    this.checkPlatformCollision();
    if (this.character.y <= 200){
      this.movePlatforms();
      this.moveObject(this.token);
      this.moveObject(this.enemy);
    }
    if (this.score % 10 === 0 && this.score > 10 && this.token === null){
      this.createToken();
    }
    if (this.score > 0 && this.score % 50 === 0 && this.enemy === null){
      this.createEnemy();
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
    this.ctx.fillStyle = "White";
    this.ctx.font = "20px Arial";
    this.ctx.fillText("SCORE: " + this.score, 1, 15);
    this.character.render();
    if (this.character.jumping){
      this.character.updateJump();
    }
    if (this.character.falling){
      this.character.updateFall();
    }
    this.animation = requestAnimationFrame(this.play);
    if (this.over()){
      cancelAnimationFrame(this.animation);
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
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }

  jump(type){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      if (type < 20) {
        this.jumpVel = 45;
      } else if (type === 20){
        this.jumpVel = 120;
      } else {
        this.jumpVel = 20;
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
    if (this.x < 500 - 30){
      this.setPos(this.x + 10, this.y);
    }
  }

  moveLeft(){
    if (this.x > 0){
      this.setPos(this.x -10, this.y);
    }
  }

  stopFall(){
    this.falling = false;
    this.fallVel = 0;
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
    if (this.type < 20) {
      this.ctx.fillStyle = 'silver';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.type === 20){
      this.ctx.fillStyle = 'gold';
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
      if (this.x + 40 >= 500){
        this.direction = 'left';
      }
    }
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map