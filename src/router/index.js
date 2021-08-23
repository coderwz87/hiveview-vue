import Vue from 'vue'
import VueRouter from 'vue-router'

const Layer = () => import("../Layer")
const Dashboard = () => import("views/dashboard/Dashboard")
const SeverInfo = () => import("views/assetsInfo/ServerInfo")
const AddServer = () => import("views/assetsInfo/AddServer")
const Login = () => import("views/login/Login")
const ServerDetail = () => import("views/assetsInfo/ServerDetail")
const CommonLink = () => import("views/commonInfo/CommonLink")
const MysqlInit = () => import("views/serviceInit/MysqlInit")
const RedisInit = () => import("views/serviceInit/RedisInit")
const MysqlBackup = () => import("views/backup/MysqlBackup")
const AddMysqlBackup = () => import("views/backup/AddMysqlBackup")
const OtherBackup = () => import("views/backup/OtherBackup")
const AppDetail = () => import("views/application/AllApplicationDetail")
const AddAppDetail = () => import("views/application/AddApplicationDetail")
const MysqlBackupDetail = () => import("views/backup/MysqlBackupDetail")
const ApplicationDetail = () => import("views/application/ApplicationDetail")
const ApplicationUpdateLog = () => import("views/application/ApplicationUpdateLog")
const ResinInit = () => import("views/serviceInit/ResinInit")
const ChangePassword = () => import("views/login/ChangePassword")
const AddUser = () => import("views/login/addUser")
const OperationDetail = () => import("views/operation/OperationDetail")
const AllOperationDetail = () => import("views/operation/AllOperationDetail")
const PushFile =() => import("views/batch/PushFile")
const BatchLog = () => import("views/batch/BatchLog")
const AllBatchLog = () => import("views/batch/AllBatchLog")
const ExecCommand = () => import("views/batch/ExecCommand")
Vue.use(VueRouter)
//解决vue-router重复点击报错问题（this.$router.replace()）
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
//解决vue-router重复点击报错问题（this.$router.push()）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push= function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path:"",
    redirect:"/dashboard/"
  },
  {
    path: "/login/",
    component: Login
  },

  {
    path: "/",
    component: Layer,
    children: [
      {
        path: "dashboard/" ,
        component: Dashboard
      },
      {
        path: "serverInfo/",
        component:SeverInfo
      },
      {
        path: "addServer/",
        component: AddServer,
      },
      {
        path: "serverDetail/:id/",
        component:ServerDetail,
      },
      {
        path: "commonLink/",
        component:CommonLink,
      },
      {
        path: "mysqlInit/",
        component: MysqlInit,
      },
      {
        path:"RedisInit/",
        component:RedisInit,
      },
      {
        path: "ResinInit/",
        component: ResinInit,
      },
      {
        path: "MysqlBackup/",
        component:MysqlBackup,
      },
      {
        path: "MysqlBackupDetail/:id/",
        component: MysqlBackupDetail,
      },
      {
        path: "AddMysqlBackup/",
        component:AddMysqlBackup,
      },
      {
        path:"OtherBackup/",
        component:OtherBackup,
      },
      {
        path:"AppDetail/",
        component:AppDetail,
      },
      {
        path: "AddAppDetail/",
        component:AddAppDetail,
      },
      {
        path: "ApplicationDetail/:id/",
        component:ApplicationDetail,
      },
      {
        path: "ApplicationUpdateLog/",
        component:ApplicationUpdateLog,
      },
      {
        path: "ChangePassword/",
        component:ChangePassword,
      },
      {
        path: "AddUser/",
        component:AddUser,
      },
      {
        path: "OperationDetail/:id/",
        component:OperationDetail,
      },
      {
        path: "AllOperationDetail/",
        component:AllOperationDetail,
      },
      {
        path: "PushFile/",
        component: PushFile,
      },
      {
        path: "batchLog/:id/",
        component:BatchLog,
      },
      {
        path: "AllBatchLog/",
        component: AllBatchLog,
      },
      {
        path: "ExecCommand/",
        component: ExecCommand,
      }

    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
