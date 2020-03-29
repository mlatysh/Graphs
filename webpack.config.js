
const rules = {
    rules: [
        {
            test: /\.css$/i,
            use: ['css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif|html)$/i,
            use: ['file-loader'],
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]
};


module.exports = [{
    output: {
        filename: 'main-dist.js'
    },
    name: 'main-bundle',
    entry: './src/main/main.js',
    mode: 'development',
    target: "electron-main"

},
    {
        output: {
            filename: 'renderer-dist.js'
        },
        target: "electron-renderer",
        name: 'renderer-bundle',
        entry: './src/renderer/index.js',
        mode: 'development',
        module: rules
    }];
