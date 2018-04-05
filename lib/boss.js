import Bullet from './bullet.js';
import Util from './util.js';

class Boss{
  constructor(options){
    this.imageRepo = options.imageRepo
    this.bossModel = options.bossModel
    this.game = options.game
    this.radius = 70
    this.pos = options.pos
    this.speed = 0.3
    this.util = new Util()
    this.health = 60
    this.destroyed = false
    this.explosion = options.imageRepo.bossExplosion
    this.destructionFrame = 0
    this.boundary = 0
    this.fire = this.fire.bind(this)
    this.explosionSound = options.explosionSound
    this.laser = options.laser
  }

  draw(ctx){
    if(!this.destroyed){
      ctx.drawImage(this.bossModel, this.pos[0], this.pos[1], 200, 200)
      if(this.pos[1] < 50){
        this.pos[1] += this.speed
      }
    }else if (this.destroyed && this.destructionFrame < this.explosion.length) {
      ctx.drawImage(this.explosion[this.destructionFrame], (this.pos[0] - 50), (this.pos[1] - 50), 400, 400)
      this.destructionFrame += 1
    }else{
      this.game.remove(this)
    }
  }

  fire(){
    if (!this.destroyed) {
      this.laser.play()
      const bullet1 = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+60), (this.pos[1])+50],
        context: 'boss1',
        imageRepo: this.imageRepo
      })
      const bullet2 = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+60), (this.pos[1])+50],
        context: 'boss2',
        imageRepo: this.imageRepo
      })
      const bullet3 = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+60), (this.pos[1])+50],
        context: 'boss3',
        imageRepo: this.imageRepo
      })
      this.game.enemyBullets.push(bullet1, bullet2, bullet3)
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(){
    if(this.health > 0){
      this.health -= 1
    }else{
      this.destroyed = true
      this.explosionSound.play()
    }
  }

}

export default Boss;
