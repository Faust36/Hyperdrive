

class Ship {
  constructor(options){
    this.pos = [options.pos[0], options.pos[1]]
    this.shipModel = new Image();
    this.draw = this.draw.bind(this)
    this.iFrame = 1
    this.frameWidth = options.width
    this.frameHeight = options.height
  }

  draw(ctx){
    if(this.iFrame <= 4){
      this.shipModel.src = `./assets/sprites/Spaceship_art_pack/Blue/Animation/${this.iFrame}.png`
      this.iFrame += 1
    }else{
      this.iFrame = 1
      this.shipModel.src = `./assets/sprites/Spaceship_art_pack/Blue/Animation/${this.iFrame}.png`
      this.iFrame += 1
    }
    ctx.drawImage(this.shipModel, this.pos[0], this.pos[1], 70, 70)
  }

  move(direction){
    const xShift = this.pos[0] += direction[0];
    const yShift = this.pos[1] += direction[1];
    if(xShift <= 0){
      this.pos[0] = 0;
    }else if(xShift >= this.frameWidth -70){
      this.pos[0] = (this.frameWidth - 70 );
    }else{
      this.pos[0] = xShift;
    }

    if(yShift <= 0){
      this.pos[1] = 0;
    }else if(yShift >= this.frameHeight - 70){
      this.pos[1] = (this.frameHeight - 70 );
    }else{
      this.pos[1] = yShift;
    }
  }
}
export default Ship;
