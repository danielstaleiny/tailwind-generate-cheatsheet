var tailwindcss = require('tailwindcss')

module.exports = {
    plugins: [
        require('postcss-easy-import'),
        tailwindcss('./styles/tailwind.config.js')
    ]
}
