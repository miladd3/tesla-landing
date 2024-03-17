import {useButtons, useRenders} from "./selectors.js";
import {computed, watch} from "./reactivity.js";

const bind = ({speed, temperature, wheelSize, ac, range100d}) => {
    const buttons = useButtons();
    const renders = useRenders();
    const rangeCalculator = document.querySelector('.range-calculator');


    buttons.speedPlus.addEventListener('click', () => {
        if (speed.value < 140)
            speed.value += 10
    })

    buttons.speedMinus.addEventListener('click', () => {
        if (speed.value > 70)
            speed.value -= 10
    })


    watch(speed, () =>
        renders.speed.innerHTML = speed.value
    )

    buttons.temperaturePlus.addEventListener('click', () => {
        if (temperature.value < 40)
            temperature.value += 10
    })

    buttons.temperatureMinus.addEventListener('click', () => {
        if (temperature.value > -10)
            temperature.value -= 10
    })


    watch(temperature, () =>
        renders.temperature.innerHTML = temperature.value
    )

    buttons.radioButtons.forEach(() => {
        addEventListener('change', e => {
            wheelSize.value = e?.target?.value
        })
    })


    watch(wheelSize, (val) => {
        const wheels = rangeCalculator.querySelector('.wheels');
        if (wheels)
            rangeCalculator.querySelector('.wheels').className = `wheels -size-${val}`
    })


    buttons.ac.addEventListener('click', () => {
        ac.value = !ac.value
    })

    const acClass = computed(() =>
        `-${temperature.value > 10 ? 'ac' : 'heat'}-${ac.value ? 'on' : 'off'}`
    )

    const acText = computed(() => `${temperature.value > 10 ? 'AC' : 'HEAT'} ${ac.value ? 'ON' : 'OFF'}`)

    watch(acClass, (val) => {
        if (buttons.ac)
            buttons.ac.className = `ac-button ${val}`
    })

    watch(acText, (val) => {
        if (buttons.ac)
            buttons.ac.querySelector('.state').innerHTML = val
    })

    watch(range100d, (val) => {
        if (rangeCalculator)
            rangeCalculator.querySelector('#range-100d').innerHTML = val
    })
}

export default bind