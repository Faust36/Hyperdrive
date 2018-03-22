// import MovingObject from './moving_object.js';

class Background {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.speed = 0.1;
    this.width = options.width;
    this.height = options.height;
    this.backgroundImage = options.backgroundImage
    this.ctx = options.ctx;
  }

  draw(ctx){
    this.y += this.speed
    ctx.drawImage(this.backgroundImage, this.x, this.y)
    ctx.drawImage(this.backgroundImage, this.x, (this.y - this.height))
    if(this.y >= this.height){
      this.y = 0
    }
  }
}

export default Background;
