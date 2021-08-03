<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资产信息</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/serverInfo/' }">服务器资产</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" >
      <el-form-item label="服务器地址" prop="ip">
        <el-input v-model="ruleForm.ip"></el-input>
      </el-form-item>
      <el-form-item label="服务器所在IDC" prop="idc">
        <el-input v-model="ruleForm.idc"></el-input>
<!--        <el-select v-model="ruleForm.idc" placeholder="请选择服务器IDC">-->
<!--          <el-option label="北京" value="北京"></el-option>-->
<!--          <el-option label="其他" value="其他"></el-option>-->
<!--        </el-select>-->
      </el-form-item>

      <el-form-item label="机柜号" prop="cabinet">
        <el-input v-model="ruleForm.cabinet"></el-input>
      </el-form-item>

      <el-form-item label="机柜U位" prop="u_position">
        <el-input v-model="ruleForm.u_position"></el-input>
      </el-form-item>

      <el-form-item label="服务器用途" prop="use">
        <el-select v-model="ruleForm.use" placeholder="服务器用途">
          <el-option label="直播" value="直播"></el-option>
          <el-option label="点播" value="点播"></el-option>
          <el-option label="应用" value="应用"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务器备注" prop="comment">
        <el-input type="textarea" v-model="ruleForm.comment"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</div>
</template>
<script>
import {ApiAddServer} from "network/api"
export default {
  name: "AddServer",
  data() {
    return {
      ruleForm: {
        ip: "",
        idc: "",
        comment: "",
        use:"",
        u_position:"",
      },
      rules: {
        idc: [
          { required: true, message: '请选择服务器IDC', trigger: 'change' }
        ],
        ip: [
          { required: true, message: '请输入服务器地址', trigger: 'change' }
        ]
      },
      breadcrumbList : ["资产信息","服务器资产"]
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ApiAddServer(this.ruleForm).then(()=>{
              this.$router.push("/serverInfo/")
            })
          } else {
            return false;
          }
        });
      },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>
<style scoped>
.demo-ruleForm {
  width:500px;
  text-align:left;
  margin: 50px;
}
.breadcrumb {
  height: 50px;
}
</style>
