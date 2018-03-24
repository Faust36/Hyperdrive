
class ImageRepo{
  constructor(){
    this.background = new Image();
    this.background.src = './assets/images/star2.jpg';
    this.redShip = this.enemyAnimation();
    this.blueShip = this.playerAnimation();
    this.blueExplosion = this.blueEffect();
    this.redExplosion = this.redEffect();
    this.asteroids = this.asteroids()
    this.bullet = new Image()
    this.bullet.src = './assets/sprites/Spaceship_art_pack/Blue/bullet.png'
    this.enemyBullet = new Image()
    this.enemyBullet.src = './assets/sprites/Spaceship_art_pack/Red/bullet_red.png'
    this.bossModel1 = new Image()
    this.bossModel1.src = './assets/sprites/Spaceship_art_pack/Red/mothership_try.png'
    this.bossModel2 = this.bossModel2()
    this.star = this.protonStar()
    this.bossExplosion = this.bossExplosion()

  }

  enemyAnimation(){
    let frames = []
    for(var i = 1; i < 9; i++){
      var pic = new Image();
      pic.src = `./assets/sprites/Spaceship_art_pack/Red/Enemy_animation/${i}.png`
      frames.push(pic)
    }
    return frames
  }

  playerAnimation(){
    let frames = []
    for(var i = 1; i < 9; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Blue/Animation/${i}.png`
      frames.push(pic)
    }
    return frames
  }

  blueEffect(){
    let frames = []
    for(var i = 0; i < 17; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Effects/Blue Effects/1_${i}.png`
      frames.push(pic)
    }
    return frames
  }

  redEffect(){
    let frames = []
    for(var i = 0; i < 17; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Effects/Red Explosion/1_${i}.png`
      frames.push(pic)
    }
    return frames
  }

  asteroids(){
    let frames = []
    for(var i = 1; i < 5; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Asteroids/asteroid${i}.png`
      frames.push(pic)
    }
    return frames
  }

  bossModel2(){
    let frames = []
    for(var i = 1; i < 4; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Red/comm_redship/${i}.png`
      frames.push(pic)
    }
    return frames
  }

  protonStar(){
    let frames = []
    for(var i = 0; i < 17; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Effects/Proton Star/p_Sprite_${i}.png`
      frames.push(pic)
    }
    return frames
  }

  bossExplosion(){
    let frames = []
    for(var i = 0; i < 17; i++){
      var pic = new Image();
      pic.src =  `./assets/sprites/Spaceship_art_pack/Effects/Galaxy/galaxy_${i}.png`
      frames.push(pic)
    }
    return frames
  }
}

export default ImageRepo;
