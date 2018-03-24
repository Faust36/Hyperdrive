import Bullet from './bullet.js';
import Util from './util.js';

class Ship {
  constructor(options){
    this.pos = [options.pos[0], options.pos[1]]
    this.shipModels = options.imageRepo.blueShip
    this.explosion = options.imageRepo.blueExplosion
    this.imageRepo = options.imageRepo
    this.frame = 0
    this.frameWidth = options.width
    this.frameHeight = options.height
    this.game = options.game
    this.radius = 20
    this.util = new Util();
    this.killCount = 0
    this.bossKills = 0
    this.collided = false
    this.collisionFrame = 0
    this.laser = this.createSound('./assets/sounds/laser2.mp3')
  }

  draw(ctx){
    if (!this.collided) {
      if(this.frame < 8){
        ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
        this.frame += 1
      }else{
        this.frame = 0
        ctx.drawImage(this.shipModels[this.frame], this.pos[0], this.pos[1], 70, 70)
        this.frame += 1
      }
    }else if (this.collided && this.collisionFrame < this.explosion.length) {
      ctx.drawImage(this.explosion[this.collisionFrame], this.pos[0], this.pos[1], 140, 140)
      this.collisionFrame += 1
    }else {
      this.game.remove(this)
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
    if(!this.collided){
      this.laser.play()
      const bullet = new Bullet({
        game: this.game,
        pos: [(this.pos[0]+9), (this.pos[1]-30)],
        context: 'blue',
        imageRepo: this.imageRepo
      })
      const bullet2 = new Bullet({
        game: this.game,
        pos: [(this.pos[0]-2), (this.pos[1]-30)],
        context: 'blue',
        imageRepo: this.imageRepo
      })
      this.game.playerBullets.push(bullet, bullet2)
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(){
    this.collided = true
  }

  createSound(src){
    let song = document.createElement('audio')
    song.src = src
    song.setAttribute('preload', 'auto');
    song.setAttribute('controls', 'none');
    song.style.display = 'none'
    document.body.appendChild(song);
    return song
  }

}
export default Ship;
