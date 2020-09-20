export default class Background {
  constructor() {
    this.container = new PIXI.Container();

    this.setBackground();
  }

  setBackground() {
    this.background = new PIXI.Sprite(PIXI.loader.resources['sprite'].textures['BG.png']);
    this.container.addChild(this.background);
  }
}