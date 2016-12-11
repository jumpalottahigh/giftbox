// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueFire from 'vuefire'
// import firebase from 'firebase'
//
// Vue.use(VueFire)
//
// const config = {
//   apiKey: 'AIzaSyBartoXcvlmH1wu6lLuFXcpGEqiSjIoXng',
//   authDomain: 'giftbox-40985.firebaseapp.com',
//   databaseURL: 'https://giftbox-40985.firebaseio.com',
//   storageBucket: 'giftbox-40985.appspot.com',
//   messagingSenderId: '907745758023'
// }
//
// const fb = firebase.initializeApp(config)
// const db = fb.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
  // ,firebase: {
  //   anArray: db.ref('testusers')
  // }
})
