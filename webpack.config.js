const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
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

const prefixEleventy = 'pages/'
const removeBase = base => string => string.replace(base, '')
const prepareFile = base => file => ({
    name: file.slice(0, file.indexOf('.')).replace('/', '-'),
    value: './' + base + file.slice(0, file.indexOf('.')) + '.js'
})
const createObj = ({ name, dir, value }) => ({ [name]: value })

module.exports = () => {
    const files = glob
        .sync(prefixEleventy + '**/*.js', { nodir: true })
        .map(
            compose(
                createObj,
                prepareFile(prefixEleventy),
                removeBase(prefixEleventy)
            )
        )
        .reduce((acc, val) => Object.assign(acc, val))

    console.log(files)
    return {
        mode: process.env.NODE_ENV || 'development',
        entry: files,
        plugins: [new CleanWebpackPlugin(['dist/_js'])],
        devtool:
            process.env.NODE_ENV === 'production'
                ? undefined
                : 'inline-source-map',
        output: {
            filename: '[name]-[hash].js',
            path: path.resolve(__dirname, 'dist', '_js')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
                // ,{
                //   test: /\.(png|svg|jpg|gif)$/,
                //   use: ["file-loader"]
                // },
                // {
                //   test: /\.(woff|woff2|eot|ttf|otf)$/,
                //   use: ["file-loader"]
                // }
            ]
        }
    }
}
