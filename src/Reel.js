export default class Reel {
  constructor(shuffledSymbolsIds) {
    this.width = 240;
    this.middleRowSymbolPositionY = 188;
    // This coefficient helps to choose heigth on which symbol will move up on each tick
    this.animationSpeedCoefficient = 4;
    this.animation = true;
    this.position = {
      x: 0,
      y: 0
    };
    this.singleReel = [
      { id: 0, texture: PIXI.loader.resources['sprite'].textures['SYM7.png'] },
      { id: 1, texture: PIXI.loader.resources['sprite'].textures['SYM5.png'] },
      { id: 2, texture: PIXI.loader.resources['sprite'].textures['SYM4.png'] },
      { id: 3, texture: PIXI.loader.resources['sprite'].textures['SYM3.png'] },
      { id: 4, texture: PIXI.loader.resources['sprite'].textures['SYM6.png'] },
      { id: 5, texture: PIXI.loader.resources['sprite'].textures['SYM1.png'] }
    ];
    this.cachedReel = {};
    this.container = new PIXI.Container();
    this.container.position.x = this.position.x;
    this.container.position.y = this.position.y;

    this.createTurn(shuffledSymbolsIds);
    this.createReels();
  }

  createTurn(shuffledSymbolsIds) {
    const shuffledReel = [];
    for (let i = 0; i < shuffledSymbolsIds.length; i++) {
      this.singleReel.forEach(symbol => {
        if (symbol.id === shuffledSymbolsIds[i]) {
          shuffledReel.push(symbol);
        }
      });
    }
    this.singleReel = shuffledReel;
  }

  createReels() {
    for (let i = 0; i < this.singleReel.length; i++) {
      const symbol = new PIXI.Sprite(this.singleReel[i].texture);
      symbol.position.y = i * this.middleRowSymbolPositionY;
      this.cachedReel[`id_${this.singleReel[i].id}`] = symbol;
      this.container.addChild(symbol);
    }
  }

  startRotation(randomSymbolIndex, onEndSpin) {
    this.animation = true;
    // We assign it here to use later in result getter 
    this.middleRowSymbolIndex = randomSymbolIndex;
    this.setAnimationDuration(500);
    this.startAnimation(randomSymbolIndex, onEndSpin);
  }

  startAnimation(randomSymbolIndex, onEndSpin) {
    const randomSymbolPositionY = this.cachedReel[`id_${randomSymbolIndex}`].position.y;
    if (!this.animation && randomSymbolPositionY === this.middleRowSymbolPositionY) {
      onEndSpin();
      return false;
    }
    for (let i = 0; i < this.singleReel.length; i++) {
      const currentSymbol = this.cachedReel[`id_${i}`];
      currentSymbol.position.y -= this.middleRowSymbolPositionY / this.animationSpeedCoefficient;
      // Simulation of rotation:
      // When symbol reaches negative position by Y axis which equals its height,
      // (which means it goes over the game screen)
      // it is assigned position by Y axis under the game screen
      if (currentSymbol.position.y <= -this.middleRowSymbolPositionY) {
        currentSymbol.position.y = (this.singleReel.length - 1) * this.middleRowSymbolPositionY;
      }
    }
    requestAnimationFrame(this.startAnimation.bind(this, randomSymbolIndex, onEndSpin));
  }

  setAnimationDuration(additionalDelay) {
    setTimeout(() => this.animation = false, this.delay + additionalDelay);
  }

  stopAnimation() {
    this.animation = false;
  }

  get result() {
    return this.middleRowSymbolIndex;
  }
}