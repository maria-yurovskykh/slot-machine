import Reel from './Reel';

export default class ReelContainer {
  constructor() {
    this.x = 70;
    this.y = 0;
    this.width = 718;
    this.height = 536;
    this.delay = 500;
    this.symbolsQuantity = 6;
    this.symbolsIds = [0, 1, 2, 3, 4, 5];
    this.reels = Array.from({ length: 3 }, () => new Reel(this.shuffleSymbolsIds()));
    this.container = new PIXI.Container();
    this.container.x = this.x;
    this.container.y = this.y;

    this.addReel();
  }

  shuffleSymbolsIds() {
    return this.symbolsIds.sort(() => 0.5 - Math.random());
  }

  addReel() {
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      reel.delay = this.delay * i;
      reel.container.position.x = reel.width * i;
      this.container.addChild(reel.container);
    }
  }

  rotate(onEndSpin, spinCount) {
    this.finalResult = [];
    const symbolsQuantityNoWild = this.symbolsQuantity - 1;
    const randomWinSymbolIndex = Math.floor(Math.random() * symbolsQuantityNoWild);

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      const randomSymbolIndex = Math.floor(Math.random() * this.symbolsQuantity);
      // Show winning screen after each 5th spin
      (spinCount === 5) ?
        reel.startRotation(randomWinSymbolIndex, onEndSpin) :
        reel.startRotation(randomSymbolIndex, onEndSpin);
      this.finalResult.push(reel.result);
    }
  }

  checkResult(result) {
    // 5 - is the index of Wild symbol
    if (result.includes(5)) {
      if (result.every((value) => value === 5)) {
        return false;
      }
      return result.some((value, index) => result.indexOf(value) !== index);
    } else {
      return result.every((value) => value === result[0]);
    }
  }

  checkRows(result) {
    return this.checkResult(result);
  }
}