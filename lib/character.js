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
    this.powered = false;
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }

  jump(type){
    if (!this.jumping && !this.falling){
      this.fallVel = 0;
      this.jumping = true;
      if (type === 0) {
        this.jumpVel = 45;
      } else {
        this.jumpVel = 17;
      }
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
    if (this.x < 480 - 30){
      this.setPos(this.x + 8, this.y);
    }
  }

  moveLeft(){
    if (this.x > 0){
      this.setPos(this.x -8, this.y);
    }
  }

  stopFall(){
    this.falling = false;
    this.fallVel = 0;
  }

  handlePower(){
    if (this.powered === '1'){
      this.width = 60;
      this.height = 100;
    } else {
      this.image.src ="./assets/images/supermario.png";
    }
  }

  resetPower(){
  this.image.src = "./assets/images/mario.png";
  this.width = 30;
  this.height = 50;
  this.powered = false;
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Character;
