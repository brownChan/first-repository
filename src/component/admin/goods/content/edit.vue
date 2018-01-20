<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:750px">
    <!-- 标题 -->
  <el-form-item label="标题" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>

  <!-- 副标题 -->
  <el-form-item label="副标题" prop="sub_title">
    <el-input v-model="ruleForm.sub_title"></el-input>
  </el-form-item>

  <!-- 所属类别 -->
  <el-form-item label="所属类别" prop="category_id">
    <!-- v-model绑定数据，将来要和每个option的value值进行匹配，匹配到哪个默认就会选中哪个 -->
    <el-select v-model="ruleForm.category_id" placeholder="请选择分类">
      <!-- goodsCategory是请求接口获取到的分类列表，将来用户要选择其中一个分类的ID传给后端 -->
      <el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id">
        <!-- option标签内可以嵌套子标签，但是option的label属性不能删掉 -->
        <span>
          <span v-if="item.class_layer != 1">|- </span>
          <span>{{ item.title }}</span>
        </span>
      </el-option>
    </el-select>
  </el-form-item>

  <!-- 是否发布 -->
  <el-form-item label="是否发布">
    <el-switch v-model="ruleForm.status"></el-switch>
  </el-form-item>

  <!-- 推荐类型 -->
  <el-form-item label="推荐类型">
    <el-switch v-model="ruleForm.is_slide" active-text="轮播图">
    </el-switch>
    <el-switch v-model="ruleForm.is_top" active-text="置顶">
    </el-switch>
    <el-switch v-model="ruleForm.is_hot" active-text="热门">
    </el-switch>
  </el-form-item>
    
  <!-- 上传封面 -->
  <el-form-item label="上传封面" prop="imgList">
    <!-- action属性用来设置图片上传地址，file-list属性用来关联图片列表 -->
    <!-- on-preview与on-remove用来添加回调函数的，注意他们是属性的方式添加 -->
    <el-upload class="upload-demo"
      action="http://localhost:8899/admin/article/uploadimg"
      :on-success = "imgUploaded" :on-remove = "imgRemove"
      :file-list="ruleForm.imgList" list-type="picture">
      <el-button size="small" type ="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-form-item>
  

  <!-- 上传文件 -->
  <el-form-item label="上传附件">
    <!-- action属性用来设置图片上传地址，file-list属性用来关联图片列表 -->
    <!-- on-preview与on-remove用来添加回调函数的，注意他们是属性的方式添加 -->

    <el-upload class="upload-demo"
      action="http://localhost:8899/admin/article/uploadfile"
      :on-success="fileUploaded" :on-remove = "fileRemove"
      :file-list="ruleForm.fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传txt/doc文件，且不超过500kb</div>
    </el-upload>
  </el-form-item>
  


  <!-- 货号 -->
  <el-form-item label="货号" prop="goods_no">
    <el-input type="text" v-model="ruleForm.goods_no"></el-input>
  </el-form-item>

  <!-- 库存 -->
  <el-form-item label="库存" prop="stock_quantity">
    <el-input type="text" v-model="ruleForm.stock_quantity"></el-input>
  </el-form-item>

  <!-- 市场价 -->
  <el-form-item label="市场价" prop="market_price">
    <el-input type="text" v-model="ruleForm.market_price"></el-input>
  </el-form-item>

  <!-- 销售价 -->
  <el-form-item label="销售价" prop="sell_price">
    <el-input type="text" v-model="ruleForm.sell_price"></el-input>
  </el-form-item>


  <!-- 摘要 -->
  <el-form-item label="摘要" prop="zhaiyao">
    <el-input type="text" v-model="ruleForm.zhaiyao"></el-input>
  </el-form-item>


  <!-- 详细内容 -->
  <el-form-item label="详细内容" prop="content">
    <quill-editor v-model="ruleForm.content"></quill-editor>
    <!-- <el-input type="textarea" v-html="ruleForm.content"></el-input> -->
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" v-if="this.$route.params.id?true:false">保存修改</el-button>
    <el-button type="primary" @click="addData('ruleForm')" v-if="this.$route.params.id?false:true">添加</el-button>
    <el-button>返回上一页</el-button>
  </el-form-item>
</el-form>
</template>

