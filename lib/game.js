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
  }

  clear(){
    this.ctx.clearRect(0,0, 500, 500);
  }

  createPlatforms(){
    let y = 0;
    for(let i = 0; i < 6; i++ ){
      const x = Math.floor(Math.random() * (500 - 70));
      this.platforms.push(new Platform(this.ctx, x, y));
       y += Math.floor(500 / 6);
    }
  }

  replacePlatform(){
    if (this.platforms[5].y === 500){
      this.platforms.pop;
      this.score++;
      const x = Math.floor(Math.random() * (500 -70));
      this.platforms.unshift( new Platform(this.ctx, x, 0));
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
export default Game;
