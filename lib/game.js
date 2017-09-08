import Character from './character';
import Platform from './platform';
import Token from './token';
import Enemy from './enemy';

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

  }

  clear(){
    this.ctx.clearRect(0,0, 500, 500);
  }

  resetAll(){
    this.character = new Character(this.ctx);
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
      this.platforms.push(new Platform(this.ctx, x, y));
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
      this.platforms.unshift( new Platform(this.ctx, x, 0, type));
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
    this.token = new Token(this.ctx, x, 0 );
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
    this.enemy = new Enemy(this.ctx, x, 0);
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
export default Game;