<script>
//导入富文本样式和组件
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    //用于校验封面图的函数
    function validateImg(rule, value, callback) {
      if (value === "" || value.length == 0) {
        callback(new Error("请上传一张封面图"));
      } else {
        callback();
      }
    }
    return {
      //当前编辑的商品id
      id: null,
      //分类列表数据
      goodsCategory: [],

      //表单数据
      ruleForm: {
        //添加这些是为了做默认处理，如果不做，将来哪一项没有进行传值或者改变的时候就会报错，发送就不会成功，而且老是报错
        
        "status":false,
        "is_slide":false,
        "is_top":false,
        "is_hot":false,
        "imgList":[],
        "fileList":[]
      },

      //表单校验规则
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 70, message: "长度在 5 到 70 个字符", trigger: "blur" }
        ],
        sub_title: [
          { required: true, message: "请输入副标题", trigger: "blur" },
          { min: 5, max: 70, message: "长度在 5 到 70 个字符", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
          { type: "number", required: true, message: "值必须为数字", trigger: "blur" }
        ],
        goods_no: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
        stock_quantity: [
          { required: true, message: "请输入商品库存", trigger: "blur" }
        ],
        market_price: [{ required: true, message: "请输入市场价格", trigger: "blur" }],
        sell_price: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        zhaiyao: [{ required: true, message: "请输入文章摘要", trigger: "blur" }],
        content: [{ required: true, message: "请输入描述信息", trigger: "blur" }],
        imgList: [{ validator: validateImg, trigger: "blur" }]
      }
    };
  },
  methods: {
    //获取商品数据
    getGoods() {
      this.$http.get(this.$api.gsDetail + this.id).then(res => {
        this.ruleForm = res.data.message;
        //默认是个string，给它转换成number类型，这样它就会自动和分类option的value进行匹配
        this.ruleForm.category_id = +this.ruleForm.category_id;
      });
    },
    //获取商品分类
    getGoodsCategory() {
      //http://157.122.54.189:9095/admin/category/getlist/goods
      //系统类别数据管理下的获取频道下的所有分类数据
      this.$http.get(this.$api.ctList + "goods").then(res => {
        this.goodsCategory = res.data.message;
      });
    },
    //上传图片成功的回调
    //注意：商品的封面后端接口只能设一个，不能多个，所以每次我们上传成功后把原有的封面覆盖掉
    imgUploaded(res, file, fileList) {
      // console.log(res,file,fileList);
      this.ruleForm.imgList = [res];
    },
    //上传附件成功的回调
    //注意：附件后端接口可以设多个，所以每次成功后我们在原来的基础上push新附件
    fileUploaded(res, file, fileList) {
      this.ruleForm.fileList.push(res);
    },

    //保存修改
    modifyData() {
      this.$http.post(this.$api.gsEdit + this.id, this.ruleForm).then(res => {
        if (res.data.status == 0) {
          this.$confirm("保存成功，将跳转到商品列表", "修改成功", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //跳转到商品列表
              this.$router.push({ name: "goodsCtList" });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消跳转"
              });
            });
        }
      });
    },
    //点击修改保存按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.modifyData();
        } else {
          this.$alert(res.data.message);
          return false;
        }
      });
    },

    //点击保存按钮
    addData(){
      this.$http.post(this.$api.gsAdd, this.ruleForm)
      .then(res=>{
        if(res.data.status === 0){
          console.log("里面");
          this.$alert("保存成功，即将跳转回首页",'温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({ name: "goodsCtList" });
          }
        })
        }
      })
    },

    //删除封面图
    //获取file.url信息
    //然后遍历this.ruleForm.imgList，从中删除掉与之相同的图片数据
    imgRemove(file, fileList) {
      // console.log(file);
      let removeUrl = file.url;
      this.ruleForm.imgList = this.ruleForm.imgList.filter(v => {
        // console.log(v);   v===file
        v.url != removeUrl;
      });
    },

    //删除文件附件
    fileRemove(file, fileList) {
      this.ruleForm.fileList = fileList;
    }
  },
  //组件初始化之后，先拿到url中的id,在请求接口获取商品数据进行回显
  created() {
    this.id = this.$route.params.id;
    // console.log(this.id);   88
    if(this.$route.params.id){
      this.getGoods();
    }
    this.getGoodsCategory();
  },

  //使用富文本组件
  components: {
    quillEditor
  }
};
</script>
  
<style scoped>

</style>