import Game from './game.js';
import GameView from './game_view.js';
import ImageRepo from './image_repo.js';
import Background from './background.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const imageRepo = new ImageRepo();
  const bgcanvas = document.getElementById('background')
  const bgctx = bgcanvas.getContext('2d')
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const song = document.getElementById('music')
  const background = new Background({
    x: 0,
    y: 0,
    width: bgcanvas.width,
    height: bgcanvas.height,
    backgroundImage: imageRepo.background,
    ctx: bgctx
  })
  document.getElementById('play').addEventListener('click', ()=>{
    song.pause()
    song.mute = false
    song.currentTime = 0
    song.play()
    song.loop = true
    let game = new Game({width: canvas.width, height: canvas.height, imageRepo: imageRepo});
    new GameView(ctx, game, background, song).start()
  })


})
