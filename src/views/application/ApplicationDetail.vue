<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用相关</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/AppDetail/' }">应用信息</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form :label-position="labelPosition" label-width="200px" :model="formLabelAlign">
    <el-form-item label="应用程序名">
      <el-input v-model="formLabelAlign.app_name" :readonly="true" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="服务器地址">
      <el-input v-model="formLabelAlign.host" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="部署目录">
      <el-input v-model="formLabelAlign.dir" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="应用类型">
      <el-input v-model="formLabelAlign.type" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="UpdateMysqlBackupBaseDetail" >更新</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {ApiGetAppDetail,ApiUpdateAppDetail} from "network/api"
export default {
  name: "ApplicationDetail",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        "app_name": "",
        "host": "",
        "dir": "",
        "type": "",
      }
    }
  },
  methods:{
    back() {
      this.$router.push("/AppDetail/")
    },
    UpdateMysqlBackupBaseDetail() {
      let updateData = {
        "app_name" : this.formLabelAlign.app_name,
        "host": this.formLabelAlign.host,
        "dir": this.formLabelAlign.dir,
        "type": this.formLabelAlign.type,
      }
      ApiUpdateAppDetail(this.$route.params.id,updateData).then(()=> {
        this.$router.go(-1)
      })
    }
  },
  mounted() {
    ApiGetAppDetail(this.$route.params.id).then(res => {
      this.formLabelAlign = res.data
    })
  }
}
</script>

<style scoped>

</style>
