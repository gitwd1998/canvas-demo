import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
const components = []
const webpackContext = require.context('@/components', false, /.vue$/)
webpackContext.keys().forEach((path) => {
  const componentConfig = webpackContext(path)
  components.push(componentConfig.default.name)
  Vue.component(
    componentConfig.name || componentConfig.default.name,
    componentConfig.default || componentConfig
  )
})
Vue.prototype.$components = components


new Vue({
  render: h => h(App),
}).$mount('#app')
