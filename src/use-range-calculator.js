import {ref, computed, watch} from './reactivity.js'

const useRangeCalculator = () => {
    const speed = ref(100);
    const temperature = ref(20);
    const wheelSize = ref(19);
    const ac = ref(false);



    return {
        speed,
        temperature,
        wheelSize,
        ac
    }
}


export default useRangeCalculator