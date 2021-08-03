<template>
  <BlankForm :input-items="InputItems"  @Submit="CreateMysqlBackupDetail" @cancel="cancel">
    <span slot="formName">Mysql备份</span>
  </BlankForm>
</template>

<script>
import BlankForm from "components/common/blankForm/BlankForm"
import {ApiAddMysqlBackupDetail} from "network/api"
export default {
  name: "AddMysqlBackup",
  components:{
    BlankForm,
  },
  data() {
    return {
      InputItems: [
        {
          "label":"数据库实例名",
          "title":"db_name",
          "value":"",
        },
        {
          "label":"数据库端口号",
          "title":"db_port",
          "value":"",
        },
        {
          "label":"异地备份服务器",
          "title":"remote_server",
          "value":"",
        },
        {
          "label":"异地备份目录",
          "title":"remote_dir",
          "value":"",
        },
      ],
    }
  },
  methods:{
    CreateMysqlBackupDetail(input) {
      let data = {}
      for(let i in input) {
        data[input[i].title] = input[i].value
      }
      ApiAddMysqlBackupDetail(data).then(res => {
        this.$router.push("/MysqlBackup/")
      })
    },
    cancel() {
      this.$router.push("/MysqlBackup/")
    }
  }
}
</script>

<style scoped>

</style>
