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

    <el-form-item label="推送文件" style="width: 80%">
      <el-select v-model="sizeForm.filename" placeholder="选择文件" style="float:left;">
        <el-option  v-for="(item,i) in fileList" :key="i" :label="item" :value="item"></el-option>
      </el-select>
      <el-upload style="float:left;" :on-success="changeFileList" class="upload-demo" name="filename" :headers="headers" action="http://124.205.11.228:9080/api/batch/uploadFile/" >
        <el-button size="small" round plain  type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item label="目标路径" style="width: 40%">
      <el-input v-model="sizeForm.targetDir"></el-input>
    </el-form-item>

    <el-row v-if="ipList.length !== 0 &&  sizeForm.type === 'multi'">影响主机为:{{ ipList }}</el-row>

    <el-form-item size="large">
      <el-button type="primary" @click="pushFile">推送</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {ApiFileList,ApiGetGroup,ApiGetGroupIpList,ApiPushFile} from "network/api"
import {  Message } from 'element-ui'
import util from "@/util";

export default {
  name: "PushFile",
  data() {
    return {
      sizeForm:{
        type:"single",
        IP:"",
        group:"",
        filename:"",
        targetDir:"",
      },
      headers:{},
      ipList:[],
      fileList:[],
      groupList:[],
    }
  },
  methods:{
    pushFile(){
      let data = {}
      if (this.sizeForm.filename.length === 0) {
        Message({
          message: "没有选中推送文件",
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      if (this.sizeForm.targetDir.length === 0) {
        Message({
          message: "没有指定推送目录",
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
        data["target_dir"] = this.sizeForm.targetDir
        data["filename"] = this.sizeForm.filename
        ApiPushFile(data)
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
        data["target_dir"] = this.sizeForm.targetDir
        data["filename"] = this.sizeForm.filename
        ApiPushFile(data)
      }

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
