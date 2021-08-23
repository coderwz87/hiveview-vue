<template>
  <div>
    <BlankTable :if-search="false" @checkClick="checkClick" :if-item-delete="false" :link-column-name="linkColumnName" :default-sort="defaultSort" :if-delete="false" :if-add="false" :table-colum-array="tableColumnArray" :table-data="tableData" :breadcrumbList="breadcrumbList" :sort-prop-list="sortPropList"/>
  </div>
</template>

<script>
import { ApiGetAllBatchLog} from "network/api"
import BlankTable from  "components/common/blanktable/BlankTable"
export default {
  name: "AllBatchLog",
  components: {
    BlankTable
  },
  data() {
    return {
      breadcrumbList: ["批处理","操作日志"],
      tableColumnArray: [
        {
          prop:"host" ,
          label:"操作主机或主机组",
          width:300,
        },
        {
          prop:"type" ,
          label:"操作类型",
          width:150,
        },
        {
          prop:"detail" ,
          label:"操作描述",
          width:300,
        },
        {
          prop:"CreatedAt" ,
          label:"开始时间",
          width:300,
        },
      ],
      sortPropList:[
        "CreatedAt"
      ],
      tableData : [
      ],
      defaultSort : {
        prop:"CreatedAt",
        order:"descending",
      },
      linkColumnName: "host",

    }
  },
  mounted() {
    ApiGetAllBatchLog().then(res => {
      this.tableData = res.data
    })
  },
  methods: {
    checkClick(id) {
      this.$router.push("/batchLog/"+id+"/")
    },
  }
}
</script>

<style scoped>

</style>
