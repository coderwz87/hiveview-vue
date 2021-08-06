<template>

  <BlankForm :input-items="InputItems" @Submit="runInit">
    <span slot="formName">Redis初始化</span>
  </BlankForm>

</template>

<script>
import BlankForm from "components/common/blankForm/BlankForm"
import {ApiRedisInit} from "network/api";
export default {
  name: "RedisInit",
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
          "value":"",
        },
        {
          "label":"实例端口",
          "title":"port",
          "value":"",
        },
        {
          "label":"实例最大内存",
          "title":"memsize",
          "value":"",
        }
      ]

    }
  },
  methods: {
    runInit(input) {
      let data = {}
      for(let i in input) {
        data[input[i].title] = input[i].value
      }
      ApiRedisInit(data).then(res => {
        this.$router.push("/serverInfo")
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>

</style>
