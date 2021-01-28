<template>
    <div>
        <!--        三位运算符，如果是id就显示编辑，否则为新建-->
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label="名称">
                <el-input v-model="model.name">
                </el-input>
            </el-form-item>

            <el-form-item label="图标">
                <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="afterUpload"
                        >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props:{
            //接收list页面的id
            id:{}
        },


        data(){
            return{
                model:{},
                //数组[]  对象{}
            };
        },
        methods:{
            afterUpload(res){
                this.$set(this.model, 'icon', res.url);
                // this.model.icon = res.url;
            },
            async save(){
                let res;
                //如果有id怎么做，然后怎么做
                if(this.id){
                    //发起请求提交到items接口传递参数
                    //修改,编辑
                    res = await this.$http.put(`rest/items/${this.id}`, this.model);

                }else{

                    //新建
                    res = await this.$http.post('rest/items', this.model);
                }
                //创建完后直接跳转到分类列表
                this.$router.push('/items/list');

                this.$message({
                    //创建完后提示保存成功
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                //请求接口，获取id放回该id编辑页面
                const res = await this.$http.get(`rest/items/${this.id}`);
                this.model = res.data;

            },

        },

        created() {
            //如果是这个id才会执行fetch函数
            this.id && this.fetch();

        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 5rem;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
    }
    .avatar {
        width: 5rem;
        height: 5rem;
        display: block;
    }
</style>
