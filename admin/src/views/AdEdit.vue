<template>
    <div>
        <!--        三位运算符，如果是id就显示编辑，否则为新建-->
        <h1>{{id ? '编辑' : '新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label="名称">
                <el-input v-model="model.name">
                </el-input>
            </el-form-item>


            <el-form-item label="广告">

                <el-button size="small"  @click="model.items.push({})"> <i class="el-icon-plus"> </i>添加广告</el-button>
                <!--                    row横向排版，flex-wrap换行，col定义一列，md电脑屏幕上宽度为12（一行2个框），-->
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col :md="24" v-for="(item, i) in model.items" :key="i">
                        <el-form-item  label="跳转链接（URL）">
                            <el-input v-model="item.url">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="图片" style="margin-top: 0.5rem;">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'image',  res.url)"
                            >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>



                        <el-form-item>
                            <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                model:{
                    items:[]
                },
                //数组[]  对象{}

            }
        },
        methods:{
            async save(){
                let res;
                //如果有id怎么做，然后怎么做
                if(this.id){
                    //发起请求提交到ads接口传递参数
                    //修改,编辑
                    res = await this.$http.put(`rest/ads/${this.id}`, this.model);

                }else{

                    //新建
                    res = await this.$http.post('rest/ads', this.model);
                }
                //创建完后直接跳转到分类列表
                this.$router.push('/ads/list');

                this.$message({
                    //创建完后提示保存成功
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                //请求接口，获取id放回该id编辑页面
                const res = await this.$http.get(`rest/ads/${this.id}`);
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


</style>
