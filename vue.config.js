const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleConcatenationPlugin = require('webpack').optimize.ModuleConcatenationPlugin;
 
// vue.config.js
module.exports = {
    configureWebpack: {
        output: {
            libraryExport: 'default'
        },
        plugins:[
            new ManifestPlugin(),
            new ModuleConcatenationPlugin()
        ]
    },
    pages: {
        index: {
            // entry for the page
            entry: './src/main.js',
            // the source template
            template: './public/index.html',
            // the output filename
            filename: 'index.html'
        }
    },
    publicPath: '/',
    outputDir: './dist'
};
