<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <!-- 一个菜单栏，记得配置index属性，不配置就会有问题 -->
      <el-submenu v-for="item in menu" :key="item.title" :index="item.title">

        <!-- 标题内容 -->
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        
        <!-- 子菜单列表 -->
          <el-menu-item v-for="subitem in item.children" :key="subitem.title" :index="subitem.title">
            <router-link :to="subitem.path">{{subitem.title}}</router-link>
          </el-menu-item>
      </el-submenu>
    </el-menu>
</template>
  
<script>
  export default {
    data(){
      return {
        //菜单很多项,所以是个大数组
        //数组里面存放的数据很多，所以是一个对象
        // 对象里面有个title字段
        // 对象里面有个children字段存放的子菜单，是个数组
        // children字段里面又放置了很多对象
        // 有个title字段代表子菜单标题
        // 有个path字段代表点击该标题时跳转的路径
        menu:[
          {title:"资源下载",icon:"el-icon-download",
            children:[
              {title:"内容管理",path:"/a"},
              {title:"类别管理",path:"/b"},
              {title:"评论管理",path:"/c"},
            ]
          },
          {title:"购物商城",icon:"el-icon-goods",
            children:[
              {title:"内容管理",path:"/a"},
              {title:"类别管理",path:"/b"},
              {title:"评论管理",path:"/c"},
            ]
          },
          {title:"订单管理",icon:"el-icon-tickets",
            children:[
              {title:"内容管理",path:"/a"},
              {title:"类别管理",path:"/b"},
              {title:"评论管理",path:"/c"},
            ]
          }
        ]
      }
    },
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
  
<style scoped>
  a{
    color: #fff;
    text-decoration: none;
  }
</style>