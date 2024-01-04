import { Coord, ScatterDataType } from '../types/types';
import { DataManager } from './DataManager';

export class DefaultDataManager extends DataManager {
  constructor() {
    super();
  }

  public addData(data: ScatterDataType[], append?: boolean) {
    if (!append) {
      this.reset();
    }
    data.forEach((d) => {
      const legend = d.type ? d.type : 'unknown';
      if (this.dataByLegend[legend]) {
        this.dataByLegend[legend].data = [...(this.dataByLegend[legend]?.data || []), d];
      } else {
        this.dataByLegend[legend] = { data: [d] };
      }
    });
  }

  public reset() {
    this.dataByLegend = {};
  }

  public getAllData() {
    return this.getLegendKeys().reduce((acc, key) => {
      return [...acc, ...(this.getDataByLegend(key) || [])];
    }, [] as { x: number; y: number }[]);
  }

  public getDataByLegend(legend: string) {
    return this.dataByLegend[legend].data || [];
  }

  public getCount(legend: string, minCoord?: Coord, maxCoord?: Coord, drawOutOfRange?: boolean) {
    return (
      this.dataByLegend[legend].data?.reduce((acc, curr) => {
        const isInRangeX = curr.x >= (minCoord?.x || 0) && curr.x <= (maxCoord?.x || 0);
        const isInRangeY = drawOutOfRange
          ? curr.y >= (minCoord?.y || 0)
          : curr.y >= (minCoord?.y || 0) && curr.y <= (maxCoord?.y || 0);
        if (isInRangeX && isInRangeY) {
          return ++acc;
        }
        return acc;
      }, 0) || 0
    );
  }

  public getLegendKeys() {
    return Object.keys(this.dataByLegend);
  }
}
