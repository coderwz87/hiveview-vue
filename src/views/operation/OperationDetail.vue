<template>
<div>
  <el-form ref="form" :model="form" label-width="200px" class="formClass">
    <el-form-item label="发起人">
      <el-input v-model="form.user" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="应用名">
      <el-input v-model="form.app_name" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="操作类型">
      <el-input v-model="form.action" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="操作服务器">
      <el-input v-model="form.host" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="发起时间">
      <el-input v-model="form.CreatedAt" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item v-if="form.state === '确认中' ">
      <el-button  type="primary" @click="pass" >确认</el-button>
      <el-button @click="deny">拒绝</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {ApiOperationDetail,ApiOperationApprove} from "network/api"
export default {
  name: "OperationDetail",
  data(){
    return {
      form:{
        user:"",
        action: "",
        host: "",
        app_name:"",
        CreatedAt:"",
        state:"",
      }
    }
  },
  mounted() {
    ApiOperationDetail(this.$route.params.id).then( res => {
        this.form = res.data
      console.log(this.form)
    })
  },
  methods:{
    pass(){
      let data = {}
      data["id"] = this.$route.params.id
      data["action"] = "pass"
      ApiOperationApprove(data).catch(err => {
        console.log(err)
      })
    },
    deny(){
      let data = {}
      data["id"] = this.$route.params.id
      data["action"] = "deny"
      ApiOperationApprove(data).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
