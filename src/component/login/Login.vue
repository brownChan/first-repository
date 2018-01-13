<template>
  <div id="login">
    <h1>后台管理系统</h1>
    <!-- model用来关联表单数据，rules用来指定校验规则 -->
    <el-form label-position="labelPosition" label-width="80px"       :model="formLabelAlign" class="inp" :rules="rules">
      <!-- 如果要表单校验与重置功能，必须加上prop属性 -->
      <el-form-item label="用户账号" prop="uname">
        <el-input v-model="formLabelAlign.uname"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="upwd">
        <el-input v-model="formLabelAlign.upwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
  export default {
    data() {
      //检验账号，将来配置到下面的validator配置项
      var validateUname = (rule,value,callback)=>{
        if(value === ""){
          callback(new Error("账号不能为空"));
        }else{
          callback();
        }
      }
      //校验密码，将来配置到下面的validator配置项
      var validatePass = (rule,value,callback)=>{
        if(value === ""){
          callback(new Error("密码不能为空"));
        }else{
          callback();
        }
      }
      return {
        //表单提交的数据
        formLabelAlign: {
          uname: '',
          upwd: ''
        },
        //表单验证规则
        rules:{
          uname:[
            {validator: validateUname, trigger:"blur"}
          ],
          upwd:[
            {validator: validatePass, trigger:"blur"}
          ]
        }
      }
    },
    methods: {
      //登陆
      login () {
        this.$http.post(this.$api.login,this.formLabelAlign)
        .then(res=>{
          console.log(123);
        })
      },
      submitForm(){
        
      }
    }
  }

</script>
  
<style scoped>
  #login{
    width: 400px;
    height: 200px;
    border:1px solid #fff;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform:translateY(-50%);
    background-color: #000;
    border-radius:10px;
    padding-bottom:20px;
    font-weight: 700;
  }
  .inp{
    margin-top:30px;
    padding-right:20px;
  }
  h1{
    text-align: center;
    color: #000;
    position: absolute;
    top:-100px;
    left:50%;
    transform: translateX(-50%);
    font-family: 华文彩云;
  }
</style>