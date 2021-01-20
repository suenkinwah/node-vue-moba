//引用express
const express = require("express");

//定义一个app为express实例
const app = express();

app.use(require('cors')());
app.use(express.json());


//导出到admin里的index用
require('./routes/admin')(app);
require('./plugins/db')(app);


//启动
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
