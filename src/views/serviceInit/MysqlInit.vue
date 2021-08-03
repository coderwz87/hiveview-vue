<template>

  <BlankForm :input-items="InputItems" :select-items="SelectItems" @Submit="runInit">
    <span slot="formName">Mysql初始化</span>
  </BlankForm>

</template>

<script>
import BlankForm from "components/common/blankForm/BlankForm"
import {ApiMysqlInit} from "network/api"
export default {
  name: "MysqlInit",
  components:{
    BlankForm,
  },
  data() {
    return {
      InputItems: [
        {
          "label":"服务器地址",
          "title":"ip",
          "value":"",
        },
        {
          "label":"实例名称",
          "title":"name",
          "value":""
        },
        {
          "label":"实例端口",
          "title":"port",
          "value":""
        }
      ],
      SelectItems:[
        {
          "label":"数据库版本",
          "title":"version",
          "value":"",
          "select":["5.1.73","5.6.23"]
        }
      ]

    }
  },
  methods: {
    runInit(input,selected) {
      let data = {}
      for(let i in input) {
        data[input[i].title] = input[i].value
      }
      for(let i in selected) {
        data[selected[i].title] = selected[i].value
      }
      ApiMysqlInit(data).then(res => {
        this.$router.push("/serverInfo/")
      })
    }
  }

}
</script>

<style scoped>

</style>
