<template>
  <div>
    <BlankTable @exportExcel="exportExcel" link-column-name="ip" @getSearch="getSearch" :if-filter="true" :filter-objects="filterObject" initSearchKey="ip" :ifExport="true" @serviceInit="serviceInit" :if-init="true" :cascader-options="cascaderOptions" :table-colum-array="tableColumArray" @deleteAllClick="deleteAllClick" :sort-prop-list="sortPropList" :table-data="tableData" :breadcrumbList="breadcrumbList" @checkClick="checkClick" @editClick="editClick" @deleteClick="deleteClick" @addClick="addClick">
      <el-button slot="BUTTON" type="text"  slot-scope="row" @click="monitor(row.data)" size="small">监控</el-button>
    </BlankTable>
  </div>
</template>
<script>
import BlankTable from "components/common/blanktable/BlankTable"

import {ApiGetServer,ApiDeleteServer,ApiDeleteAllServer,ApiDownloadAssetInfo,ApiSearchAssetsInfo,ApiBatchServiceInit} from "network/api"

export default {
  name:"SeverInfo",
  components: {
    BlankTable
  },
  data() {
    return {
      input: '',
      breadcrumbList: ["资产信息","服务器资产"],
      cascaderOptions: [
        {
          value:"zabbix_agent",
          label:"zabbix_agent",
        },
        {
          value: "prometheus",
          label: "prometheus",
          children:[
            {
              value:"node_exporter",
              label:"node_exporter",
            }
          ],
        }
      ],

      tableColumArray : [
        {
          prop:"ip" ,
          label:"服务器地址",
          width:200,
          filter:false,
        },
        {
          prop:"idc" ,
          label:"机房",
          width:120,
          filter:true,
        },
        {
          prop:"use" ,
          label:"类型",
          width:120,
          filter:true,
        },
        {
          prop: "sever_model",
          label: "服务器型号",
          width: 240 ,
          filter:true,
        },
        {
          prop: "os_version",
          label: "系统版本",
          width: 120,
          filter:true,
        },
        {
          prop:"interface_speed",
          label: "网卡速率",
          width: 120,
          filter:false,
        },
        {
          prop: "disk_total",
          label: "硬盘大小",
          width: 120,
          filter:false,
        },
        {
          prop: "mem",
          label: "内存大小",
          width: 120,
          filter:false,
        },
        {
          prop: "cpu_count",
          label: "核心数",
          width: 80,
          filter:false,
        },
        {
          prop: "comment",
          label: "备注",
          width: 240,
          filter:true,
        },
      ],
      tableData : [
      ],
      sortPropList:[
        "idc",
        "ip"
      ],
      filterObject:{},
    }
  },
  methods: {
    editClick(id) {
      console.log(id)
    },
    checkClick(id) {
      this.$router.push("/serverDetail/"+id+"/")
    },
    exportExcel(){
      ApiDownloadAssetInfo().then(res => {
        console.log(res)
        const link = document.createElement('a')
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', 'asset.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(err => {
        this.$message.error(err.message);
      })
    },
    getSearch(key){
      ApiSearchAssetsInfo(key).then(res => {
        this.tableData =res.data
      })
    },
    deleteClick(deleteID) {

      this.$confirm('此操作将删除此记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          return ApiDeleteServer(deleteID)
        }).then(() => {
          this.getTableData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

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
    addClick() {
      this.$router.push("/addServer/")
    },
    deleteAllClick(data) {
      if (data.length === 0) {
        this.$message({
          type: 'error',
          message: '没有添加删除项'
        });
        return
      }
      let deleteids = []
      data.forEach( (value) => {
        deleteids.push(value.ID)
        }
      )
      ApiDeleteAllServer(deleteids).then( () => {
        this.getTableData()
      })

    },
    serviceInit(value,rowList){
      let service_name = value[value.length - 1]
      let init_ips = []
      rowList.forEach( value => {
        init_ips.push(value.ip)
      })
      let data = {
        service_name,
        init_ips
      }
      ApiBatchServiceInit(data).then( ()=> {
          value[value.length - 1] = ""
      }

      )
    },
    getFilterObject(){
      for (let i = 0,len=this.tableColumArray.length;i<len;i++){
        if(this.tableColumArray[i].filter === true) {
          this.filterObject[this.tableColumArray[i].prop] = []
        }

      }
      for (let k=0,len=this.tableData.length;k<len;k++) {
        for (let v in this.filterObject) {
          if (this.filterObject[v].indexOf(this.tableData[k][v]) === -1) {
            this.filterObject[v].push(this.tableData[k][v])
          }
        }
      }
    },
    getTableData() {
      ApiGetServer().then(res => {
        this.tableData = res.data
        this.getFilterObject()
      })
    },
    monitor(data) {
      let url = "http://10.240.37.20:3000/d/9CWBz0bik/node_exporter?orgId=1&var-job=consul-node-exporter&var-hostname=" + data.ip
      window.open(url)
    }
  },
  mounted() {
    this.getTableData()
  }

}
</script>
<style scoped>

</style>
