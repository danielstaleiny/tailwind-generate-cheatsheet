// execute functions from right to left
// more info in any functional lib compose

// example
// instead of fn2(fn1(props))
// you use compose(fn2,fn1)
// you can call it later with props

const compose = (...fns) => {
    var [fn1, fn2, ...rest] = fns.reverse()

    var composedFn = (...args) => fn2(fn1(...args))

    if (rest.length == 0) return composedFn

    return compose(...rest.reverse(), composedFn)
}

export default compose
