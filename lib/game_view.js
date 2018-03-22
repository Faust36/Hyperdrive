
class GameView{
  constructor(ctx, game, background){
    this.ctx = ctx;
    this.game= game;
    this.ship = game.playerShip;
    this.background = background;
  }

  moveShip(){
    if(key.isPressed('w')){this.ship.move([0, -5])}
    if(key.isPressed('s')){this.ship.move([0, 5])}
    if(key.isPressed('d')){this.ship.move([5, 0])}
    if(key.isPressed('a')){this.ship.move([-5,0])}
    return false
  }

  start(){
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this))
  }

  animate(time){
    const timeChange = time - this.lastTime
    this.background.draw(this.background.ctx)
    this.moveShip();
    // this.game.step(timeChange);
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this))
  }
}

export default GameView;
