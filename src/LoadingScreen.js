export default class LoadingScreen {
  constructor() {
    this.textStyle = {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#ffffff',
    };
    this.container = new PIXI.Container();

    this.setLoadingScreen();
  }

  setLoadingScreen() {
    this.loadingText = new PIXI.Text('LOADING...', this.textStyle);
    this.loadingText.position.x = 480;
    this.loadingText.position.y = 268;
    this.loadingText.anchor.set(0.5);
    this.container.addChild(this.loadingText);
  }
}