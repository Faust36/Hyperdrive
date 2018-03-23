import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';
import Asteroid from './asteroid.js'

class Game{
  constructor(options){
    this.enemies = [];
    this.asteroids = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.width = options.width;
    this.height = options.height;
    this.imageRepo = options.imageRepo
    this.playerShip = [new Ship({
      pos:[(this.width/2),(this.height/2 + 50)],
      game: this,
      width: this.width,
      height: this.height,
      imageRepo: this.imageRepo
    })]
    this.addEnemy = this.addEnemy.bind(this)
    this.addAsteroid = this.addAsteroid.bind(this)
    this.enemyFire = this.enemyFire.bind(this)
    setInterval(this.addEnemy, 2000)
    setInterval(this.enemyFire, 1500)
    setInterval(this.addAsteroid, 4000)
  }

  // isOutOfBounds(pos){
  //   return (pos[0] < 0 || pos[1] < 0 || pos[0] > this.width || pos[1] > this.height)
  // }

  draw(ctx){
    ctx.clearRect(0, 0, this.width, this.height);
    this.checkCollisions(ctx);
    // this.playerShip.draw(ctx)
    this.allObjects().forEach((object)=>{
      object.draw(ctx)
    })
  }


  remove(object){
    if(object instanceof Bullet && object.color === 'blue'){
      this.playerBullets.splice(this.playerBullets.indexOf(object), 1)
    }else if(object instanceof Bullet && object.color === 'red'){
      this.enemyBullets.splice(this.enemyBullets.indexOf(object), 1)
    }else if(object instanceof Enemy){
      this.enemies.splice(this.enemies.indexOf(object), 1)
    }else if(object instanceof Ship){
      this.playerShip.pop()
    }else if(object instanceof Asteroid){
      this.asteroids.splice(this.asteroids.indexOf(object), 1)
    }else{
      throw new Error("unknown")
    }
  }

  allObjects(){
    return [].concat(this.enemies, this.asteroids, this.playerBullets, this.enemyBullets, this.playerShip)
  }
  allHazards(){
    return [].concat(this.enemies, this.asteroids, this.enemyBullets)
  }

  addEnemy(){
    const enemy = new Enemy({
      pos: this.randomTopPos(),
      imageRepo: this.imageRepo,
      game: this
    })
    this.enemies.push(enemy)
  }

  addAsteroid(){
    let asteroid = new Asteroid({
      game: this,
      asteroids: this.imageRepo.asteroids,
      pos: this.randomTopPos()
    })
    this.asteroids.push(asteroid)
  }

  enemyFire(){
    this.enemies.forEach((enemy)=>{
      enemy.fire()
    })
  }

  randomTopPos(){
    return [(Math.floor(Math.random() * (this.width - 70))), 0 ]
  }

  checkCollisions(ctx){
    this.playerBullets.forEach((bullet)=>{
      this.enemies.forEach((enemy)=>{
        if(bullet.isCollidedWith(enemy)){
          bullet.collision();
          enemy.collision(ctx)
        }
      })
    })

    const hazards = this.allHazards();
    hazards.forEach((hazard)=>{
      if(this.playerShip[0]){
        if(hazard.isCollidedWith(this.playerShip[0])){
          this.playerShip[0].collision(ctx);
          hazard.collision(ctx)
        }
      }
    })
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
