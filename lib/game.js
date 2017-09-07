import Character from './character';
import Platform from './platform';
import Token from './token';

class Game{
  constructor(ctx){
    this.ctx = ctx;
    this.platforms = [];
    this.character = new Character(ctx);
  }
  render(){
    this.character.setPos(100, 50);
    this.character.render();
  }
}

export default Game;
