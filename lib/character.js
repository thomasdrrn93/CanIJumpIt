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
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }

  jump(){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      this. jumpVel = 20;
    }
  }

  updateFall(){
    this.setPos(this.x, this.y + this.fallVel);
    this.fallVel++;
  }

  updateJump(){
    this.setPos(this.x, this.y - this.jumpVel);
    this.jumpVel--;
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
    this.ctx.drawImage(this.image, this.x, this.y, 30, 50);
  }
}

export default Character;
