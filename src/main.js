import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "@/assets/scss/base.scss"
import "@/assets/scss/tools.scss"



Vue.config.productionTip = false

Vue.directive("validity", {
  bind(el, binding) {
    const eventName = binding.modifiers.lazy ? "change" : "input"

    el.addEventListener(eventName, function() {
      if (!this.checkValidity() || el.validity.customError) {
        el.reportValidity()
      }
    })
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
