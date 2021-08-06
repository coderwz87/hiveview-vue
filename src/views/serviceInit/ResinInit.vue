<template>

  <BlankForm :input-items="InputItems" @Submit="runInit">
    <span slot="formName">Resin初始化</span>
  </BlankForm>

</template>

<script>
import BlankForm from "components/common/blankForm/BlankForm"
import {ApiResinInit} from "network/api"
export default {
  name: "ResinInit",
  components:{
    BlankForm,
  },
  data() {
    return {
      resinName:{
        type:Array,
        default(){
          return []
        }
      },
      InputItems: [
        {
          "label":"服务器地址",
          "title":"ip",
          "value":"",
        },
        {
          "label":"部署程序",
          "title":"project_name",
          "value":this.$route.query["projectName"],
        },
      ],

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
      ApiResinInit(data).then(() => {
        this.$router.push("/AppDetail/")
      }).catch(err => {
        console.log(err)
      })
    }
  },

}
</script>

<style scoped>

</style>
