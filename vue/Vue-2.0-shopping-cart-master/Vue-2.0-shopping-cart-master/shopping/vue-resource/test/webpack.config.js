module.exports = {
    entry: __dirname + '/router.js',
    output: {
        path: __dirname + '/',
        filename: 'specs.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'buble-loader', exclude: /node_modules/}
        ]
    }
};
