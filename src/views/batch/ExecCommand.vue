<template>
<div>
  <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
    <el-form-item label="类型" style="width: 40%">
      <el-radio-group v-model="sizeForm.type" size="medium">
        <el-radio border label="single" >单台服务器</el-radio>
        <el-radio border label="multi" >按组执行</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item v-if="sizeForm.type === 'single'" label="服务器地址" style="width: 40%">
      <el-input v-model="sizeForm.IP"></el-input>
    </el-form-item>

    <el-form-item v-else label="分组" style="width: 40%">
      <el-select v-model="sizeForm.group" filterable placeholder="选择分组"  @change="selectGroup">
        <el-option v-for="(item,i) in groupList" :key="i" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="执行命令" style="width: 40%">
      <el-input v-model="sizeForm.Command"></el-input>
    </el-form-item>

    <el-row v-if="ipList.length !== 0 &&  sizeForm.type === 'multi'">影响主机为:{{ ipList }}</el-row>

    <el-form-item size="large">
      <el-button type="primary" @click="execCommand">执行</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {ApiFileList,ApiGetGroup,ApiGetGroupIpList,ApiExecCommand} from "network/api"
import {  Message } from 'element-ui'
import util from "@/util";

export default {
  name: "ExecCommand",
  data() {
    return {
      sizeForm:{
        type:"single",
        IP:"",
        group:"",
        Command:"",
      },
      headers:{},
      ipList:[],
      fileList:[],
      groupList:[],
    }
  },
  methods:{
    execCommand(){
      let data = {}
      if (this.sizeForm.Command.length === 0) {
        Message({
          message: "没有输入命令",
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (this.sizeForm.type === "single") {
        if (this.sizeForm.IP.length === 0) {
          Message({
            message: "没有输入地址",
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
        data["ip"] = this.sizeForm.IP
        data["type"] = "single"
        data["command"] = this.sizeForm.Command
      }else if (this.sizeForm.type === "multi") {
        if (this.sizeForm.group.length === 0) {
          Message({
            message: "没有选择组",
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
        data["group"] = this.sizeForm.group
        data["type"] = "multi"
        data["command"] = this.sizeForm.Command
      }
      ApiExecCommand(data).catch(err => {
        console.log(err)
      })

    },
    selectGroup(groupName) {
      let data = {}
      data["group"] = groupName
      ApiGetGroupIpList(data).then(res => {
        this.ipList = res.data
      })
    },
    changeFileList(){
      ApiFileList().then(res => {
        this.fileList = res.data
      })
    }
  },
  mounted() {
    this.headers["token"] = util.GetLoginToken()
    ApiFileList().then(res => {
      this.fileList = res.data
    })
    ApiGetGroup().then(res => {
      this.groupList = res.data
    })
  }
}
</script>

<style scoped>

</style>
