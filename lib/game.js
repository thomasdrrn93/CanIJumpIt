import Character from './character';
import Platform from './platform';
import Token from './token';
import Enemy from './enemy';
import Power from './power';

class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new Character(ctx);
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
  }

  clear(){
    this.ctx.clearRect(0,0, 480, 500);
  }

  splash(){
    
  }

  resetAll(){
    this.character = new Character(this.ctx);
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
      this.platforms.push(new Platform(this.ctx, x, y));
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
      this.platforms.unshift( new Platform(this.ctx, x, y, type));
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
    this.token = new Token(this.ctx, x, -200 );
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
    this.enemy = new Enemy(this.ctx, x, -100);
  }

  createPower(){
    const x = Math.floor(Math.random() * (480 - 30));
    const type = Math.floor(Math.random() * 2);
    this.power = new Power(this.ctx, x, -200, type);
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
export default Game;
