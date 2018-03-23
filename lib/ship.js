import Bullet from './bullet.js';
import Util from './util.js';

class Ship {
  constructor(options){
    this.pos = [options.pos[0], options.pos[1]]
    this.shipModels = options.imageRepo.blueShip
    this.explosion = options.imageRepo.blueExplosion
    this.imageRepo = options.imageRepo
    // this.draw = this.draw.bind(this)
    this.frame = 0
    this.frameWidth = options.width
    this.frameHeight = options.height
    this.game = options.game
    this.radius = 20
    this.util = new Util();
    this.killCount = 0
  }

  draw(ctx){
    if(this.frame < 8){
      ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
      this.frame += 1
    }else{
      this.frame = 0
      ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
      this.frame += 1
    }
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

  fire(){
    if(this.game.playerShip[0]){
      const bullet = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+9), (this.pos[1]-30)],
        color: 'blue',
        imageRepo: this.imageRepo
      })
      const bullet2 = new Bullet({
        game: this.game,
        pos: [(this.pos[0]-2), (this.pos[1]-30)],
        color: 'blue',
        imageRepo: this.imageRepo
      })
      this.game.playerBullets.push(bullet, bullet2)
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(ctx){
    for(var i = 0; i < this.explosion.length; i++){
      ctx.drawImage(this.explosion[i], this.pos[0], this.pos[1], 140, 140)
    }
    this.game.remove(this)
  }
}
export default Ship;
