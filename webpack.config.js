const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath);
}
module.exports = {
    entry : {
        "main":"./src/main.js"
    },
    output: {
        filename:'[name].js',
        chunkFilename: 'js/[name].js',
        path:path.resolve(__dirname,"dist")
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            },
            {//引入less
                test: /main\.less$/,
                loaders: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.less$/,
                exclude: /main\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader?sourceMap']
                })
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['syntax-dynamic-import']
                    },

                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(woff?|eot|ttf|otf|svg|woff2)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: 'main.css',
            ignoreOrder: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            // filename:"vendor.js"//忽略则以name为输出文件的名字，否则以此为输出文件名字
        }),
        new htmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            favicon:'./src/favicon.png' //favicon路径
            // inject:true,    //允许插件修改哪些内容，true/'head'/'body'/false,
            // hash:false,    //为静态资源生成hash值
            // minify:{    //压缩HTML文件
            //     removeComments:false,    //移除HTML中的注释
            //     collapseWhitespace:false    //删除空白符与换行符
            // }
        }),
        new CopyWebpackPlugin([
            {from:"./src/assets",to:"assets"},
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            'assets':resolve('./src/assets'),
            'src':resolve('./src'),
        },
        extensions: ['.js', '.vue','.css'],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8484,
        inline: true,//实时刷新
        hot: true//自动刷新
    },

}