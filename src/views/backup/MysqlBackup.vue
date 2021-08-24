<template>
  <div>
    <BlankTable link-column-name="db_name" @getSearch="getSearch" @checkClick="checkClick" :table-colum-array="tableColumArray" @deleteAllClick="deleteAllClick" :table-data="tableData" :breadcrumbList="breadcrumbList" :sort-prop-list="sortPropList" @deleteClick="deleteClick" initSearchKey="db_name" @addClick="addClick"/>

  </div>
</template>

<script>
import BlankTable from "components/common/blanktable/BlankTable"
import {
  ApiDeleteAllMysqlBackupDetail,
  ApiDeleteMysqlBackupDetail,
  ApiGetAllMysqlBackup,
  ApiSearchMysqlBackupDetail
} from "network/api"
export default {
name: "MysqlBackup",
  components: {
    BlankTable
  },
  data() {
    return {
      breadcrumbList: ["备份信息","数据库备份"],
      tableColumArray: [
        {
          prop:"db_name" ,
          label:"数据库实例名",
          width:200,
        },
        {
          prop:"db_port" ,
          label:"数据库端口号",
          width:120,
        },
        {
          prop:"remote_server" ,
          label:"异地备份服务器",
          width:200,
        },
        {
          prop:"remote_dir" ,
          label:"异地备份目录",
          width:400,
        },
        {
          prop:"backup_log" ,
          label:"备份情况",
          width:400,
        },
      ],
      sortPropList:[
        "db_name"
      ],
      tableData : [
      ],
    }
  },
  methods: {
    addClick() {
      this.$router.push("/AddMysqlBackup/")
    },
    checkClick(id) {
      this.$router.push("/mysqlBackupDetail/"+id+"/")
    },
    deleteClick(deleteID) {

      this.$confirm('此操作将删除此记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        return ApiDeleteMysqlBackupDetail(deleteID)
      }).then(()=>{
        return ApiGetAllMysqlBackup()
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
      ApiDeleteAllMysqlBackupDetail(deleteIDs).then( () => {
          ApiGetAllMysqlBackup().then(res => {
            this.tableData = res.data
          })
        }).catch(err => {
        console.log(err)
      })
    },
    getSearch(key){
      ApiSearchMysqlBackupDetail(key).then(res => {
        this.tableData =res.data
      })
    },
  },
  mounted() {
    ApiGetAllMysqlBackup().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style scoped>

</style>
