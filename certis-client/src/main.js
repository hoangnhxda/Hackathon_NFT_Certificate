import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

if (typeof window.ethereum == 'undefined') {
  //if (window.confirm('Không nhận được Metamask, bạn có muốn cài đặt??')) {
    //window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank');
    //write this above first
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

    //then use this code for alert
    if (window.confirm('Bạn cần cài đặt Metamask để có thể truy cập. Nhấn OK để tới trang cài đặt')) {
      a.click();
    }
  //}
}

window.ethereum.on('accountsChanged', () => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

});
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
