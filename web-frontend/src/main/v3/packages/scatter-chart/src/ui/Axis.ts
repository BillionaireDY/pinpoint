import merge from 'lodash.merge';
import {
  AXIS_DEFAULT_TICK_COUNT,
  AXIS_INNER_PADDING,
  AXIS_TICK_WIDTH,
  COLOR_STROKE,
  COLOR_TEXT,
  CONTAINER_PADDING,
  TEXT_PADDING_BOTTOM,
  TEXT_PADDING_LEFT,
  TEXT_PADDING_RIGHT,
  TEXT_PADDING_TOP,
} from '../constants/ui';
import { Padding, AxisOption, DeepNonNullable, TickOption } from '../types/types';
import { Layer, LayerProps } from './Layer';

const AXIS_DEFAULT_FORMAT = (value: number | string) => value;

export interface AxisProps extends LayerProps {
  option?: AxisOption;
  padding?: DeepNonNullable<Padding>;
}

export class Axis extends Layer {
  min: AxisOption['min'] = 0;
  max: AxisOption['max'] = 1;
  innerPadding: NonNullable<AxisOption['padding']> = AXIS_INNER_PADDING;
  tick: DeepNonNullable<TickOption> = {
    color: COLOR_TEXT,
    strokeColor: COLOR_STROKE,
    width: AXIS_TICK_WIDTH,
    count: AXIS_DEFAULT_TICK_COUNT,
    format: AXIS_DEFAULT_FORMAT,
    padding: {
      top: TEXT_PADDING_TOP,
      bottom: TEXT_PADDING_BOTTOM,
      left: TEXT_PADDING_LEFT,
      right: TEXT_PADDING_RIGHT,
    },
    font: '',
  };
  strokeColor: AxisOption['strokeColor'] = COLOR_STROKE;
  padding: DeepNonNullable<Padding> = CONTAINER_PADDING;

  constructor({ option, ...props }: AxisProps) {
    super(props);
    this.setOption(option);
  }

  public setOption(option?: Partial<AxisOption>) {
    this.min = option?.min ?? this.min;
    this.max = option?.max ?? this.max;
    this.innerPadding = option?.padding ?? this.innerPadding;
    this.strokeColor = option?.strokeColor || this.strokeColor;
    this.tick = merge({}, this.tick, option?.tick);
    this.setStyle(option);
    return this;
  }

  public setStyle(option?: Partial<AxisOption>) {
    const font = option?.tick?.font || this.tick?.font;
    font && (this.context.font = font);
  }

  public setPadding(padding: Padding) {
    this.padding = { ...this.padding, ...padding };
    return this;
  }

  public setSize(...args: Parameters<Layer['setSize']>) {
    super.setSize(...args);
    return this;
  }

  public getOption() {
    return {
      min: this.min,
      max: this.max,
      tick: this.tick,
      padding: this.innerPadding,
      strokeColor: this.strokeColor,
    };
  }
}
