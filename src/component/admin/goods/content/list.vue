<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">知识内容</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button size="mini" plain icon="el-icon-plus">增加</el-button>
        <el-button size="mini" plain icon="el-icon-check" @click="delAll">
          全选
        </el-button>
        <el-button size="mini" plain icon="el-icon-delete" @click="delData">
          删除
        </el-button>
        <el-input style="width:200px; float:right;" size="small" placeholder="请输入内容" suffix-icon ="el-icon-search" v-model="gsListQuery.searchvalue"  @keydown.native.enter="getGoodsList" >
        </el-input>
      </div>
      <!-- 表格 -->
      <!-- el-table组件必须设置data属性，传入一个数组，然后表格会自动遍历这个数组进行渲染 -->
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark"
      style="width: 100%" @selection-change="selectionChange">
        <!-- 多选框 -->
        <!-- type用来指定当前列的类型，不指定的就是普通文本类型，这里指定为selection含义是多选框类型 -->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 标题 -->
        <!-- 没有type类型就是普通类型，普通类型可以通过label设置表头 -->
        <!-- 普通类型还通过内嵌template标签，书写当前列展示的数据 -->
        <el-table-column label="标题">
          <!-- scope.row是固定写法，title是活的，展示什么字段，就写什么 -->
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" placement="right">
              <!-- totip的提示信息，这个标签必须加一个slot属性 -->
              <div slot="content">
                <img style="width:200px;" :src="scope.row.imgurl" alt="商品预览">
              </div>
              <!-- 被提示的原标签 -->
              <router-link :to="{name:'goodsCtEdit',params:{id: scope.row.id}}">
                {{scope.row.title}}
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- 所属类别 -->
        <!-- 没有type类型就是普通类型，普通类型可以通过label设置表头 -->
        <!-- 普通类型还通过内嵌template标签，书写当前列展示的数据 -->
        <el-table-column prop="categoryname" label="所属类别" width="120">
        </el-table-column>
        <!-- 库存 -->
        <el-table-column prop="stock_quantity" label="库存" width="120">
        </el-table-column>
        <!-- 市场价 -->
        <el-table-column prop="market_price" label="市场价" width="120">
        </el-table-column>
        <!-- 销售价 -->
        <el-table-column prop="sell_price" label="销售价" width="120">
        </el-table-column>
        <!-- 状态 -->
        <!-- 显示的数据是三个icon图标，只能用template包裹实现 -->
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <!-- 字体图标，默认为浅灰色，如果添加active类，那么就是亮黑色 -->
            <!-- class可以写活，值可以为一个数组，里面可以加表达式运算 -->
            <!-- 监听点击事件，需要把当前商品的id，修改的字段，以及该字段新的状态(布尔值)传过去 -->
            <i :class="['el-icon-picture', scope.row.is_slide== 1?'active':'']" @click="modifyStatus(scope.row.id, 'is_slide', scope.row.is_slide == 1? false : true)">
            </i>
            <i :class="['el-icon-upload', scope.row.is_top == 1?'active':'']" @click="modifyStatus(scope.row.id, 'is_top', scope.row.is_top == 1? false : true)">
            </i>
            <i :class="['el-icon-star-on', scope.row.is_hot == 1?'active':'']" @click="modifyStatus(scope.row.id, 'is_hot', scope.row.is_hot == 1? false : true)">
            </i>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <!-- 显示的数据是死的，固定为“修改”，用template包裹实现，同时需要包裹router-link标签，为了实现点击跳转 -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <router-link :to="{name:'goodsCtEdit', params:{id: scope.row.id}}">
              修改
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <!-- @size-change用来监听每页数量变化时的事件 -->
      <!-- @current-change用来监听页码变化时的事件 -->
      <!-- current-page用来指定当前页，page-sizes用来指定每页数量的下拉菜单 -->
      <!-- page-size用来指定当前每页的数量，total用来指定总数量 -->
      <el-pagination @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="gsListQuery.pageIndex"
        :page-sizes="page.pageSizes"
        :page-size="gsListQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      tableData3: [
        {
          id: 103,
          title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
          is_top: 1,
          is_hot: 1,
          is_slide: 1,
          categoryname: "男装",
          img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          imgurl:
            "http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          goods_no: "NZ0000000002",
          stock_quantity: 200,
          market_price: 1000,
          sell_price: 800
        },
        {
          id: 103,
          title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
          is_top: 1,
          is_hot: 1,
          is_slide: 1,
          categoryname: "男装",
          img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          imgurl:
            "http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          goods_no: "NZ0000000002",
          stock_quantity: 200,
          market_price: 1000,
          sell_price: 800
        },
        {
          id: 103,
          title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
          is_top: 1,
          is_hot: 1,
          is_slide: 1,
          categoryname: "男装",
          img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          imgurl:
            "http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
          goods_no: "NZ0000000002",
          stock_quantity: 200,
          market_price: 1000,
          sell_price: 800
        }
      ],
      //请求接口所需的查询字符串
      gsListQuery: {
        pageIndex: 1,
        pageSize: 10,
        searchvalue: ""
      },
      //分页相关数据
      page: {
        pageSize:[10,20,30,40],
        total: 100
      }
    };
  },
      methods: {
        //获取商品列表数据
        getGoodsList() {
          //get方法的第二个参数是一个配置对象，该对象里面可以设置headers请求头，还可以设置params查询字符串
          this.$http.get(this.$api.gsList, { params: this.gsListQuery })
            .then(res => {
              // console.log(res);
              this.tableData3 = res.data.message;
              //接口还会返回如下三个数据，将来分页的时候要用
              this.page.total = res.data.totalcount;
              //res.data.totalcount 数据总的条数
              //res. data.pageIndex
              //res.data.pageSize
            });
        },
        //修改商品状态
        modifyStatus (id, type, newStatus){
          //post方法的第二个参数是要提交的数据，第三个参数是一个配置对象
          //注意：下面的数据使用的是es6语法，含义：{[引用变量]:引用变量}
          // this.$http.post(this.$api.gsEdit + id, {[type]:newStatus})
          // .then(res=>{
          //   this.$alert(res.data.message);
          // })

          //由于没有专门的接口来处理所以，
          //1.先要找出修改的商品
          //2.然后修改它的对应的字段
          //3.newStatus为true，设为1，false设为0
          this.tableData3.filter(goods=>goods.id == id)[0][type] = newStatus? 1:0;
          // console.log(this.tableData3.filter(goods=>goods.id == id));//是一个只有一项的数组，这一项是个对象
        },
        //每页数量变化时，拿到新值，然后重新请求接口渲染列表
        sizeChange(pageSize){
          this.gsListQuery.pageSize = pageSize;
          //重新获取数据
          this.getGoodsList();
        },
        currentChange(pageIndex){
          this.gsListQuery.pageIndex = pageIndex;
          //重新获取数据
          this.getGoodsList();
        },
        //删除
        //从selection数据中提取所有的id,组成ids字符串
        //然后调用接口删除，删除成功后在请求新的列表数据进行渲染
        //删除成功后，清空被选的数据
        del() {
          let ids = this.selection.map(v=>v.id).join(",");
          // console.log(ids);  //1,2,3,4...
          this.$http.get(this.$api.gsDel + ids)
          .then(res=>{
            if(res.data.status === 0){
              //重新进行刷新数据
              this.getGoodsList();
              //同时把得到的id清空
              this.selection = [];

              //同时系统提示刷新成功
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

            }else{
              this.$alert(res.data.message);
            }
          })
        },
        //获取到每个选中的按钮的状态，里面的参数都是当前项的所有数据
        selectionChange(selection){
          // console.log(selection); 
          this.selection = selection;
        },
        delData(){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.del();

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
        });
        },
        //全选按钮删除
        delAll(){
          //真正意义上是得到checkbox的全选，然后再手动调用它的click方法来让它全选
          var checkAll = document.querySelector(".el-checkbox__original");
          // console.log(checkAll);
          checkAll.click();
        }
      },
    //组件初始化完毕以后，立马调用接口进行渲染
    created() {
      this.getGoodsList();
    }
};
</script>
  
<style scoped lang="less">
    div .el-button {
      margin-top: 10px;
      margin-left: 0;
    }
    // 属性选择器，给class前缀为el-icon的标签设置颜色
    [class^=el-icon]{
      color: rgba(0,0,0,.3);
      &.active{
        color: #000;
      }
    }
    a{
      text-decoration: none;
      color: #115599
    }
</style>