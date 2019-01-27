const path = require('path')

//导入webpack
//热模块替换的插件 HMR 在webpack中内置了
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    entry:'./src/main.js',   //  entry 是指定打包文件的入口，可以使用相对路径
    output:{
        path:path.join(__dirname,'dist'),   //output是指输出的目录，必须是绝对路径
        filename:'bundle.js'
    },
    mode:'development',
    //配置DevServer节点
    devServer:{
        contentBase:"./src",    //  托管的根目录
        hot:true,     //要开启或关闭HMR
        open:true,      //  自动打开浏览器
        port:3000       //设置DevServer的端口号
    },
    plugins:[
        //装了插件表示当前项目有资格开启HMR
        new webpack.HotModuleReplacementPlugin(),
        //按照插件
        //如果不传入任何配置选项，默认也会创建一个index.html 托管在服务器路径
        //只不过这个HTML是空的，title默认是webpack app
        new HtmlWebpackPlugin({
            // title:"咩咩是个大笨蛋",   如果模版中有title，会覆盖这里的配置
            template:"./src/index.html"
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:[
                //     {loader:'style-loader'},
                //     {
                //         loader:'css-loader',
                //         options:{
                //             modules:true
                //         }
                //     }
                // ]
                //css-loader 用于解析css文件
                //style-loader 用于将css代码 使用js动态的插入到html中，减少二次请求
                //use使用loader时 顺序是固定的从右到左的加载
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|gif|bmp|jpeg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:8192  //字节 Byte 如果在8192个字节（8kb）内 就使用base64编码
                        }
                    }
                ]
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                use:[{
                    loader:'url-loader'
                }]
            }
        ]
    }
}