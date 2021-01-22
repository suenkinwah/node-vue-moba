//路由里面的index.js


//导出一个函数app
module.exports = app =>{
    //定义一个express
    const  express = require('express');
    //定义一个router(这是express的子路由)
    const router = express.Router();
    //引用models文件夹里的category.js
    const Category = require('../../models/Category');


    //router上加一个post方法
    //创建分类接口
    router.post('/categories', async (req, res)=> {
        //把数据存进去，前提要建个plugins文件夹来运行数据库
        //创建数据，用category.create方法创建数据，数据来源是req.body客户端提交的数据
       const model = await Category.create(req.body);
       //发回客户端，让客户端知道完成了
       res.send(model);
    });



    //接收id和内容(分类名称)接口
    router.put('/categories/:id', async (req, res)=> {
        const model = await Category.findByIdAndUpdate(req.params.id,req.body);
        res.send(model);
    });

    //删除接口
    router.delete('/categories/:id', async (req, res)=> {
        await Category.findByIdAndDelete(req.params.id,req.body);
        res.send({
            success:true
        });
    });

    //分类列表接口，limit限制10条
    router.get('/categories', async (req, res)=> {
        //find查找分类列表数据，并且limit为限制10条
        const items = await Category.find().limit(10);
        //发回客户端完成操作
        res.send(items);
    });


    //获取某个详情页接口，就是某个id页的edit编辑页面
    router.get('/categories/:id', async (req, res)=> {
        const model = await Category.findById(req.params.id);
        res.send(model);
    });



    //分类接口定义完成，就是/admin/api/categories
    app.use('/admin/api',router);
};
