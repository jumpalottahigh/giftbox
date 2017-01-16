<template lang="html">
  <div id="app">
    <header>
      <div class="page-header">
        <h1>Giftbox</h1>
      </div>
    </header>
    <!-- Start Giftbox -->
    <div id="main">
      <div v-for="gift in giftbox" class="col mb-3">
        <div class="gift text-primary card p-3">
          <h4>{{gift.name}}</h4>
          <p>$ {{gift.currentAmount}} / $ {{gift.totalPrice}}</p>
          <p class="text-muted">{{gift.note}}</p>
          <p><span class="text-muted">Need Rating: </span>{{gift.need}}</p>
          <p>
            <span class="text-muted">Added on: </span>
            <time :datetime="formatDate(gift.timestamp)">{{formatDate(gift.timestamp)}}</time>
          </p>
          <p><span class="text-muted">Funded: </span>{{calculatePercentFunded(gift.currentAmount, gift.totalPrice)}}%</p>
          <progress class="progress-bar mb-3" :value="calculatePercentFunded(gift.currentAmount, gift.totalPrice)" max="100"></progress>
          <div class="col-xs-12">
            <a class="btn btn-info" id="giftLink" v-bind:href="gift.url"><i class="fa fa-external-link"></i></a>
            <!-- <button class="btn btn-success" id="editGift"><i class="fa fa-pencil"></i></button> -->
            <button class="btn btn-danger" id="removeGift" @click="removeGift(gift)"><i class="fa fa-trash-o"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Giftbox -->

    <!-- Start add new gift -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Add new gift</h3>
      </div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addGift">
          <div class="form-group">
            <label for="giftName">Name:</label>
            <input type="text" id="giftName" class="form-control" v-model="newGift.name">
          </div>
          <div class="form-group">
            <label for="giftNote">Note:</label>
            <input type="text" id="giftNote" class="form-control" v-model="newGift.note">
          </div>
          <div class="form-group">
            <label for="giftNeed">Need:</label>
            <input type="text" id="giftNeed" class="form-control" v-model="newGift.need">
          </div>
          <div class="form-group">
            <label for="giftCurrentAmount">Current amount:</label>
            <input type="text" id="giftCurrentAmount" class="form-control" v-model="newGift.currentAmount">
          </div>
          <div class="form-group">
            <label for="giftPicture">Picture:</label>
            <input type="text" id="giftPicture" class="form-control" v-model="newGift.picture">
          </div>
          <div class="form-group">
            <label for="giftTotalPrice">Total price:</label>
            <input type="text" id="giftTotalPrice" class="form-control" v-model="newGift.totalPrice">
          </div>
          <div class="form-group">
            <label for="giftUrl">URL:</label>
            <input type="text" id="giftUrl" class="form-control" v-model="newGift.url">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Gift">
        </form>
      </div>
    </div>
    <!-- End add new gift -->

    <footer class="py-3">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <h5>Copyright &copy; 2013-2017 Georgi Yanev &amp; Sofia Lindberg</h5>
            <h5><i class="fa fa-code" aria-hidden="true"></i> with <i class="fa fa-heart" aria-hidden="true"></i> for little Anton.</h5>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Firebase from 'firebase'
import moment from 'moment'
// import toastr from 'toastr'

let config = {
  apiKey: 'AIzaSyBartoXcvlmH1wu6lLuFXcpGEqiSjIoXng',
  authDomain: 'giftbox-40985.firebaseapp.com',
  databaseURL: 'https://giftbox-40985.firebaseio.com',
  storageBucket: 'giftbox-40985.appspot.com',
  messagingSenderId: '907745758023'
}

// Init Firebase app
let app = Firebase.initializeApp(config)
// Init DB
let db = app.database()

// References
// TODO: fix to proper users ref and remove hardcoded user hash
let giftboxRef = db.ref('users/krI0kqz1etdAuyi49jAGUS1SWem2/giftbox')

export default {
  name: 'app',
  firebase: {
    giftbox: giftboxRef
  },
  data () {
    return {
      newGift: {
        currentAmount: '',
        name: '',
        need: '',
        note: '',
        picture: '',
        timestamp: '',
        totalPrice: '',
        url: ''
      }
    }
  },
  methods: {
    addGift: function () {
      // Add current time to new gift
      this.newGift.timestamp = Date.now()
      giftboxRef.push(this.newGift)
      this.newGift.currentAmount = ''
      this.newGift.name = ''
      this.newGift.need = ''
      this.newGift.note = ''
      this.newGift.picture = ''
      this.newGift.timestamp = ''
      this.newGift.totalPrice = ''
      this.newGift.url = ''
    },
    removeGift: function (gift) {
      giftboxRef.child(gift['.key']).remove()
      // toastr.success('Gift removed!')
    },
    // Takes in current funded and total price and returns % value of fund status
    calculatePercentFunded: function (current, total) {
      // +0.5 for accurate flooring ;)
      return Math.floor((current / total * 100) + 0.5)
    },
    // Format dates with moment.js
    formatDate: function (ts) {
      return moment(ts).format('Do MMM YYYY')
    }
  }
}
</script>

<style lang="css" scoped>
/*General*/
#app {
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*Main - Giftbox*/
.gift {
  background-color: #dfdfdf;
}

/*Footer*/
footer {
  color: burlywood;
  background-color: firebrick;
}
</style>
