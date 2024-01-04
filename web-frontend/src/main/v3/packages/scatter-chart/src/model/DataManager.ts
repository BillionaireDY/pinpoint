/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Coord, ScatterDataType } from '../types/types';

export class DataManager {
  dataByLegend: {
    [key: string]: { data?: ScatterDataType[]; count?: { [key: number]: number } };
  };
  constructor() {
    this.dataByLegend = {};
  }
  public reset() {}
  public addData(data: ScatterDataType[], append?: boolean) {}
  public getDataByLegend(legend: string): ScatterDataType[] {
    return [];
  }
  public getAllData(): { x: number; y: number }[] {
    return [];
  }
  public getCount(legend: string, minCoord?: Coord, maxCoord?: Coord, drawOutOfRange?: boolean): number {
    return 0;
  }
  public getLegendKeys() {
    return Object.keys(this.dataByLegend);
  }
  public setDataByLegend(legend: string, data: ScatterDataType[]) {}
}
