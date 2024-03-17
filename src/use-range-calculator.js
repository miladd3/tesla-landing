import {computed, ref} from './reactivity.js'
import data100d from '../data/metric-100D.json'
import dataP100d from '../data/metric-P100D.json'

const useRangeCalculator = () => {
    const speed = ref(100);
    const temperature = ref(20);
    const wheelSize = ref(19);
    const ac = ref(false);

    const acString = computed(() => ac.value ? 'on' : 'off')
    const wheelSizeNum = computed(() => parseInt(wheelSize.value))


    const findRange = (data) => {
        const range = data.find(({temp, wheelsize, ac}) =>
            temp === temperature.value && wheelsize === wheelSizeNum.value && ac === acString.value)?.hwy

        return range?.find(r => r?.kmh === speed.value)?.kilometers
    }

    const range100d = computed(() => findRange(data100d))
    const rangeP100d = computed(() => findRange(dataP100d))

    return {
        speed,
        temperature,
        wheelSize,
        ac,
        range100d,
        rangeP100d
    }
}


export default useRangeCalculator