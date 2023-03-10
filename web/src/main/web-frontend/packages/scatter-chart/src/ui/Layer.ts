import { LAYER_DEFAULT_PRIORITY } from "../constants/ui";
import { getDevicePicelRatio } from "../utils/helper";

export interface LayerProps {
  width?: number;
  height?: number;
  display?: boolean;
  fixed?: boolean;
  priority?: number;
}

export class Layer {
  private cvs: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private identifier: string = '';
  private display;
  private fixed;
  private priorityOrder;
  private displayPixcelRatio;

  constructor({
     width = 0,
     height = 0,
     display = true,
     fixed = false,
     priority = LAYER_DEFAULT_PRIORITY,
  }: LayerProps = {}) {
    this.displayPixcelRatio = getDevicePicelRatio();
    this.display = display;
    this.fixed = fixed;
    this.priorityOrder = priority;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext('2d')!;
    this.cvs.style.width = `${width}px`;
    this.cvs.style.height = `${height}px`;
    this.cvs.width = width * this.getDpr();
    this.cvs.height = height * this.getDpr();
    this.ctx.scale(this.getDpr(), this.getDpr());
  }

  private resetDpr() {
    this.displayPixcelRatio = getDevicePicelRatio();
  }

  public setSize(width: number, height: number) {
    this.clear();
    this.resetDpr();
    this.cvs.style.width = `${width}px`;
    this.cvs.style.height = `${height}px`;
    this.cvs.width = width * this.getDpr();
    this.cvs.height = height * this.getDpr();
    this.ctx.scale(this.getDpr(), this.getDpr());
  }

  public show() {
    this.display = true;
  }

  public hide() {
    this.display = false;
  }

  public clear() {
    this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
  }

  getDpr() {
    return this.displayPixcelRatio;
  }

  getPriority() {
    return this.priorityOrder;
  }

  setPriority(priority: number) {
    this.priorityOrder = priority;
  }

  getId() {
    return this.identifier;
  }

  setId(id: string) {
    this.identifier = id;
  }

  getIsFixed() {
    return this.fixed;
  }

  setIsFixed(fixed: boolean) {
    this.fixed = fixed;
  }

  getCanvas() {
    return this.cvs; 
  }

  getContext() {
    return this.ctx;
  }

  getIsDisplay() {
    return this.display;
  }

  public swapCanvasImage({width, startAt}: {width: number, startAt: number}) {   
    const rightImage = this.getContext().getImageData(
      (startAt + width) * this.getDpr(), 0, 
      this.getCanvas().width - (startAt + width) * this.getDpr(), this.getCanvas().height
    );
    this.clear();
    this.getContext().putImageData(rightImage, startAt * this.getDpr(), 0);
  }

  public getTextWidth(text: string) {
    const lines = `${text}`.split('\n');
    let largestWidth = lines.reduce((width, txt) => {
      const textWidth = this.getContext().measureText(`${txt}`).width;
      return width > textWidth ? width : textWidth; 
    }, 0)
    return largestWidth;
  }

  public getTextHeight(text: string) {
    const lines = `${text}`.split('\n');
    let totalHeight = lines.reduce((sum, txt) => {
      const metrics = this.getContext().measureText(`${txt}`);
      let textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
      return textHeight + sum;
    }, 0)
    return totalHeight;
  }
}