const targetMap = new WeakMap() // targetMap stores the effects that each object should re-run when it's updated
let activeEffect = null // The active effect running

function track(target, key) {
    if (activeEffect) {
        // <------ Check to see if we have an activeEffect
        // We need to make sure this effect is being tracked.
        let depsMap = targetMap.get(target) // Get the current depsMap for this target
        if (!depsMap) {
            // There is no map.
            targetMap.set(target, (depsMap = new Map())) // Create one
        }
        let dep = depsMap.get(key) // Get the current dependencies (effects) that need to be run when this is set
        if (!dep) {
            // There is no dependencies (effects)
            depsMap.set(key, (dep = new Set())) // Create a new Set
        }
        dep.add(activeEffect) // Add effect to dependency map
    }
}

function trigger(target, key) {
    const depsMap = targetMap.get(target) // Does this object have any properties that have dependencies (effects)
    if (!depsMap) {
        return
    }
    let dep = depsMap.get(key) // If there are dependencies (effects) associated with this
    if (dep) {
        dep.forEach((eff) => {
            // run them all
            eff()
        })
    }
}


function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            raw = newVal
            trigger(r, 'value')
        },
    }
    return r
}

function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

function computed(getter) {
    let result = ref()

    effect(() => (result.value = getter()))

    return result
}

function watch(source, callback) {
    // Store the previous value to compare with new one
    let oldValue;

    // Determine if the source is a ref or a getter function for computed
    const getter = typeof source === 'function' ? source : () => source.value;

    // Use the effect function to track changes.
    // The effect will re-run every time the reactive property accessed inside the getter changes.
    effect(() => {
        const newValue = getter();
        if (newValue !== oldValue) {
            // Call the callback with the new value and the old value
            callback(newValue, oldValue);
            oldValue = newValue;
        }
    });
}



export {
    computed,
    effect,
    ref,
    watch
}