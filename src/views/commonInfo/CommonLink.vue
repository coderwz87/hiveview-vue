<template>
  <div id="commonlink">
    <span v-for="item in LinkArry" class="link">
    <el-link  :href="item.link"  type="primary" target="_blank" :key="item.id">
      {{ item.label }}

    </el-link>
    </span>
  </div>

</template>

<script>
import {ApiGetAllLink} from "network/api"

export default {
  name: "CommonLink",
  data() {
    return {
      LinkArry : []
    }
  },
  created() {
    ApiGetAllLink().then(res => {
      this.LinkArry = res.data
      console.log(this.LinkArry)
    })
  }
}
</script>

<style scoped>
.link {
  margin: 20px;
}
</style>
