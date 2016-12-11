import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBartoXcvlmH1wu6lLuFXcpGEqiSjIoXng',
  authDomain: 'giftbox-40985.firebaseapp.com',
  databaseURL: 'https://giftbox-40985.firebaseio.com',
  storageBucket: 'giftbox-40985.appspot.com',
  messagingSenderId: '907745758023'
}

const fb = firebase.initializeApp(config)
export const db = fb.database()

// create your own (short) function names
export const getRef = function (name) {
  return fb.database().ref(name)
}
