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




class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new __WEBPACK_IMPORTED_MODULE_0__character__["a" /* default */](ctx);
    this.play = this.play.bind(this);
    this.score = 0;
    this.handleCollision = this.handleCollision.bind(this);
  }

  clear(){
    this.ctx.clearRect(0,0, 500, 500);
  }

  createPlatforms(){
    let y = 0;
    for(let i = 0; i < 6; i++ ){
      const x = Math.floor(Math.random() * (500 - 70));
      this.platforms.push(new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, y));
       y += Math.floor(500 / 6);
    }
  }

  replacePlatform(){
    if (this.platforms[5].y === 500){
      this.platforms.pop;
      this.score++;
      const x = Math.floor(Math.random() * (500 -70));
      this.platforms.unshift( new __WEBPACK_IMPORTED_MODULE_1__platform__["a" /* default */](this.ctx, x, 0));
    }
  }

  checkPlatformColision(){
    if (this.character.falling){
      this.platforms.forEach( (platform) => {
        if (platform.y === (this.character.y - this.character.height)){
          this.handleCollision();
        }
      });
    }
  }

  handleCollision(){
    this.character.stopFall();
    this.character.jump();
  }

  checkPlayerMove(){
    if(left){
      debugger;
      this.character.moveLeft();
    } else if (right){
      this.character.moveRight();
    }
  }

  over(){
    if (this.character.y >= 450){
      return true;
    }
  }

  play(){
    this.clear();
    if (this.platforms.length === 0){
      this.createPlatforms();
    }
    this.replacePlatform();
    this.platforms.forEach((platform) => {
      platform.render();
    });
    this.checkPlayerMove();
    if (this.character.x === 0 && this.character.y === 0){
      this.character.setPos(300, 400);
      this.character.jump();
    }
    this.checkPlatformColision();
    this.character.render();
    this.character.updateJump();
    this.character.updateFall();
    requestAnimationFrame(this.play);
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
    this.x = 0;
    this.y = 0;
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

  jump(){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      this.jumpVel = 20;
    }
  }

  updateFall(){
    if (this.falling){
      this.setPos(this.x, this.y + this.fallVel);
    }
  }

  updateJump(){
    if (this.jumping){
      this.setPos(this.x, this.y - this.jumpVel);
      this.jumpVel--;
    }
    if (this.jumpVel === 0){
      this.jumping = false;
      this.falling = true;
      this.fallVel = 1;
    }
  }

  moveRight(){
    if (this.x < 500 - 30){
      this.setPos(this.x + 15, this.y);
    }
  }

  moveLeft(){
    if (this.x > 0){
      this.setPos(this.x -15, this.y);
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
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 10;
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
    this.image = new Image();
    this.image.src = "./assets/images/coin.png";
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y);
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Token);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map