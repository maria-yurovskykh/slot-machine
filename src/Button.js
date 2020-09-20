export default class Button {
  constructor(onStartSpin) {
    this.onStartSpin = onStartSpin;
    this.position = {
      x: 825,
      y: 219
    };
    this.active = true;
    this.container = new PIXI.Container();

    this.initButton();
    this.bindClick();
  }

  initButton() {
    this.activeButton = PIXI.loader.resources['sprite'].textures['BTN_Spin.png'];
    this.inactiveButton = PIXI.loader.resources['sprite'].textures['BTN_Spin_d.png'];
    this.container.position.x = this.position.x;
    this.container.position.y = this.position.y;
    this.button = this.createButton();
    this.container.addChild(this.button);
  }

  createButton() {
    const button = new PIXI.Sprite(this.activeButton);
    button.buttonMode = true;
    button.interactive = true;

    return button;
  }

  bindClick() {
    this.button.addListener('pointerdown', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    if (!this.active) return;
    this.toggleButtonState();
    this.onStartSpin();
  }

  toggleButtonState() {
    this.active = !this.active;
    this.button.texture = this.active ? this.activeButton : this.inactiveButton;
  }
}