class Character {
  constructor(ctx){
    this.image = new Image();
    this.image.src = "../assets/images/mario.png";
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.jumping = false;
    this.falling = false;
    this.jumpVel = 0;
    this.fallVel = 0;
  }
  setup(x, y){
    this.x = x;
    this.y = y;
  }
  render(){
    this.ctx.drawImage(this.image, this.x, this.y, 30, 50);
  }
}

export default Character;
