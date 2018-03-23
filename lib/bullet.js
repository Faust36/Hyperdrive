import Util from './util.js';

class Bullet{
  constructor(options){
    this.game = options.game
    this.pos = options.pos
    this.speed = 10
    this.bullet = options.imageRepo.bullet
    this.color = options.color
    this.enemyBullet = options.imageRepo.enemyBullet
    this.radius = 25
    this.util = new Util();
  }

  draw(ctx){
    if(this.color === 'blue'){
      ctx.drawImage(this.bullet, this.pos[0], this.pos[1], 60, 60)
      this.pos[1] -= this.speed
      if(this.pos[1] < -10){
        this.game.remove(this)
      }
    }else{
      ctx.drawImage(this.enemyBullet, this.pos[0], this.pos[1], 60, 60)
      this.pos[1] += this.speed
      if(this.pos[1] > this.game.height){
        this.game.remove(this)
      }
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(){
    this.game.remove(this)
  }
}

export default Bullet;
