<template>
  <BlankTable @getSearch="getSearch" @checkClick="checkClick" link-column-name="app_name" :table-colum-array="tableColumArray" @deleteAllClick="deleteAllClick" :table-data="tableData" :breadcrumbList="breadcrumbList" :sort-prop-list="sortPropList" @deleteClick="deleteClick" initSearchKey="app_name" @addClick="addClick">
    <template v-slot:BUTTON="data">
      <el-button type="text" @click="restartApp(data)" size="small">重启</el-button>
      <el-button type="text" @click="stopApp(data)" size="small">停止</el-button>
      <el-button type="text" @click="startApp(data)" size="small">启动</el-button>
      <el-button type="text" @click="AddApp(data)" size="small">扩容</el-button>
      <el-button type="text" @click="CopyApp(data)" size="small">复制</el-button>
    </template>
  </BlankTable>
</template>

<script>
import BlankTable from "components/common/blanktable/BlankTable";
import {
  ApiDeleteAppDetail,
  ApiGetAllAppDetail,
  ApiDeleteAllAppDetail,
  ApiOperationApp,
  ApiSearchAppDetail
} from "network/api";

export default {
name: "AllApplicationDetail",
  components: {
    BlankTable
  },
  data() {
    return {
      breadcrumbList: ["应用相关","应用信息"],
      tableColumArray: [
        {
          prop:"app_name" ,
          label:"应用程序名",
          width:200,
        },
        {
          prop:"host" ,
          label:"服务器地址",
          width:150,
        },
        {
          prop:"dir" ,
          label:"部署目录",
          width:600,
        },
        {
          prop:"type" ,
          label:"应用类型",
          width:120,
        },
        {
          prop:"state" ,
          label:"状态",
          width:200,
        },
      ],
      sortPropList:[
        "app_name"
      ],
      tableData : [
      ],

    }
  },
  methods:{
    addClick() {
      this.$router.push("/AddAppDetail/")
    },
    deleteClick(deleteID) {
      this.$confirm('此操作将删除此记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        return ApiDeleteAppDetail(deleteID)
      }).then(()=>{
        return ApiGetAllAppDetail()
      }).then(res =>{
        this.tableData = res.data
      }).catch((err) => {
        if (err === "cancel") {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        } else {
          this.$message({
            type: 'info',
            message: '删除异常'
          });
        }
      });
    },
    deleteAllClick(data) {
      if (data.length === 0) {
        this.$message({
          type: 'error',
          message: '没有添加删除项'
        });
        return
      }
      let deleteIDs = []
      data.forEach( (value) => {
          deleteIDs.push(value.ID)
        }
      )
      ApiDeleteAllAppDetail(deleteIDs).then( () => {
        this.$router.push("/AddAppDetail/")
      }).catch( (err) => {
        console.log(err)
      })
    },
    AddApp(data) {
      this.$router.push("/resinInit/?projectName="+data.data.app_name)
    },
    restartApp(data){
      let requestData = {}
      requestData["action"] = "restart"
      requestData["appID"] = data.data.ID
      ApiOperationApp(requestData).catch(err => {
        console.log(err)
      })
    },
    stopApp(data){
      let requestData = {}
      requestData["action"] = "stop"
      requestData["appID"] = data.data.ID
      ApiOperationApp(requestData).catch(err => {
        console.log(err)
      })
    },
    startApp(data){
      let requestData = {}
      requestData["action"] = "start"
      requestData["appID"] = data.data.ID
      ApiOperationApp(requestData).catch(err => {
        console.log(err)
      })
    },
    CopyApp(data){
      this.$router.push("/AddAppDetail/?app_name="+data.data.app_name+"&host="+data.data.host+"&dir="+data.data.dir+"&type="+data.data.type)
    },
    getSearch(key){
      ApiSearchAppDetail(key).then(res => {
        this.tableData =res.data
      })
    },
    checkClick(id) {
      this.$router.push("/ApplicationDetail/"+id+"/")
    },
  },
  mounted() {
    ApiGetAllAppDetail().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style scoped>

</style>
