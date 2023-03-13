import 'jest-canvas-mock';
import { fireEvent, screen, waitFor } from '@testing-library/dom'
import data1 from './mock/data1.json';
import data2 from './mock/data2.json';
import { initOption, ScatterChartTestHelper } from './helper';

describe('Test for Scatter', () => {
  let SC: ScatterChartTestHelper;
  let wrapper: HTMLDivElement = document.createElement('div');

  describe('Test for Scatter Method', () => {
    it('should check data rendered by `render` method', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);

      // when
      SC.render(data1.data);

      // then
      const events = SC.viewport.getContext().__getEvents();
      expect(events).toMatchSnapshot();
    });

    it('should check data rendered by `render` method with append flag is true', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);

      // when
      SC.render(data1.data, { append: true });
      SC.render(data2.data, { append: true });

      // then
      const events = SC.viewport.getContext().__getEvents();
      expect(events).toMatchSnapshot();
    });

    it('should render all data then greater than y.min when drawOutOfRange flag is true', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);
      const dataCount = data1.data.filter(d => d.y > SC.getYAxis().min && d.type === 'success').length;

      // when
      SC.render(data1.data, { drawOutOfRange: true });
      const successCount = wrapper.querySelector('.success .__scatter_chart__legend_count')?.innerHTML;

      // then
      waitFor(() => {
        expect(successCount).toBe(`${dataCount}`);
      })
    });

    it('should occur callback function registerd by `on` method when clicking chart area', () => {
      // given
      const onClick = jest.fn();
      SC = new ScatterChartTestHelper(wrapper, initOption);
      SC.on('click', onClick)

      // when
      fireEvent.click(SC.getGuide().getCanvas())

      // then
      expect(onClick).toHaveBeenCalled();
    });

    it('should occur callback function registerd by `on` method when clicking legend area', () => {
      // given
      const onClick = jest.fn();
      SC = new ScatterChartTestHelper(wrapper, initOption);
      SC.on('clickLegend', onClick)

      // when
      const inputElement = SC.getLegend().getContainer().getElementsByTagName('input')[0];
      fireEvent.click(inputElement)

      // then
      expect(onClick).toHaveBeenCalled();
      expect(onClick.mock.calls[0][1]).toMatchObject({ checked: ['fail'] })
    });

    it('should not occur callback function when remove callback event by `off` method', () => {
      // given
      const onClick = jest.fn();
      SC = new ScatterChartTestHelper(wrapper, initOption);
      SC.on('click', onClick);
      SC.off('click');

      // when
      fireEvent.click(SC.getGuide().getCanvas())

      // then
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should be resized by `resize` method', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);

      // when
      SC.resize(100, 100);

      // then
      expect(SC.viewport.getStyleWidth()).toBe(100);
      expect(SC.viewport.getStyleHeight()).toBe(100);
    });

    it('data should be cleared by `clear` method', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);
      
      // when
      SC.clear();

      // then
      expect(SC.getData().length).toBe(0);
    });

    it('all legends should be 0 by `clear` method', () => {
      // given
      SC = new ScatterChartTestHelper(wrapper, initOption);
      SC.render(data1.data);
      
      // when
      SC.clear();

      // then
      const successCount = wrapper.querySelector('.success .__scatter_chart__legend_count')?.innerHTML;
      const failCount = wrapper.querySelector('.fail .__scatter_chart__legend_count')?.innerHTML;
      waitFor(() => {
        expect(successCount).toBe('0');
        expect(failCount).toBe('0');
      })
    });
  });
})
