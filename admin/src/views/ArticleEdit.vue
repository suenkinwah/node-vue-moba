<template>
    <div>
<!--        三位运算符，如果是id就显示编辑，否则为新建-->
        <h1>{{id ? '编辑' : '新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option
                            v-for="item in categories"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"
                    >

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="标题">
                <el-input v-model="model.title">
                </el-input>
            </el-form-item>

            <el-form-item label="详情">
               <vue-editor
                       useCustomImageHandler
                       @image-added="handleImageAdded"
                       v-model="model.body">

               </vue-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    export default {
        props:{
            //接收list页面的id
            id:{}
        },

        components:{
          VueEditor
        },


        data(){
            return{
                model:{},
                //数组[]  对象{}
                categories:[],
            }
        },
        methods:{
           async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

                const formData = new FormData();
                formData.append("file", file);

                const res = await this.$http.post('upload', formData);
               Editor.insertEmbed(cursorLocation, "image", res.data.url);
               resetUploader();
            },
           async save(){
               let res;
               //如果有id怎么做，然后怎么做
               if(this.id){
                   //发起请求提交到articles接口传递参数
                   //修改,编辑
                   res = await this.$http.put(`rest/articles/${this.id}`, this.model);

               }else{

                   //新建
                   res = await this.$http.post('rest/articles', this.model);
               }
               //创建完后直接跳转到分类列表
               this.$router.push('/articles/list');

               this.$message({
                   //创建完后提示保存成功
                   type:'success',
                   message:'保存成功'
               })
            },
            async fetch(){
               //请求接口，获取id放回该id编辑页面
                const res = await this.$http.get(`rest/articles/${this.id}`);
                this.model = res.data;

            },
            async fetchCategories(){
               const res = await this.$http.get(`rest/categories`);
                this.categories = res.data;
            }
        },

        created() {
            //如果是这个id才会执行fetch函数
            this.id && this.fetch();
            this.fetchCategories();
        }
    }
</script>

<style scoped>

</style>
