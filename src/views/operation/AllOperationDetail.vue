<template>
<BlankTable :sort-prop-list="sortPropList" :default-sort="defaultSort" :ifSearch="false" :ifAdd="false" :ifItemDelete="false" :ifDelete="false" :table-colum-array="tableColumArray" :table-data="tableData" :breadcrumbList="breadcrumbList"/>
</template>

<script>
import BlankTable from "components/common/blanktable/BlankTable";
import {ApiAllOperationDetail} from "network/api";
export default {
  name: "AllOperationDetail",
  components: {
    BlankTable
  },
  data() {
    return {
      sortPropList:[
        "app_name",
        "CreatedAt"
      ],
      breadcrumbList: ["应用相关","操作日志"],
      tableColumArray: [
        {
          prop:"user" ,
          label:"发起人",
          width:200,
        },
        {
          prop:"app_name" ,
          label:"应用名",
          width:150,
        },
        {
          prop:"host" ,
          label:"服务器地址",
          width:200,
        },
        {
          prop:"action" ,
          label:"操作类型",
          width:120,
        },
        {
          prop:"type" ,
          label:"应用类型",
          width:120,
        },
        {
          prop:"state" ,
          label:"状态",
          width:120,
        },
        {
          prop:"CreatedAt" ,
          label:"发起时间",
          width:400,
        },
      ],
      tableData : [
      ],
      defaultSort : {
        prop:"CreatedAt",
        order:"descending",
      },
    }
  },
  mounted() {
    ApiAllOperationDetail().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style scoped>

</style>
