class Platform{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  render(){
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, 70, 10);
  }
}
export default Platform;
