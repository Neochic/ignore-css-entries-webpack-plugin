# Ignore CSS Entries Webpack Plugin

Currently Webpack is only build to output JS bundles.
But in some cases it does make sense to generate separate CSS files. This can be achieved with the
[Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin).
But Webpack is also generating JS files for the entries that are only used for CSS generation.  
This simple plugin helps to keep the output clean.  
You can read more about that problem in an [Extract Text Plugin issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/518).  
**However this plugin is a temporary workaround until they have a [native solution in Webpack](https://medium.com/webpack/the-new-css-workflow-step-1-79583bd107d7) which they are working on.**   

## Usage
It's important to use [Object Syntax](https://webpack.js.org/concepts/entry-points/#object-syntax)
to define the entries. Additionally the chunk names that shouldn't be in the output should end on ```.css```.
The ```.css``` ending should then be omitted in the output path of the ExtractTextPlugin, because it's
already in the chunk name.  
```
module.exports = {
    entry: {
        "main": "js/main.js",
        "other": "js/other.ts",
        "main.css": "css/main.scss",
        "other.css": "css/other.less"
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: "[name].js"
    },
    plugins: [
        new ExtractTextPlugin('../css/[name]')
    ]
};
```
