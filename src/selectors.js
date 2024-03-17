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

export {useButtons, useRenders}