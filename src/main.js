import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import util from "./util"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

NProgress.configure({
  showSpinner: false
})

router.beforeEach( (to,from,next) => {
  NProgress.start()
  let isLogin = util.GetLoginToken()
  if(to.path=="/login"){
    if (!isLogin) {
      next()
    }else{
      router.replace("/")
    }
  }else{
    if (!isLogin) {
      router.replace({path:"/login", query:{redirect:to.path}});
    }else{
      next();
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})


new Vue({
  router,
  methods: util,
  // store,
  render: h => h(App)
}).$mount('#app')

