import {ApiRequest} from "./request"

export function ApiLogin(Username,Password) {
  return ApiRequest({
    url:"/api/login/",
    method: "post",
    data: {
      username : Username,
      password : Password
    }
  })
}

export function ApiGetServer() {
  return ApiRequest({
    url:"/api/getAllServer/",
    // method:"post",
  })
}

export function ApiDeleteServer(id) {
  return ApiRequest({
    url:"/api/server/"+ id +"/",
    method:"delete",
    }
  )
}

export function ApiGetDetail(id) {
  return ApiRequest({
    url:"/api/server/" + id + "/"
  })
}

export function ApiUpdateServer(id,data) {
  return ApiRequest({
    url:"/api/server/" + id + "/",
    method:"patch",
    data,
  })
}

export function ApiAddServer(data) {
  return ApiRequest({
    url:"/api/addServer/",
    method:"post",
    data
  })
}

export function ApiDeleteAllServer(data) {
  return ApiRequest({
    url:"/api/deleteAllServer/",
    method:"delete",
    headers:{ 'content-type': 'application/json' },
    data: {
      "server_ids":data,
    }
  })
}

export function ApiGetAllLink() {
  return ApiRequest({
    url:"/api/common/link/",
  })
}

export function ApiMysqlInit(data) {
  return ApiRequest({
    url:"/api/serviceInit/mysql/",
    method:"post",
    data
  })
}

export function ApiRedisInit(data) {
  return ApiRequest({
    url:"/api/serviceInit/redis/",
    method:"post",
    data
  })
}

export function ApiDownloadAssetInfo(){
  return ApiRequest({
    url:"/api/downloadAssetInfo/",
    responseType: 'blob',
  })
}

export function ApiAddMysqlBackupDetail(data) {
  return ApiRequest({
    url:"/api/addMysqlBackupDetail/",
    method:"post",
    data,
  })
}

export function ApiGetAllMysqlBackup(){
  return ApiRequest({
    url:"/api/allMysqlBackupInfo/"
  })
}

export function ApiDeleteMysqlBackupDetail(id) {
  return ApiRequest({
    url: "/api/mysqlBackupDetail/" + id + "/",
    method:"delete",
  })
}

export function ApiDeleteAllMysqlBackupDetail(data) {
  return ApiRequest({
    url:"/api/deleteAllMysqlBackupDetail/",
    method:"delete",
    headers:{ 'content-type': 'application/json' },
    data: {
      "detail_ids":data,
    }
  })
}

export function ApiGetAllOtherBackup(){
  return ApiRequest({
    url:"/api/allOtherBackupInfo/"
  })
}

export function ApiGetAllAppDetail(){
  return ApiRequest({
    url:"/api/getAllAppDetail/"
  })
}

export function ApiDeleteAppDetail(id) {
  return ApiRequest({
    url: "/api/appDetail/" + id + "/",
    method:"delete",
  })
}

export function ApiAddAppDetail(data) {
  return ApiRequest({
    url:"/api/addAppDetail/",
    method:"post",
    data,
  })
}

export function ApiDeleteAllAppDetail(data) {
  return ApiRequest({
    url:"/api/deleteAllAppDetail/",
    method:"delete",
    headers:{ 'content-type': 'application/json' },
    data: {
      "detail_ids":data,
    }
  })
}

export function ApiOperationApp(data) {
  return ApiRequest({
    url:"/api/operationApp/",
    method:"post",
    data
  })
}

export function ApiSearchAssetsInfo(data) {
  return ApiRequest({
    url:"/api/searchServer/?search=" + data
  })
}

export function ApiSearchMysqlBackupDetail(data) {
  return ApiRequest({
    url:"/api/searchMysqlBackupDetail/?search=" + data
  })
}

export function ApiSearchAppDetail(data) {
  return ApiRequest({
    url:"/api/searchAppDetail/?search=" + data
  })
}

export function ApiDashboardData(){
  return ApiRequest({
    url:"/api/dashboard/"
  })
}

export function ApiBatchServiceInit(data){
  return ApiRequest({
    url:"/api/serviceInit/batch/",
    method: "put",
    headers:{ 'content-type': 'application/json' },
    data
  })
}

export function ApiGetMysqlBackupDetail(id){
  return ApiRequest({
    url:"/api/mysqlBackupDetail/" + id + "/"
  })
}

export function ApiUpdateMysqlBackupBaseDetail(id,data){
  return ApiRequest({
    url:"/api/mysqlBackupDetail/" + id + "/",
    method:"patch",
    data
  })
}

export function ApiGetAppDetail(id) {
  return ApiRequest({
    url:"/api/AppDetail/" + id + "/"
  })
}

export function ApiUpdateAppDetail(id,data){
  return ApiRequest({
    url:"/api/AppDetail/" + id + "/",
    method:"patch",
    data
  })
}

export function ApiAppUpdateLog() {
  return ApiRequest({
    url:"/api/AppUpdateLog/",
  })
}

export function ApiSearchUpdateLog(data) {
  return ApiRequest({
    url:"/api/searchAppUpdateLog/?search=" +data
  })
}

export function ApiAppUpdateLogDashboard() {
  return ApiRequest({
    url:"/api/dashboardUpdateLog/"
  })
}

export function ApiGetAPPName() {
  return ApiRequest({
    url: "/api/getAllAppName/"
  })
}

export function ApiResinInit(data) {
  return ApiRequest({
    url:"/api/serviceInit/resin/",
    method:"post",
    data
  })
}
