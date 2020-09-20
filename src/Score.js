export default class Score {
  constructor() {
    this.textStyle = {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#ffff00',
    };
    this.container = new PIXI.Container();

    this.setBackground();
  }

  setBackground() {
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x2f4f4f, 0.75);
    this.background.drawRect(0, 0, 140, 60);
    this.background.endFill();
    this.background.x = 805;
    this.background.y = 356;
    this.container.addChild(this.background);
  }

  setScore(money, win) {
    if (this.moneyText && this.winText) {
      this.moneyText.text = '';
      this.winText.text = '';
    }

    this.moneyText = new PIXI.Text(`MONEY: ${money}`, this.textStyle);
    this.moneyText.position.x = 817;
    this.moneyText.position.y = 363;
    this.container.addChild(this.moneyText);

    this.winText = new PIXI.Text(`WIN: ${win}`, this.textStyle);
    this.winText.position.x = 817;
    this.winText.position.y = 388;
    this.container.addChild(this.winText);
  }
}