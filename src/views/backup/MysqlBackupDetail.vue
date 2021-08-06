<template>
<div>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>备份情况</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/MysqlBackup/' }">Mysql备份情况</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form :label-position="labelPosition" label-width="200px" :model="formLabelAlign">
    <el-form-item label="数据库实例名">
      <el-input v-model="formLabelAlign.db_name" :readonly="true" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="数据库实例端口号">
      <el-input v-model="formLabelAlign.db_port" :readonly="true" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="异地备份服务器">
      <el-input v-model="formLabelAlign.remote_server" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item label="异地备份目录">
      <el-input v-model="formLabelAlign.remote_dir" maxlength="200" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="UpdateMysqlBackupBaseDetail" >更新</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {ApiGetMysqlBackupDetail,ApiUpdateMysqlBackupBaseDetail} from "network/api"
export default {
  name: "MysqlBackupDetail",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        "db_name": "",
        "db_port": "",
        "remote_server": "",
        "remote_dir": "",
      }
    }
  },
  methods:{
    back() {
      this.$router.push("/MysqlBackup/")
    },
    UpdateMysqlBackupBaseDetail() {
      let updateData = {
        "db_name" : this.formLabelAlign.db_name,
        "db_port": this.formLabelAlign.db_port,
        "remote_server": this.formLabelAlign.remote_server,
        "remote_dir":this.formLabelAlign.remote_dir
      }
      ApiUpdateMysqlBackupBaseDetail(this.$route.params.id,updateData).then(()=>{
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    ApiGetMysqlBackupDetail(this.$route.params.id).then(res => {
      this.formLabelAlign = res.data
    })
  }
}
</script>

<style scoped>

</style>
