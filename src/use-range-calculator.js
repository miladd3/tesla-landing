import {ref, computed, watch} from './reactivity.js'
import data100d from '../data/metric-100D.json'
import dataP100D from '../data/metric-P100D.json'

const useButtons = () => {
    const rangeCalculator = document.querySelector('.range-calculator');

    const speedPlus = rangeCalculator.querySelector('#speed-input .plus')
    const speedMinus = rangeCalculator.querySelector('#speed-input .minus')

    const temperaturePlus = rangeCalculator.querySelector('#temperature-input .plus')
    const temperatureMinus = rangeCalculator.querySelector('#temperature-input .minus')

    const ac = rangeCalculator.querySelector('.ac-button')

    const radioButtons = rangeCalculator.querySelectorAll('#wheel-input input[type="radio"]')

    return {
        speedPlus,
        speedMinus,
        temperaturePlus,
        temperatureMinus,
        ac,
        radioButtons
    }
}

const useRenders = () => {
    const rangeCalculator = document.querySelector('.range-calculator');

    const speed = rangeCalculator.querySelector('#speed-input .render')
    const temperature = rangeCalculator.querySelector('#temperature-input .render')

    return {
        speed,
        temperature
    }
}

const useRangeCalculator = () => {
    const speed = ref(100);
    const temperature = ref(20);
    const wheelSize = ref(19);
    const ac = ref(false);

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

    buttons.radioButtons.forEach(radio => {
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

    return {
        speed,
        temperature,
        wheelSize,
        ac
    }
}


export default useRangeCalculator