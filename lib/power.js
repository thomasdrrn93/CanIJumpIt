class Power{
  constructor(ctx, x, y, type){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = new Image();
    if (this.type === 0){
      this.image.src = './assets/images/star.png';
    } else {
      this.image.src = './assets/images/mushroom.png';
    }
    this.width = 30;
    this.height = 40;
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Power;
