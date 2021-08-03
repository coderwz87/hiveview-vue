import {PrometheusRequest} from "./request"

export function PrometheusAlertRequest(){
  return PrometheusRequest({
   url: '/api/v1/alerts?silenced=false&inhibited=false'
  })
}
