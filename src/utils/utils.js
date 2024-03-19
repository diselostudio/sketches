export const GOLDEN_RATIO = 1.61803398874989;

// event event event -------> ingnore ------> trigger

export function debounce(fn, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { fn.apply(this, args) }, timeout)
    }
}

// event -------> trigger ------> ignore

export function throttle(fn, wait) {
    let throttled = false;
    return function (...args) {
        if (!throttled) {
            fn.apply(this, args)
            throttled = true
            setTimeout(() => {
                throttled = false
            }, wait)
        }
    }
}

export function curry(fn) {
    return function curried(...args) {
        if (args.length >= func.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

export function pipe(...fns) {
    return function (x) {
        return fns.reduce((v, f) => f(v), x);
    }
};

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}