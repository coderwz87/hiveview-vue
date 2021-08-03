<template>
  <BlankTable :table-colum-array="tableColumArray" :ifItemDelete="false" :ifAdd="false" :if-delete="false" :table-data="tableData" :breadcrumbList="breadcrumbList" :sort-prop-list="sortPropList" initSearchKey="project_name"/>
</template>

<script>
import BlankTable from "components/common/blanktable/BlankTable";
import {ApiGetAllOtherBackup} from "network/api"

export default {
  name: "OtherBackup",
  components: {
    BlankTable
  },
  data() {
    return {
      breadcrumbList: ["备份信息", "其他项目备份"],
      tableColumArray: [
        {
          prop: "project_name",
          label: "项目名",
          width: 200,
        },
        {
          prop: "remote_server",
          label: "异地备份服务器",
          width: 200,
        },
        {
          prop: "remote_dir",
          label: "异地备份目录",
          width: 400,
        },
        {
          prop: "backup_log",
          label: "备份情况",
          width: 400,
        },
      ],
      sortPropList: [
        "project_name"
      ],
      tableData: [],
    }
  },
mounted() {
  ApiGetAllOtherBackup().then(res => {
    this.tableData = res.data
  })
}

}
</script>

<style scoped>

</style>
