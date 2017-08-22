const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWenpackPlugin=require('clean-webpack-plugin');

module.exports={
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    devtool:'inline-source-map',
    devServer:{
      contentBase:path.join(__dirname,"dist"),
        compress:true,
        port:9000
    },
    plugins:[
        new CleanWenpackPlugin(['dist']),
      new HtmlWebpackPlugin({
          title:'输出管理'
      })
    ],
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                 use: [
                   'file-loader'
                 ]
            }
        ]
    }
};