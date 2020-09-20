import AssetsLoader from './AssetsLoader';
import Background from './Background';
import Button from './Button';
import LoadingScreen from './LoadingScreen';
import ReelContainer from './ReelContainer';
import ResultOverlay from './ResultOverlay';
import Score from './Score';

export default class App {
  constructor() {
    this.width = 960;
    this.height = 536;
    this.reelCount = 0;
    this.spinCount = 0;
    this.money = 100;
    this.win = 0;
    this.stage = new PIXI.Container();

    this.createRenderer();

    new AssetsLoader(this.createLoadingScreen.bind(this), this.initApp.bind(this));
  }

  createRenderer() {
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    this.renderer.render(this.stage);
    document.body.appendChild(this.renderer.view);
  }

  addInstanceToStage(instance) {
    this.stage.addChild(instance);
    this.renderer.render(this.stage);
  }

  createLoadingScreen() {
    this.loader = new LoadingScreen();
    this.addInstanceToStage(this.loader.container);
  }

  createBackground() {
    this.background = new Background();
    this.addInstanceToStage(this.background.container);
  }

  createReels() {
    this.reels = new ReelContainer();
    this.addInstanceToStage(this.reels.container);
  }

  createButton() {
    this.button = new Button(this.onStartSpin.bind(this));
    this.addInstanceToStage(this.button.container);
  }

  createScore() {
    this.score = new Score();
    this.score.setScore(this.money, this.win);
    this.addInstanceToStage(this.score.container);
  }

  showResult(text) {
    this.result = new ResultOverlay();
    this.result.setText(text, this.win);
    this.addInstanceToStage(this.result.container);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
  }

  initApp() {
    // Simulate behavior of async request for sprite and sprite data in JSON
    setTimeout(() => {
      this.createBackground();
      this.createReels();
      this.createButton();
      this.createScore();
      this.animate();
    }, 1500);
  }

  onStartSpin() {
    this.reelCount = 0;
    this.spinCount = this.spinCount === 5 ? 1 : ++this.spinCount;
    this.money -= 5;
    if (this.result) {
      this.result.clearOverlay();
    }
    this.score.setScore(this.money, this.win);
    this.reels.rotate(this.onEndSpin.bind(this), this.spinCount);
  }

  onEndSpin() {
    this.reelCount++;
    if (this.reelCount === 3) {
      this.button.toggleButtonState();
      if (this.reels.checkRows(this.reels.finalResult)) {
        this.win += 10;
        this.money += 10;
        this.showResult('YOU WON!');
      }
      // If after a spin the amount of money is 0 and player wins
      // we need to update the score before we checking for money left on balance
      this.score.setScore(this.money, this.win);
      if (this.money === 0) {
        this.showResult('YOU LOSE!');
        this.button.toggleButtonState();
      }
    }
  }
}