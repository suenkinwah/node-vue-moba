//路由里面的index.js


//导出一个函数app
module.exports = app =>{
    //定义一个express
    const  express = require('express');
    //定义一个router(这是express的子路由)
    const router = express.Router({
        //表示合并URL参数
        mergeParams:true
    });
    //引用models文件夹里的category.js
    // const Category = require('../../models/Category');


    //router上加一个post方法
    //创建分类接口
    router.post('/', async (req, res)=> {
        //把数据存进去，前提要建个plugins文件夹来运行数据库
        //创建数据，用category.create方法创建数据，数据来源是req.body客户端提交的数据
       const model = await req.Model.create(req.body);
       //发回客户端，让客户端知道完成了
       res.send(model);
    });



    //接收id和内容(分类名称)接口
    router.put('/:id', async (req, res)=> {
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
        res.send(model);
    });

    //删除接口
    router.delete('/:id', async (req, res)=> {
        await req.Model.findByIdAndDelete(req.params.id,req.body);
        res.send({
            success:true
        });
    });

    //分类列表接口，limit限制10条
    router.get('/', async (req, res)=> {

        const queryOptions = {};
        if (req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        //find查找分类列表数据，并且limit为限制10条
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        //发回客户端完成操作
        res.send(items);
    });


    //获取某个详情页接口，就是某个id页的edit编辑页面
    router.get('/:id', async (req, res)=> {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });



    //分类接口定义完成，就是/admin/api/categories
    //当后面加了/rest/:resource，上面接口的categories省略
    app.use('/admin/api/rest/:resource', async (req, res, next) =>{
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next()
    },router);


    const multer = require('multer');
    const upload = multer({dest: __dirname + '/../../uploads'});
    app.post('/admin/api/upload', upload.single('file'), async (req,res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);

    })
};
