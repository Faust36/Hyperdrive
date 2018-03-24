import Bullet from './bullet.js';
import Util from './util.js';

class Enemy{
  constructor(options){
    this.pos = options.pos
    this.speed = 1
    this.shipModels = options.imageRepo.redShip
    this.explosion = options.imageRepo.redExplosion
    this.frame = 0
    this.game = options.game
    this.fire = this.fire.bind(this)
    this.radius = 20
    this.util = new Util()
    this.imageRepo = options.imageRepo
    this.collided = false
    this.collisionFrame = 0
    this.explosionSound = options.explosionSound
    this.laser = options.laser
  }


  draw(ctx){
    if (!this.collided) {
      if(this.frame < 8){
        ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
        this.frame += 1
        this.pos[1] += this.speed
      }else{
        this.frame = 0
        ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
        this.frame += 1
        this.pos[1] += this.speed
      }
      if(this.pos[1] > this.game.height){
        this.game.remove(this)
      }
    }else if (this.collided && this.collisionFrame < this.explosion.length) {
      ctx.drawImage(this.explosion[this.collisionFrame], this.pos[0], this.pos[1], 140, 140)
      this.collisionFrame += 1
    }else{
      this.game.remove(this)
    }
  }

  fire(){
    if (!this.collided) {
      this.laser.play()
      const bullet = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+9), (this.pos[1]-20)],
        context: 'red',
        imageRepo: this.imageRepo
      })
      this.game.enemyBullets.push(bullet)
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(){
    this.collided = true
    this.explosionSound.play()
  }

}

export default Enemy;
