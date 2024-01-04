import data1 from '../mock/data1.json';
import { newScatterChart } from './createDefault';

export const createLightMode = () => {
  const wrapper = document.createElement('div');
  const btnElement = document.createElement('button');
  btnElement.innerHTML = 'destroy';
  const btnElement1 = document.createElement('button');
  btnElement1.innerHTML = 'resize';
  const btnElement2 = document.createElement('button');
  btnElement2.innerHTML = 'resize 500 by 500';

  setTimeout(() => {
    const SC = newScatterChart(wrapper, { mode: 'light' });
    SC.render(data1.data);
    wrapper.append(btnElement1);
    wrapper.append(btnElement2);
    SC.on('resize', (_, { width, height }) => {
      alert(`resize() triggered, width is ${width}, height is ${height}`);
    });
    btnElement1.addEventListener('click', () => {
      SC.resize();
    });

    btnElement2.addEventListener('click', () => {
      SC.resize(500, 500);
    });
  }, 500);
  return wrapper;
};
