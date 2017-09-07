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

  jump(){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      this.jumpVel = 120;
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

export default Character;
