import { ScatterDataType } from '../types/types';
import { countByTimeInterval } from '../utils/helper';
import { DataManager } from './DataManager';

export class LightDataManager extends DataManager {
  constructor() {
    super();
  }

  public addData(data: ScatterDataType[], append?: boolean) {
    if (!append) {
      this.reset();
    }
    const datasByLegend: { [key: string]: { x: number; y: number }[] } = {};
    data.forEach(({ type, x, y }) => {
      const legend = type ? type : 'unknown';
      if (datasByLegend[legend]) {
        datasByLegend[legend] = [...datasByLegend[legend], { x, y }];
      } else {
        datasByLegend[legend] = [{ x, y }];
      }
    });

    [...this.getLegendKeys(), ...Object.keys(datasByLegend)].forEach((legend) => {
      if (this.dataByLegend[legend]) {
        this.dataByLegend[legend].count = {
          ...this.dataByLegend[legend].count,
          ...countByTimeInterval(datasByLegend[legend]),
        };
      } else {
        this.dataByLegend[legend] = {};
        this.dataByLegend[legend].count = {
          ...countByTimeInterval(datasByLegend[legend]),
        };
      }
    });
  }

  public reset() {
    this.dataByLegend = {};
  }

  public getCount(legend: string) {
    console.log(this.dataByLegend[legend]);

    return Object.values(this.dataByLegend[legend]?.count || {}).reduce((acc: number, curr: number) => {
      return acc + curr;
    }, 0);
  }

  public getLegendKeys() {
    return Object.keys(this.dataByLegend);
  }

  public setDataByLegend(legend: string, data: ScatterDataType[]) {
    this.dataByLegend[legend].data = data;
  }
}
