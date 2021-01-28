<template>
    <div>
<!--        三位运算符，如果是id就显示编辑，否则为新建-->
        <h1>{{id ? '编辑' : '新建'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <el-option
                            v-for="item in parents"
                            :label="item.name"
                            :value="item._id"
                            :key="item._id"
                    >

                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name">
                </el-input>
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
                //上级分类
                parents:[],
            }
        },
        methods:{
           async save(){
               let res;
               //如果有id怎么做，然后怎么做
               if(this.id){
                   //发起请求提交到categories接口传递参数
                   //修改,编辑
                   res = await this.$http.put(`rest/categories/${this.id}`, this.model);

               }else{

                   //新建
                   res = await this.$http.post('rest/categories', this.model);
               }
               //创建完后直接跳转到分类列表
               this.$router.push('/categories/list');

               this.$message({
                   //创建完后提示保存成功
                   type:'success',
                   message:'保存成功'
               })
            },
            async fetch(){
               //请求接口，获取id放回该id编辑页面
                const res = await this.$http.get(`rest/categories/${this.id}`);
                this.model = res.data;

            },
            async fetchParents(){
               const res = await this.$http.get(`rest/categories`);
                this.parents = res.data;
            }
        },

        created() {
            //如果是这个id才会执行fetch函数
            this.id && this.fetch();
            this.fetchParents();
        }
    }
</script>

<style scoped>

</style>
