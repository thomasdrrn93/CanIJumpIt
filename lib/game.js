import Character from './character';
import Platform from './platform';
import Token from './token';

class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new Character(ctx);
  }

  createPlatforms(){
    let y = 0;
    for(let i = 0; i < 6; i++ ){
      const x = Math.floor(Math.random() * (500 - 70));
      this.platforms.push(new Platform(this.ctx, x, y));
       y += Math.floor(500 / 6);
    }
  }

  checkPlayerMove(){
    if(left){
      this.character.moveLeft();
    } else if (right){
      this.character.moveRight();
    }
  }

  start(){
    this.createPlatforms();
    this.platforms.forEach((platform) => {
      platform.render();
    });
  }
}

export default Game;
