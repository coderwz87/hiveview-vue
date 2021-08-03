<template>
  <div class="dashboardTop">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>服务器分布</span>
      </div>
      <div class="text item">
        <p>北京: {{ dashboardData["beijing_count"] }}</p>
        <p>其他: {{ dashboardData["other_count"] }}</p>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>虚拟化情况</span>
      </div>
      <div class="text item">
        <p>物理机: {{ dashboardData["physics_count"] }}</p>
        <p>虚拟机: {{ dashboardData["virtual_count"] }}</p>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>直播点播情况</span>
      </div>
      <div class="text item">
        <p>直播: {{ dashboardData["live_count"] }}</p>
        <p>点播: {{ dashboardData["hls_count"] }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DashboardTop",
  props: {
    dashboardData:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.dashboardTop {
  display: flex;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 0px 10px 5px 10px;
    flex: 1;
  }
</style>
