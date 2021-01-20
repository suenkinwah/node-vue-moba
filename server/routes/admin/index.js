//路由里面的index.js


//导出一个函数app
module.exports = app =>{

    const  express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');

    router.post('/categories', async (req, res)=> {

       const model = await Category.create(req.body);
       res.send(model);
    });
    app.use('/admin/api',router);
};
