import Ship from './ship.js';

class Game{
  constructor(options){
    this.enemies = [];
    this.asteroids = [];
    this.width = options.width;
    this.height = options.height;
    this.playerShip = new Ship({
      pos:[(this.width/2),(this.height/2 + 50)],
      game: this,
      width: this.width,
      height: this.height 
    })
    this.bullets = [];
  }

  isOutOfBounds(pos){
    return (pos[0] < 0 || pos[1] < 0 || pos[0] > this.width || pos[1] > this.height)
  }

  draw(ctx){
    ctx.clearRect(0, 0, this.width, this.height);
    this.playerShip.draw(ctx)
  }
}

export default Game;
