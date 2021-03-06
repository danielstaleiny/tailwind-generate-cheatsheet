const glob = require('glob')

const compose = (...fns) => {
    var [fn1, fn2, ...rest] = fns.reverse()

    var composedFn = (...args) => fn2(fn1(...args))

    if (rest.length == 0) return composedFn

    return compose(
        ...rest.reverse(),
        composedFn
    )
}

const prefixEleventy = 'dist/js/'
const removeBase = base => string => string.replace(base, '')
const prepareFile = base => file => ({
    name: file.slice(0, file.indexOf('-')).replace('/', '-'),
    value: 'js/' + file
})
const createObj = ({ name, value }) => ({ [name]: value })

let files = glob.sync(prefixEleventy + '**/*', { nodir: true }).map(
    compose(
        createObj,
        prepareFile(prefixEleventy),
        removeBase(prefixEleventy)
    )
)
console.log(files)
files =
    files.length > 0 ? files.reduce((acc, val) => Object.assign(acc, val)) : {}

module.exports = files
