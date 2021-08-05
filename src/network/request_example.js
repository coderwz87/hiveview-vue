import axios from "axios"
import qs from "qs"
import { MessageBox, Message } from 'element-ui'
import util from "@/util"

export function PrometheusRequest(config) {
  const instance = axios.create({
    baseURL: 'http://0.0.0.0:9093',
    timeout: 5000
  })
  return instance(config)
}

export function ApiRequest(config) {
  const instance = axios.create({
    baseURL: 'http://0.0.0.0:9080',
    timeout: 5000,
    headers: config.headers || { 'content-type': 'application/x-www-form-urlencoded' },

  })


  instance.interceptors.request.use((config) => {
    beforeRequestString(config)
    beforeRequestAddToken(config)
    return config
  }, (error) => {
    return Promise.reject(error);
  });
  if (config.url.indexOf("download") === -1) {
    instance.interceptors.response.use( response => {
      const code = response.data.code
      if ( code === 200 ) {
        return response.data


      } else if( code===402 ) {
        const title = '登录'
        const msg = '需要登录验证'
        MessageBox.confirm(msg,title,{
          confirmButtonText: "请重新登录",
          cancelButtonText: "退出",
          type: "warning"
        }).then( () =>{
            window.location = '/login'
          }
        )
      }else if( code === 201) {
        Message({
          message: response.data.msg,
          type: 'success',
          duration: 5 * 1000
        })
      } else {
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
    } )
  }


  return instance(config)
}
// 添加token到headers
function beforeRequestAddToken(config) {
  const token = util.GetLoginToken()
  if (token) {
    config.headers["token"] = token
    // config.headers['Content-Type'] = 'application/json'
  }
}

//序列化
function beforeRequestString(config) {
  if(config.method === 'post' || config.method === "patch" ) {
    config.data = qs.stringify(config.data);
  }
}
