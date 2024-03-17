import useRangeCalculator from "./use-range-calculator.js";
import bind from "./bind.js";

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.no-js').classList.remove('no-js')

    const {speed,temperature,wheelSize, ac, range100d} = useRangeCalculator();
    bind({speed,temperature,wheelSize,ac, range100d})

});

