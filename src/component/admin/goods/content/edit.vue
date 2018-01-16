<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:500px">
    <!-- 标题 -->
  <el-form-item label="标题" prop="name">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>

  <!-- 副标题 -->
  <el-form-item label="副标题" prop="fname">
    <el-input v-model="ruleForm.sub_title"></el-input>
  </el-form-item>

  <!-- 所属类别 -->
  <el-form-item label="所属类别" prop="region">
    <!-- v-model绑定数据，将来要和每个option的value值进行匹配，匹配到哪个默认就会选中哪个 -->
    <el-select v-model="ruleForm.category_id" placeholder="请选择分类">
      <!-- goodsCategory是请求接口获取到的分类列表，将来用户要选择其中一个分类的ID传给后端 -->
      <el-option v-for="item in goodsCategory" :key="item.category_id" :label="item.title" :value="item.category_id"></el-option>
    </el-select>
  </el-form-item>

  <!-- 是否发布 -->
  <el-form-item label="是否发布" prop="delivery">
    <el-switch v-model="ruleForm.status"></el-switch>
  </el-form-item>

  <!-- 推荐类型 -->
  <el-form-item label="推荐类型" prop="delivery">
    <el-switch v-model="ruleForm.is_slide" active-text="轮播图">
    </el-switch>
    <el-switch v-model="ruleForm.is_top" active-text="置顶">
    </el-switch>
    <el-switch v-model="ruleForm.is_hot" active-text="热门">
    </el-switch>
  </el-form-item>
    
  <!-- 上传封面 -->
  <el-form-item label="上传封面" prop="delivery">
    <el-switch v-model="ruleForm.imgList">
    </el-switch>
    <!-- <el-upload class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview = "handlePreview"
    :on-remove ="handleRemove"
    :file-list="fileList2"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
  </el-form-item>
  

  <!-- 上传文件 -->
  <el-form-item label="上传附件" prop="delivery">
    <el-switch v-model="ruleForm.fileList">
    </el-switch>
    <!-- <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :file-list="fileList3">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传txt/doc文件，且不超过500kb</div>
    </el-upload> -->
  </el-form-item>
  


  <!-- 货号 -->
  <el-form-item label="货号" prop="desc">
    <el-input type="text" v-model="ruleForm.goods_no"></el-input>
  </el-form-item>

  <!-- 库存 -->
  <el-form-item label="库存" prop="desc">
    <el-input type="text" v-model="ruleForm.stock_quantity"></el-input>
  </el-form-item>

  <!-- 市场价 -->
  <el-form-item label="市场价" prop="desc">
    <el-input type="text" v-model="ruleForm.market_price"></el-input>
  </el-form-item>

  <!-- 销售价 -->
  <el-form-item label="销售价" prop="desc">
    <el-input type="text" v-model="ruleForm.sell_price"></el-input>
  </el-form-item>


  <!-- 摘要 -->
  <el-form-item label="摘要" prop="desc">
    <el-input type="text" v-model="ruleForm.zhaiyao"></el-input>
  </el-form-item>


  <!-- 详细内容 -->
  <el-form-item label="详细内容" prop="desc">
    <el-input type="textarea" v-model="ruleForm.content"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
    <el-button>返回上一页</el-button>
  </el-form-item>
</el-form>
</template>
  
<script>
  export default {
    data() {
      return {
        //当前编辑的商品id
        id: null,
        //分类列表数据
        goodsCategory: [],
        //上传图片
      fileList2: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

        //表单数据
        ruleForm: {},

        //表单校验规则
        rules: {
          name: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          fname: [
            { required: true, message: '请输入副标题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 上传图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      //保存修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //获取商品数据
      getGoods () {
        this.$http.get(this.$api.gsDetail + this.id)
        .then(res=>{
            this.ruleForm = res.data.message;
            //默认是个string，给它转换成number类型，这样它就会自动和分类option的value进行匹配
            this.ruleForm.category_id = +this.ruleForm.category_id;    
        });
      },
      //获取商品分类
      getGoodsCategory () {
        //http://157.122.54.189:9095/admin/category/getlist/goods
        //系统类别数据管理下的获取频道下的所有分类数据
        this.$http.get(this.$api.ctList + "goods")
        .then(res =>{
          this.goodsCategory = res.data.message;
        })
      }
    },
    //组件初始化之后，先拿到url中的id,在请求接口获取商品数据进行回显
    created () {
      this.id = this.$route.params.id;
      // console.log(this.id);   88
      this.getGoods();
      this.getGoodsCategory();
    }
  }
</script>
  
<style scoped>
  
</style>