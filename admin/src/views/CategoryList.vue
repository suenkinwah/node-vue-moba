<template>
    <div>
        <h1>分类列表</h1>
<!--        //items为表格数据-->
        <el-table :data="items">
<!--            //prop为字段-->
            <el-table-column prop="_id" label="ID" width="230">
            </el-table-column>
            <el-table-column prop="name" label="分类名称">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">

<!--                    $router.push为点击后跳转到edit页面，${id}为跳转当前点击的id地址，scope为当前，row为这一行-->
                    <el-button type="primary" size="small"
                    @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>

<!--                    remove移除，scope.row整个一行删除-->
                    <el-button type="primary" size="small"
                               @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //items为空值
                items:[]
            }
        },
        methods:{
          async fetch(){
              //找到接口
              const res = await this.$http.get("categories");
              //得到数据后items为res.data
              this.items = res.data;
          },
            async remove(row){
                this.$confirm(`是否确定要删除分类"${row.name}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                    const res = await this.$http.delete(`categories/${row._id}`);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //执行重新获取数据，就是刷新一下，把删除的数据去掉
                    this.fetch();
                })
            }
        },
        //默认组件进来要进行的事情，首先获取数据
        created() {

            //创建后自动执行fetch函数
            this.fetch();
        }
    }
</script>

<style scoped>

</style>
