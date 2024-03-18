import useRangeCalculator from "./use-range-calculator.js";
import bind from "./bind.js";
import scrollTo from "./scroll-to.js";
import { applyClassInViewport } from './view-port.js';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.no-js').classList.remove('no-js')

    const {speed, temperature, wheelSize, ac, range100d, rangeP100d} = useRangeCalculator();
    bind({speed, temperature, wheelSize, ac, range100d, rangeP100d})

    document.querySelector('.button-scroll').addEventListener('click', () => {
        scrollTo('.range-calculator')
    })


    applyClassInViewport('.range-calculator .title', 'fade-in');
});

