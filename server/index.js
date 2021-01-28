//引用express
const express = require("express");

//定义一个app为express实例
const app = express();

//跨域模块需要引用代码
app.use(require('cors')());
//使用await函数这些需要加入中间件
app.use(express.json());
//托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'));

//在app.set设置变量
app.set('secret', 'i23sdesdf');

//导出到admin里的index用
require('./routes/admin')(app);
//引用db数据库，引用进来
require('./plugins/db')(app);


//启动
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
