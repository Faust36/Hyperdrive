
class GameView{
  constructor(ctx, game, background, song){
    this.ctx = ctx;
    this.game= game;
    this.ship = game.playerShip[0];
    this.background = background;
    this.song = song
  }

  updateShip(){
    if(key.isPressed('w')){this.ship.move([0, -5])}
    if(key.isPressed('s')){this.ship.move([0, 5])}
    if(key.isPressed('d')){this.ship.move([5, 0])}
    if(key.isPressed('a')){this.ship.move([-5,0])}

    return false
  }

  start(){
    document.getElementById('gameOver').classList.add('invisible')
    this.lastTime = 0;
    key("space",()=>{this.ship.fire()})
    requestAnimationFrame(this.animate.bind(this))
  }

  animate(time){
    const timeChange = time - this.lastTime
    this.background.draw(this.background.ctx)
    this.updateShip();
    this.game.draw(this.ctx);
    this.lastTime = time;
    if(this.game.gameOver === false){
      requestAnimationFrame(this.animate.bind(this))
    }else{
      document.getElementById('gameOver').classList.remove('invisible')
      let audios = document.querySelectorAll('audio')
      audios.forEach((audio)=>{
        audio.mute = true
        audio.pause()
      })
      this.song.pause()
      this.song.mute = true
      this.song.loop = false
    }
  }

}

export default GameView;
