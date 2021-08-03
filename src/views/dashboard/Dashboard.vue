<template>
  <div class="dashboard">
    <DashboardTop :dashboard-data="dashboardData"/>
    <DashboardCenter/>
    <span> prometheus 报警情况</span>
    <DashboardBottom :activities="resultArray" />

  </div>
</template>

<script>
import DashboardTop from "./children/DashboardTop"
import DashboardCenter from './children/DashboardCenter'
import DashboardBottom from './children/DashboardBottom'
import {PrometheusAlertRequest} from 'network/prometheus'
import {ApiDashboardData} from 'network/api'

export default {
  name: "Dashboard",
  components: {
    DashboardTop,
    DashboardCenter,
    DashboardBottom
  },
  data() {
    return {
      resultArray : [],
      dashboardData:{},
    }
  },
  created(){
    ApiDashboardData().then((res) => {
      this.dashboardData = res.data
    })

    PrometheusAlertRequest().then( res => {
      for( let item of res.data.data) {
        // console.log(item)
        let tmp = {}
        let day = item.startsAt.split("T",1)[0]
        let time = item.startsAt.split("T",2)[1].split(".",1)[0]
        tmp.timestamp = day + " " +time
        tmp.content = item.annotations.description
        this.resultArray.push(tmp)
      }
      this.resultArray.sort( function(a,b) {
        return a.timestamp < b.timestamp ? 1 : -1
      })
    }).catch(err => {
      console.log(err)
    })
  },


}
</script>
