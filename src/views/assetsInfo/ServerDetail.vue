<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/serverinfo' }">服务器资产</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :label-position="labelPosition" label-width="200px" :model="formLabelAlign">
      <span>服务器基础信息</span>
      <el-form-item label="服务器地址">
        <el-input v-model="formLabelAlign.ip" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器主机名">
        <el-input v-model="formLabelAlign.hostname" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器序列号">
        <el-input v-model="formLabelAlign.sn" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器类型">
        <el-input v-model="formLabelAlign.server_type" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器系统版本">
        <el-input v-model="formLabelAlign.os_version" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <span>服务器硬件信息</span>
      <el-form-item label="服务器制造商">
        <el-input v-model="formLabelAlign.vendor" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器型号">
        <el-input v-model="formLabelAlign.sever_model" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器CPU型号">
        <el-input v-model="formLabelAlign.cpu_model" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器核心数">
        <el-input v-model="formLabelAlign.cpu_count" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器内存大小">
        <el-input v-model="formLabelAlign.mem" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器网卡速度">
        <el-input v-model="formLabelAlign.interface_speed" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器磁盘空间">
        <el-input v-model="formLabelAlign.disk_total" :readonly="true" maxlength="200" ></el-input>
      </el-form-item>

      <span>服务器其他信息</span>
      <el-form-item label="服务器所在IDC" prop="idc">
        <el-input v-model="formLabelAlign.idc"  maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器所在机柜">
        <el-input v-model="formLabelAlign.cabinet"  maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器所在U位">
        <el-input v-model="formLabelAlign.uposition"  maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item label="服务器用途">
        <el-select v-model="formLabelAlign.use" placeholder="请选择服务器用途" width="auto">
          <el-option label="直播" value="直播"></el-option>
          <el-option label="点播" value="点播"></el-option>
          <el-option label="应用" value="应用"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务器备注">
        <el-input type="textarea" v-model="formLabelAlign.comment"  maxlength="200" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="UpdataServer" >更新</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ApiGetDetail,ApiUpdateServer} from 'network/api'
import {Message} from "element-ui";
export default {
  name: "ServerDetail",
  data() {
    return {
      labelPosition:"right",
      formLabelAlign: {
        ip:"",
        sn:"",
        mem:"",
        vendor:"",
        sever_model:"",
        cpu_count:"",
        os_version:"",
        hostname:"",
        cpu_model:"",
        disk_total:"",
        idc:"",
        cabinet:"",
        uposition:"",
        comment:"",
        server_type:"",
        interface_speed:"",
      }
    }
  },
  methods:{
    back() {
      this.$router.push("/serverInfo/")
    },
    UpdataServer(){
      let updateData = {
        idc:this.formLabelAlign.idc,
        cabinet:this.formLabelAlign.cabinet,
        u_position:this.formLabelAlign.uposition,
        use:this.formLabelAlign.use,
        comment:this.formLabelAlign.comment,
      }
      ApiUpdateServer(this.$route.params.id,updateData).then(() => {
          this.$router.go(-1)
      })

    }
  },
  mounted() {
    ApiGetDetail(this.$route.params.id).then(res =>{
      this.formLabelAlign = res.data
    })
  }
}
</script>

<style scoped>


</style>
