import Util from './util.js';

class Bullet{
  constructor(options){
    this.game = options.game
    this.pos = options.pos
    this.speed = 10
    this.bullet = options.imageRepo.bullet
    this.context = options.context
    this.enemyBullet = options.imageRepo.enemyBullet
    this.radius = 25
    this.util = new Util();
    this.bossBullet = options.imageRepo.star
    this.bossBulletFrame1 = 0
    this.bossBulletFrame2 = 0
    this.bossBulletFrame3 = 0
  }

  draw(ctx){
    switch (this.context) {
      case 'blue':
        ctx.drawImage(this.bullet, this.pos[0], this.pos[1], 60, 60)
        this.pos[1] -= this.speed
        if(this.pos[1] < -10){
          this.game.remove(this)
        }
        break;
      case 'red':
        ctx.drawImage(this.enemyBullet, this.pos[0], this.pos[1], 60, 60)
        this.pos[1] += this.speed
        if(this.pos[1] > this.game.height){
          this.game.remove(this)
        }
        break;
      case 'boss1':
        if(this.bossBulletFrame1 < this.bossBullet.length){
          ctx.drawImage(this.bossBullet[this.bossBulletFrame1], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame1 += 1
        }else{
          this.bossBulletFrame1 = 0
          ctx.drawImage(this.bossBullet[this.bossBulletFrame1], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame1 += 1
        }
        this.pos[1] += (this.speed/3)
        if(this.pos[1] > this.game.height){
          this.game.remove(this)
        }
        break;
      case 'boss2':
        if(this.bossBulletFrame2 < this.bossBullet.length){
          ctx.drawImage(this.bossBullet[this.bossBulletFrame2], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame2 += 1
        }else{
          this.bossBulletFrame2 = 0
          ctx.drawImage(this.bossBullet[this.bossBulletFrame2], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame2 += 1
        }
        this.pos[1] += (this.speed/3)
        this.pos[0] += (this.speed/6)
        if(this.pos[1] > this.game.height || this.pos[0] > this.game.width){
          this.game.remove(this)
        }
        break;
      case 'boss3':
        if(this.bossBulletFrame3 < this.bossBullet.length){
          ctx.drawImage(this.bossBullet[this.bossBulletFrame3], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame3 += 1
        }else{
          this.bossBulletFrame3 = 0
          ctx.drawImage(this.bossBullet[this.bossBulletFrame3], this.pos[0], this.pos[1], 60, 60)
          this.bossBulletFrame3 += 1
        }
        this.pos[1] += (this.speed/3)
        this.pos[0] -= (this.speed/6)
        if(this.pos[1] > this.game.height || this.pos[0] < 0){
          this.game.remove(this)
        }
        break;
      default:
        throw new Error('unknown type')
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(){
    this.game.remove(this)
  }

  bossBulletImage(frame){
    let bullet;
    if(frame < this.bossBullet.length){
      bullet = this.bossBullet[frame]
      frame += 1
    }else{
      frame = 0
      bullet = this.bossBullet[frame]
      frame += 1
    }
    return bullet
  }
}

export default Bullet;
