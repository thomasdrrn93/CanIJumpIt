import Character from './character';
import Platform from './platform';
import Token from './token';

class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new Character(ctx);
    this.play = this.play.bind(this);
    this.score = 0;
    this.handleCollision = this.handleCollision.bind(this);
    this.token = null;
  }

  clear(){
    this.ctx.clearRect(0,0, 500, 500);
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


  updateToken(){

  }

  checkPlatformColision(){
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

  moveToken(){
    if (!!this.token){
      this.token.y += this.character.jumpVel;
    }
  }
  checkTokenColision(){
    if(this.token.y  < this.character.y + this.character.height
      && this.token.y + this.token.height > this.character.y
      && this.token.x < this.character.x + this.character.width &&
      this.token.x + this.token.width > this.character.x){
        this.score += 10;
        this.token = null;
      }
      if (this.token === null || this.token.y > 510){
        this.token = null;
      }
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
    this.checkPlatformColision();
    if (this.character.y <= 200){
      this.movePlatforms();
      this.moveToken();
    }
    if (this.score % 10 === 0 && this.score > 10 && this.token === null){
      this.createToken();
    }
    if (!!this.token){
      this.token.render();
      this.checkTokenColision();
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
