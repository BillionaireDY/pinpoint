import { BackgroundOption, PointOption, RenderOption } from '../types/types';
import { COLOR_BACKGROUND, POINT_RADIUS } from './ui';

export const defaultPointOption: PointOption = {
  radius: POINT_RADIUS,
  opacity: 1,
};

export const defaultBackgroundOption: BackgroundOption = {
  color: COLOR_BACKGROUND,
};

export const defaultRenderOption: RenderOption = {
  append: false,
  drawOutOfRange: false,
};
