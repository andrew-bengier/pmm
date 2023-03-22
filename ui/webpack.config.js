const path = require('path')
const { resourceLimits } = require('worker_threads')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '...']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    'babel-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.tsx?$/i,
                use: 'ts-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}
