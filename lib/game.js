import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';
import Asteroid from './asteroid.js';
import Boss from './boss.js';

class Game{
  constructor(options){
    this.enemies = [];
    this.asteroids = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.boss = [];
    this.width = options.width;
    this.height = options.height;
    this.imageRepo = options.imageRepo
    this.playerShip = [new Ship({
      pos:[(this.width/2),(this.height/2 + 50)],
      game: this,
      width: this.width,
      height: this.height,
      explosionSound: this.explosion,
      imageRepo: this.imageRepo
    })]
    this.song = this.createSound('./assets/sounds/Star Commander1.wav')
    this.explosion = this.createSound('./assets/sounds/enemy_exp.mp3')
    this.laser = this.createSound('./assets/sounds/laser2.mp3')
    this.boss_exp = this.createSound('./assets/sounds/boss_exp.mp3')
    this.boss_laser = this.createSound('./assets/sounds/boss_weapon.mp3')
    this.rock = this.createSound('./assets/sounds/rock.mp3')
    this.song.play()
    this.song.loop = true
    this.addEnemy = this.addEnemy.bind(this)
    this.addAsteroid = this.addAsteroid.bind(this)
    this.addBoss = this.addBoss.bind(this)
    setInterval(this.addEnemy, 2000)
    setInterval(this.addAsteroid, 4000)
    setInterval(this.addBoss, 3000)
  }

  // isOutOfBounds(pos){
  //   return (pos[0] < 0 || pos[1] < 0 || pos[0] > this.width || pos[1] > this.height)
  // }

  draw(ctx){
    ctx.clearRect(0, 0, this.width, this.height);
    this.checkCollisions();
    this.allObjects().forEach((object)=>{
      object.draw(ctx)
    })
  }


  remove(object){
    switch(object.constructor){
      case Bullet:
        if(object.context === 'blue'){
          this.playerBullets.splice(this.playerBullets.indexOf(object), 1)
        }else{
          this.enemyBullets.splice(this.enemyBullets.indexOf(object), 1)
        }
        break;
      case Enemy:
        let enemy = this.enemies[this.enemies.indexOf(object)]
        clearInterval(enemy.fire, 1500)
        if(this.playerShip[0]){
          this.playerShip[0].killCount += 1
        }
        this.enemies.splice(this.enemies.indexOf(object), 1)
        break;
      case Ship:
        this.playerShip.pop()
        break;
      case Asteroid:
        this.asteroids.splice(this.asteroids.indexOf(object), 1)
        break;
      case Boss:
        if(this.playerShip[0]){
          this.playerShip[0].bossKills += 1
        }
        let boss = this.boss[0]
        clearInterval(boss.fire, 1500)
        this.boss.pop()
        break;
      default:
        throw new Error("unknown")
    }
  }

  allObjects(){
    return [].concat(this.enemies, this.asteroids, this.playerBullets, this.enemyBullets, this.playerShip, this.boss)
  }
  allHazards(){
    return [].concat(this.enemies, this.asteroids, this.enemyBullets, this.boss)
  }
  allTargets(){
    return [].concat(this.enemies, this.asteroids, this.boss)
  }

  addEnemy(){
    if (this.boss.length === 0) {
      const enemy = new Enemy({
        pos: this.randomTopPos(),
        imageRepo: this.imageRepo,
        explosionSound: this.explosion,
        laser: this.laser,
        game: this
      })
      setInterval(enemy.fire, 1500)
      this.enemies.push(enemy)
    }
  }

  addAsteroid(){
    let asteroid = new Asteroid({
      game: this,
      asteroids: this.imageRepo.asteroids,
      explosion: this.imageRepo.redExplosion,
      rock: this.rock,
      pos: this.randomTopPos()
    })
    this.asteroids.push(asteroid)
  }

  addBoss(){
    if (this.playerShip[0] && this.playerShip[0].killCount >= 3 && this.boss.length === 0 && this.playerShip[0].bossKills < 1) {
      let boss = new Boss({
        game: this,
        imageRepo: this.imageRepo,
        bossModel: this.imageRepo.bossModel1,
        explosionSound: this.boss_exp,
        laser: this.boss_laser,
        pos: [(this.width/3), -110]
      })
      setInterval(boss.fire, 1500)
      this.boss.push(boss)
    }
  }


  randomTopPos(){
    return [(Math.floor(Math.random() * (this.width - 70))), 0 ]
  }

  checkCollisions(){
    this.playerBullets.forEach((bullet)=>{
      this.allTargets().forEach((target)=>{
        if(bullet.isCollidedWith(target)){
          bullet.collision();
          target.collision()
        }
      })
    })

    const hazards = this.allHazards();
    hazards.forEach((hazard)=>{
      if(this.playerShip[0]){
        if(hazard.isCollidedWith(this.playerShip[0])){
          this.playerShip[0].collision();
          hazard.collision()
        }
      }
    })
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
// Game.MOVEMENTS = [
//   [
//     // [0, (Math.floor(Math.random() * 300))],
//     [0, 200],
//     [1,1]
//   ],
//   [
//     // [0, (Math.floor(Math.random() * 300)+300)],
//     [0, 400],
//     [1,-1]
//   ],
//   [
//     // [800, (Math.floor(Math.random() * 300))],
//     [800, 200],
//     [-1,1]
//   ],
//   [
//     // [800, (Math.floor(Math.random() * 300)+300)],
//     [800, 400],
//     [-1,-1]
//   ]

export default Game;
