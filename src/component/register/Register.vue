<template>

<div>

  <div class="block">
  <span class="demonstration">默认不区分颜色</span>
  <el-rate v-model="value1"></el-rate>
  </div>

  <div class="block">
    <span class="demonstration">区分颜色</span>
    <el-rate
      v-model="value2"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </div>

  <el-rate
    v-model="value3"
    show-text>
  </el-rate>

  <el-rate
    v-model="value4"
    :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
    void-icon-class="icon-rate-face-off"
    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
  </el-rate>

</div>

    <!-- 注册页面
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open">消息</el-button>
    <el-button :plain="true" @click="open4">错误</el-button> -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      value4: null
    };
  },
  methods: {
    open() {
      this.$message("这是一条消息提示");
    },
    open2() {
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },

    open3() {
      this.$message({
        message: "警告哦，这是一条警告消息",
        type: "warning"
      });
    },

    open4() {
      this.$message.error("错了哦，这是一条错误消息");
    }
  }
};
</script>

<style>

</style>