<template lang="html">
  <div id="app">
    <!-- Menu tabs -->
    <md-tabs md-fixed>

      <!-- Start my giftbox tab -->
      <md-tab md-label="My giftbox">
        <!-- Repeatable gift card -->
        <md-card v-for="gift in giftbox">
          <!-- gift header -->
          <md-card-header>
            <h2 class="md-title">
              {{gift.name}}
            </h2>
            <div class="md-subhead">
              $ {{gift.currentAmount}} / $ {{gift.totalPrice}}
            </div>
          </md-card-header>
          <!-- gift content -->
          <md-card-content>
            <div>{{gift.note}}</div>
            <div>Need Rating: {{gift.need}}</div>
            <div>Added on: <time :datetime="formatDate(gift.timestamp)">{{formatDate(gift.timestamp)}}</time></div>
            <div>Funded: {{calculatePercentFunded(gift.currentAmount, gift.totalPrice)}}%</div>
            <md-progress :md-progress="calculatePercentFunded(gift.currentAmount, gift.totalPrice)"></md-progress>
          </md-card-content>
          <!-- gift actions -->
          <md-card-actions>
            <md-button class="md-raised md-primary" @click="receivedGift(gift)">
              <md-icon>check</md-icon>
              <md-tooltip md-delay="500" md-direction="bottom">Bought / Received</md-tooltip>
            </md-button>
            <md-button class="md-raised md-warn" @click="removeGift(gift)">
              <md-icon>delete</md-icon>
              <md-tooltip md-delay="500" md-direction="bottom">Remove / Delete</md-tooltip>
            </md-button>
            <!-- <md-button class="md-raised md-accent">Action</md-button> -->
            <!-- <md-button class="md-raised">Action</md-button> -->
          </md-card-actions>
          <!-- End Giftbox -->
        </md-card>
      </md-tab>
      <!-- End giftbox tab -->

      <!-- Start friend gift tab -->
      <md-tab md-label="Friend gifts">
        <p>Tab for friend gifts.</p>
      </md-tab>
      <!-- End friend gift tab -->

      <!-- Start gift history tab -->
      <md-tab md-label="Gift history">
        <md-card v-for="gift in gifthistory">
          <!-- gift header -->
          <md-card-header>
            <h2 class="md-title">
              {{gift.name}}
            </h2>
            <div class="md-subhead">
              $ {{gift.currentAmount}} / $ {{gift.totalPrice}}
            </div>
          </md-card-header>
          <!-- gift content -->
          <md-card-content>
            <md-progress :md-progress="calculatePercentFunded(gift.currentAmount, gift.totalPrice)"></md-progress>
          </md-card-content>
          <!-- gift actions -->
          <md-card-actions>
            <md-button class="md-raised md-warn" @click="removeGiftFromHistory(gift)">
              <md-icon>delete</md-icon>
              <md-tooltip md-delay="500" md-direction="bottom">Remove / Delete</md-tooltip>
            </md-button>
          </md-card-actions>
          <!-- End Giftbox -->
        </md-card>
      </md-tab>
      <!-- End gift history tab -->

      <!-- Start add gift tab -->
      <md-tab md-label="Add gift">
        <md-card>
          <!-- <md-card-header>
            <h2 class="md-subheading">Add a new gift:</h2>
          </md-card-header> -->

          <md-card-content>
            <md-input-container>
              <md-icon>wallet_giftcard</md-icon>
              <label>Name:</label>
              <md-input type="text" v-model="newGift.name"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>speaker_notes</md-icon>
              <label>Note:</label>
              <md-input type="text" v-model="newGift.note"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>star_half</md-icon>
              <label>Need (1/3):</label>
              <md-input type="text" v-model="newGift.need"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>image</md-icon>
              <label>Picture:</label>
              <md-input type="text" v-model="newGift.picture"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>link</md-icon>
              <label>URL:</label>
              <md-input type="text" v-model="newGift.url"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>attach_money</md-icon>
              <label>Current amount:</label>
              <md-input type="text" v-model="newGift.currentAmount"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>attach_money</md-icon>
              <label>Total price:</label>
              <md-input type="text" v-model="newGift.totalPrice"></md-input>
            </md-input-container>

          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary" @click="addGift()">Add</md-button>
          </md-card-actions>
        </md-card>
        <!-- End add gift tab -->
      </md-tab>

      <md-tab md-label="Settings">
        <!-- TODO: This needs work cuz current user status is not back yet at template rendering time -->
        <!-- <template v-if="isUserLoggedIn === true">
          <md-button class="md-raised md-primary" @click="loginUser">Login</md-button>
        </template>
        <template v-else>
          <md-button class="md-raised md-primary" @click="logoutUser">Logout</md-button>
        </template> -->
        <md-card>
          <md-card-content>
            <md-input-container>
              <md-icon>speaker_notes</md-icon>
              <label>Email:</label>
              <md-input type="text" v-model="settings.loginEmail"></md-input>
            </md-input-container>
            <md-input-container>
              <md-icon>speaker_notes</md-icon>
              <label>Password:</label>
              <md-input type="password" v-model="settings.loginPassword"></md-input>
            </md-input-container>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary" @click="loginUser">Login</md-button>
            <md-button class="md-raised md-primary" @click="logoutUser">Logout</md-button>
            <md-button class="md-raised md-primary" @click="isUserLoggedIn">isUserLoggedIn?</md-button>
          </md-card-actions>
        </md-card>
      </md-tab>
    </md-tabs>

    <!-- TODO: IMPROVE THIS TAB -->
    <!-- Footer -->
    <footer class="py-3">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div>Copyright &copy; 2013-2017 Georgi Yanev &amp; Sofia Lindberg</div>
            <div><i class="fa fa-code" aria-hidden="true"></i> with <i class="fa fa-heart" aria-hidden="true"></i> for little Anton.</div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Firebase from 'firebase'
