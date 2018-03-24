import Util from './util.js';

class Asteroid{
  constructor(options){
    // this.movement = Asteroid.MOVEMENTS[(Math.floor(Math.random() * 4))]
    this.pos = options.pos
    this.speed = [0,0.4]
    this.asteroids = options.asteroids
    this.util = new Util();
    this.game = options.game
    this.radius = 15
    this.index = Math.floor((Math.random() * 4))
    this.degree = 1
    this.collided = false
    this.collisionFrame = 0
    this.explosion = options.explosion
    this.rock = options.rock
    // this.randomUpperLeft = this.randomUpperLeft.bind(this)
    // this.randomLowerLeft = this.randomLowerLeft.bind(this)
    // this.randomUpperRight = this.randomUpperRight.bind(this)
    // this.randomLowerRight = this.randomLowerRight.bind(this)
  }

  draw(ctx){
    if (!this.collided) {
      ctx.save();
      ctx.translate(this.pos[0], this.pos[1])
      ctx.rotate(this.degree * Math.PI/180)
      ctx.drawImage(this.asteroids[this.index], -30, -30, 60, 60)
      ctx.restore()
      if(this.degree < 361){
        this.degree += 1
      }else{
        this.degree = 1
      }
      this.pos[0] += this.speed[0]
      this.pos[1] += this.speed[1]
      if(this.isOutOfBounds(this.pos)){
        this.game.remove(this)
      }
    }else if (this.collided && this.collisionFrame < this.explosion.length) {
      ctx.drawImage(this.explosion[this.collisionFrame], (this.pos[0]-60), (this.pos[1]-60), 200, 200)
      this.collisionFrame += 1
    }else {
      this.game.remove(this)
    }
  }

  isOutOfBounds(pos){
    return (pos[0] < 0 || pos[1] < 0 || pos[0] > this.game.width || pos[1] > this.game.height)
  }

  isCollidedWith(otherObject) {
    const centerDist = this.util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  collision(ctx){
    this.rock.play()
    this.collided = true
  }

  // generateMovements(){
  //   return [
  //     [
  //       this.randomUpperLeft(),
  //       [1,1]
  //     ],
  //     [
  //       this.randomLowerLeft(),
  //       [1, -1]
  //     ],
  //     [
  //       this.randomUpperRight(),
  //       [-1, 1]
  //     ],
  //     [
  //       this.randomLowerRight(),
  //       [-1,-1]
  //     ]
  //   ]
  // }
  //
  // randomUpperLeft(){
  //   return [0, (Math.floor(Math.random() * (this.game.height/2))]
  // }
  // randomLowerLeft(){
  //   return [0, (Math.floor(Math.random() * (this.game.height/2) + this.game.height/2 )]
  // }
  // randomUpperRight(){
  //   return [this.game.width, (Math.floor(Math.random() * (this.game.height/2))]
  // }
  // randomLowerRight(){
  //   return [this.game.width, (Math.floor(Math.random() * (this.game.height/2) + this.game.height/2 )]
  // }
}

Asteroid.MOVEMENTS = [
  [
    // [0, (Math.floor(Math.random() * 300))],
    [0, 200],
    [1,1]
  ],
  [
    // [0, (Math.floor(Math.random() * 300)+300)],
    [0, 400],
    [1,-1]
  ],
  [
    // [800, (Math.floor(Math.random() * 300))],
    [800, 200],
    [-1,1]
  ],
  [
    // [800, (Math.floor(Math.random() * 300)+300)],
    [800, 400],
    [-1,-1]
  ]
]

export default Asteroid;
