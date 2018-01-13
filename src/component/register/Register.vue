<template>
  <div>
    注册页面
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button>
    <el-rate
      v-model="value4"
      :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
      void-icon-class="icon-rate-face-off"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value4: 4
      }
    },
    methods: {
      open() {
        this.$message('这是一条消息提示');
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3() {
        this.$message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
      },

      open4() {
        this.$message.error('错了哦，这是一条错误消息');
      }
    }
  
  }
</script>

<style scoped>
  
</style>