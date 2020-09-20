// Can be fetched from a server
const pathToJson = '../assets/sprite.json';

export default class AssetsLoader {
  constructor(beforeAssetsLoaded, onAssetsLoaded) {
    this.beforeAssetsLoaded = beforeAssetsLoaded;
    this.onAssetsLoaded = onAssetsLoaded;
    this.loader = PIXI.loader;
    
    this.initAssetsLoader();
  }

  initAssetsLoader() {
    this.loader.add('sprite', pathToJson);
    this.loader.on('progress', this.beforeAssetsLoaded);
    this.loader.once('complete', this.onAssetsLoaded);
    this.loader.load();
  }
}