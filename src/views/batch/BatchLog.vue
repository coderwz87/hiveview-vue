<template>
  <el-input
    type="textarea"
    :rows="50"
    placeholder="请输入内容"
    v-model="textarea">
  </el-input>
</template>

<script>
import {ApiBatchLog} from "network/api"
export default {
name: "BatchLog",
  data() {
    return {
      "textarea": "",
    }
  },
  mounted() {
    ApiBatchLog(this.$route.params.id).then(res => {
      this.textarea = res.data
    })
  }
}
</script>

<style scoped>

</style>
