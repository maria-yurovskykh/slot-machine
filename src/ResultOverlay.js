export default class ResultOverlay {
  constructor() {
    this.resultStyle = {
      fontFamily: 'Arial',
      fontSize: 120,
      fill: '#ffff00',
      dropShadow: true,
      dropShadowColor: '#000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI,
    };
    this.scoreStyle = {
      fontFamily: 'Arial',
      fill: '#ffff00',
      fontSize: 20
    };
    this.overlayClearDelay = 3000;
    this.container = new PIXI.Container();

    this.setBackground();
  }

  setBackground() {
    this.backgroung = new PIXI.Graphics();
    this.backgroung.beginFill(0x2f4f4f, 0.75);
    this.backgroung.drawRect(0, 0, 717, 360);
    this.backgroung.endFill();
    this.backgroung.x = 70;
    this.backgroung.y = 88;
    this.container.addChild(this.backgroung);
  }

  setText(text, win) {
    this.resultText = new PIXI.Text(text, this.resultStyle);
    this.resultText.position.x = 430;
    this.resultText.position.y = 268;
    this.resultText.anchor.set(0.5);
    this.container.addChild(this.resultText);

    this.scoreText = new PIXI.Text(`YOUR SCORE: ${win}`, this.scoreStyle);
    this.scoreText.position.x = 430;
    this.scoreText.position.y = 380;
    this.scoreText.anchor.set(0.5);
    this.container.addChild(this.scoreText);

    if (this.resultText) {
      setTimeout(() => {
        this.clearOverlay();
      }, this.overlayClearDelay);
    }
  }

  clearOverlay() {
    this.resultText.text = '';
    this.scoreText.text = '';
    this.backgroung.clear();
  }
}