<template>
  <el-dropdown trigger="click" class="header">
      <span class="el-dropdown-link">
        <span>你好，{{uname}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改信息</el-dropdown-item>
        <!-- 注意：默认情况下，监听组件的事件都是监听自己emit发射的事件  -->
        <!-- 如果要监听浏览器原生事件，就需要添加个native修饰符即可 -->
        <el-dropdown-item @click.native ="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>
  
<script>
  export default {
    data () {
      return {
        uname:"admin"
      }
    },
    methods: {
      logout () {
        this.$confirm('正在退出, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.$api.logout)
          .then(res=>{
              this.$router.push({name:"login"});
          })
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消退出'
          });          
        });
      }
    }
  }
</script>
  
<style scoped>
  .el-dropdown-link{
    cursor: pointer;
    color: rgba(255, 255, 255, 0.753);
  }
  .header{
    display: block;
    text-align: right;
    line-height: 60px;
  }
</style>