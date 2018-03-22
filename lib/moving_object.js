class MovingObject{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.speed = 0;
    this.width = options.width;
    this.height = options.height;

  }

  draw(ctx){

  }

  // move(timeChange){
  //   const velocityScale = timeChange / (1000/60);
  //   const offsetX = this.vel[0] * velocityScale;
  //   const offsetY = this.vel[1] * velocityScale;
  //   this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY]
  //   if(this.game.isOutOfBounds(this.pos)){
  //     this.game.remove(this);
  //   }
  // }
}
export default MovingObject;
