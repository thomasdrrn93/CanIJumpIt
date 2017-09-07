class Token{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "../assets/images/coin.png";
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y);
  }
}

export default Token;
