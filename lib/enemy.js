class Enemy{
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 60;
    this.direction = 'left';
    this.image = new Image();
    this.image.src = './assets/images/shell.png';
    this.makeMovement = this.makeMovement.bind(this);
  }

  makeMovement(){
    if(this.direction === 'left'){
      this.x -= 3;
      if (this.x <= 0) {
        this.direction = 'right';
      }
    } else {
      this.x += 3;
      if (this.x + 40 >= 500){
        this.direction = 'left';
      }
    }
  }

  render(){
    this.ctx.drawImage(this.image, this.x, this.y, this.height, this.width);
  }
}

export default Enemy;
