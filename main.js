import Vue from 'vue'
import App from './App'

import store from './store'
import request from './req/index'
import tips from './util/tips'

Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$req=request
Vue.prototype.$tips=tips
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

