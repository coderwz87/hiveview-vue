<template>
<div class="block">
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</div>
</template>
<script>
export default {
  name: "DashboardBottom",
  props: {
    activities : {
      type: Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      reverse: false,

    }
  }
}
</script>
<style scoped>
.block {
  text-align:left;
}
</style>
