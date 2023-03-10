import { drawRect } from "../utils/draw";
import { Layer } from "./Layer";

export interface ViewportOption {
  width: number;
  height: number;
}

export class Viewport {
  private view: Layer;
  private layers: Layer[];
  
  constructor(wrapper: HTMLElement, {
    width = 0,
    height = 0,
  }) {
    this.layers = [];
    this.view = new Layer({
      width, 
      height,
    });
    this.view.getCanvas().style.display = 'block';
    wrapper.append(this.view.getCanvas());
  }

  getViewLayer() {
    return this.view;
  }

  getCanvas() {
    return this.view.getCanvas();
  }

  getContext() {
    return this.view.getContext();
  }

  getStyleWidth() {
    return this.view.getCanvas().width / this.view.getDpr();
  }

  getStyleHeight() {
    return this.view.getCanvas().height / this.view.getDpr();  
  }

  public render(x: number, y: number) {
    this.layers.forEach(layer => {
      const layerCanvas = layer.getCanvas();
      const dpr = layer.getDpr();
      
      if (layer.getIsDisplay()) {
        if (layer.getIsFixed()) {
          this.view.getContext().drawImage(
            layerCanvas, 
            0, 0, layerCanvas.width, layerCanvas.height, 
            0, 0, layerCanvas.width / dpr, layerCanvas.height / dpr
          );
        } else {
          this.view.getContext().drawImage(
            layerCanvas, 
            -x * dpr, y * dpr, layerCanvas.width, layerCanvas.height,
            0, y, layerCanvas.width / dpr, layerCanvas.height / dpr
          );
        }
      } 
    })
  }

  public hideLayer(id: string) {
    this.layers.filter(layer => layer.getId() === id)[0].hide();
  }

  public showLayer(id: string) {
    this.layers.filter(layer => layer.getId() === id)[0].show();
  }

  public addLayer(layer: Layer | Layer[]) {
    if (Array.isArray(layer)) {
      this.layers = [
        ...this.layers,
        ...layer,
      ];
    } else {
      this.layers.push(layer);
    }
    this.layers.sort((a, b) => {
      if (a.getPriority() > b.getPriority()) {
        return -1;
      } else 
        return 1;
    })
    
    return this;
  }

  public setSize(width: number, height: number) {
    this.view.setSize(width, height);
    this.layers.forEach(layer => {
      layer.setSize(width, height);
    });
    return this;
  } 

  public clear() {
    this.view.getContext().clearRect(0, 0, this.view.getCanvas().width, this.view.getCanvas().height);
  }
}