<template>
  <div class="dashboardCenter" id="dashboardCenter">

  </div>
</template>

<script>
import * as echarts from "echarts"
import {ApiAppUpdateLogDashboard} from "network/api"
export default {
  name: "DashboardCenter",
  data() {
    return {
      charts: "",
      dashboardData:{},
    }
  },
  methods: {
    drawLine(id) {

      this.charts = echarts.init(document.getElementById(id))
      let option = {
        xAxis: {
            type: 'category',
            data: this.dashboardData["xAxis"]
        },
        yAxis: {
            type: 'value'
        },
        legend: {
          data: ['近七日上线次数']
        },
        series: [{
            name:"近七日上线次数",
            data: this.dashboardData["series"],
            type: 'line',
            smooth: true
        }],
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      };
      this.charts.setOption(option)

    }
  },
  mounted() {
    ApiAppUpdateLogDashboard().then( res => {
        this.dashboardData = res.data
        this.drawLine("dashboardCenter")
    }
    )
  }
}
</script>
<style scoped>
.dashboardCenter {
  width: 100%;
  height: 300px;
}
</style>
