module.exports = config => {
    // config.addPassthroughCopy("img"); // example
    return {
        markdownTemplateEngine: 'liquid',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'pages',
            output: 'dist',
            data: '../store'
        }
    }
}
