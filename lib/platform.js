class Platform{
  constructor(ctx, x, y, type){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 10;
    this.type = type;
  }

  render(){
    if (this.type === 0) {
      this.ctx.fillStyle = 'silver';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.type === 1){
      this.ctx.fillStyle = 'gold';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
export default Platform;
