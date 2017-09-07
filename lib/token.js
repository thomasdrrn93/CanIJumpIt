class Token{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 40;
    this.image = new Image();
    this.image.src = "./assets/images/coin.png";
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Token;