import moment from 'moment'
import toastr from 'toastr'

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

// Set user state based on user logged in
let userIsLoggedIn = null
let userID = null

app.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    userIsLoggedIn = true
    userID = user.uid
    console.log(userID)
  } else {
    // No user is signed in
    userIsLoggedIn = false
  }
})

let giftboxRef = db.ref('users/adeREuCBciMCfVVxKA1N1ZSrNC62/giftbox')
let receivedGiftRef = db.ref('users/adeREuCBciMCfVVxKA1N1ZSrNC62/received_gifts')
// let user2 = db.ref('users/krI0kqz1etdAuyi49jAGUS1SWem2/giftbox')

export default {
  name: 'app',
  firebase: {
    giftbox: giftboxRef,
    gifthistory: receivedGiftRef
    // user2: db.ref(`users/${userID}/giftbox`)
  },
  data () {
    return {
      // Add gift model
      newGift: {
        currentAmount: '',
        name: '',
        need: '',
        note: '',
        picture: '',
        timestamp: '',
        totalPrice: '',
        url: ''
      },
      // Login model
      settings: {
        loginEmail: '',
        loginPassword: ''
      },
      user: {}
    }
  },
  methods: {
    addGift: function () {
      // Add current time to new gift
      this.newGift.timestamp = Date.now()
      giftboxRef.push(this.newGift)
      // Reset form fields
      this.newGift.currentAmount = ''
      this.newGift.name = ''
      this.newGift.need = ''
      this.newGift.note = ''
      this.newGift.picture = ''
      this.newGift.timestamp = ''
      this.newGift.totalPrice = ''
      this.newGift.url = ''
      // Toast notification
      toastr.success('Gift added!')
    },
    // Delete gift from giftbox
    removeGift: function (gift) {
      giftboxRef.child(gift['.key']).remove()
      toastr.success('Gift removed!')
    },
    // Delete from history
    removeGiftFromHistory: function (gift) {
      receivedGiftRef.child(gift['.key']).remove()
      toastr.success('Gift removed from history!')
    },
    receivedGift: function (gift) {
      // Create history item
      let item = {
        currentAmount: gift.currentAmount,
        name: gift.name,
        need: gift.need,
        note: gift.note,
        picture: gift.picture,
        timestamp: gift.timestamp,
        totalPrice: gift.totalPrice,
        url: gift.url
      }
      // Move received gift to history list
      receivedGiftRef.push(item)
      // Delete from giftbox
      giftboxRef.child(gift['.key']).remove()
      toastr.success('Gift marked as received!')
    },
    // Takes in current funded and total price and returns % value of fund status
    calculatePercentFunded: function (current, total) {
      // +0.5 for accurate flooring ;)
      return Math.floor((current / total * 100) + 0.5)
    },
    // Format dates with moment.js
    formatDate: function (ts) {
      return moment(ts).format('Do MMM YYYY')
    },

    // Check the status of the user - logged in or not
    isUserLoggedIn: function () {
      console.log(userIsLoggedIn)
      toastr.info(`User is logged in: ${userIsLoggedIn}`)
      return userIsLoggedIn
    },

    // Logout user
    logoutUser: function () {
      if (userIsLoggedIn) {
        app.auth().signOut()
        toastr.success('Logged out!')
      } else {
        toastr.warning('You are not logged in!')
      }
    },

    // Login user
    loginUser: function () {
      if (!userIsLoggedIn) {
        app.auth().signInWithEmailAndPassword(this.settings.loginEmail, this.settings.loginPassword)
        .then(function () {
          toastr.success('Successfully logged in!')
        })
        .catch(function (error) {
          // Log the user in with email and password
          if (error) {
            toastr.warning(`Wrong email or password!<br>${error}`)
          }
        })
      } else {
        toastr.warning('You are already logged in!')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.md-card {
  margin-bottom: 1.5rem;
  text-align: center;
}

footer {
  text-align: center;
}
</style>
