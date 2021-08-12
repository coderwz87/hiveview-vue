<template>

  <BlankForm :input-items="InputItems" :select-items="SelectItems" @Submit="AddApplicationDetail" @cancel="cancel">
    <span slot="formName">添加应用信息</span>
  </BlankForm>

</template>

<script>
import BlankForm from "components/common/blankForm/BlankForm";
import {ApiAddAppDetail} from "network/api";

export default {
  name: "AddApplicationDetail",
  components:{
    BlankForm,
  },
  data() {
    return {
      InputItems: [
        {
          "label":"应用程序名",
          "title":"app_name",
          "value":this.$route.query["app_name"],
        },
        {
          "label":"服务器地址",
          "title":"host",
          "value":this.$route.query["host"],
        },
        {
          "label":"部署目录",
          "title":"dir",
          "value":this.$route.query["dir"],
        }
      ],
      SelectItems:[
        {
          "label":"应用类型",
          "title":"type",
          "value":this.$route.query["type"],
          "select":["resin","jar"]
        }
      ]

    }
  },
  methods: {
    AddApplicationDetail(input,selected) {
      let data = {}
      for(let i in input) {
        data[input[i].title] = input[i].value
      }
      for(let i in selected) {
        data[selected[i].title] = selected[i].value
      }
      ApiAddAppDetail(data).then(res => {
        this.$router.push("/AppDetail/")
      }).catch(err => {
        console.log(err)
      })
    },
    cancel() {
      this.$router.push("/AppDetail/")
    }
  }
}
</script>

<style scoped>

</style>
