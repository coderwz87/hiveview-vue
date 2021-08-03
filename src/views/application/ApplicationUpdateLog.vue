<template>
<div>
  <BlankTable :if-item-delete="false" :default-sort="defaultSort" @getSearch="getSearch" :if-delete="false" :if-add="false" :table-colum-array="tableColumnArray" :table-data="tableData" :breadcrumbList="breadcrumbList" :sort-prop-list="sortPropList"/>


</div>
</template>

<script>
import BlankTable from "components/common/blanktable/BlankTable"
import {ApiAppUpdateLog, ApiSearchUpdateLog} from "network/api"

export default {
  name: "ApplicationUpdateLog",
  components: {
    BlankTable
  },
  data() {
  return {
    breadcrumbList: ["应用信息","应用更新信息"],
    tableColumnArray :[
      {
        prop:"app_name" ,
        label:"应用名",
        width:300,
      },
      {
        prop:"update_time" ,
        label:"更新时间",
        width:300,
      },
      {
        prop:"host" ,
        label:"更新主机",
        width:300,
      },
      {
        prop:"md5",
        label: "MD5值",
        width: 400,
      },
    ],
    sortPropList:[
      "update_time"
    ],
    tableData : [
    ],
    defaultSort : {
      prop:"update_time",
      order:"descending",
    },
    }
  },
  mounted() {
    ApiAppUpdateLog().then(res => {
      this.tableData = res.data
    })
  },
  methods:{
    getSearch(key){
      ApiSearchUpdateLog(key).then(res => {
        this.tableData =res.data
      })
    },
  }
}
</script>

<style scoped>

</style>
