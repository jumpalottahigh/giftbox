//CONSTANTS
var USER_LOGGEDIN = false;

// Initialize Firebase PRODUCTION
// var config = {
//   apiKey: "AIzaSyBartoXcvlmH1wu6lLuFXcpGEqiSjIoXng",
//   authDomain: "giftbox-40985.firebaseapp.com",
//   databaseURL: "https://giftbox-40985.firebaseio.com",
//   storageBucket: "giftbox-40985.appspot.com",
// };

//DEVELOPMENT CONFIG
var config = {
  apiKey: "AIzaSyDJJAuimDWqUJJCrSAUexG95PwoXSuCahw",
  authDomain: "boiling-heat-4669.firebaseapp.com",
  databaseURL: "https://boiling-heat-4669.firebaseio.com",
  storageBucket: "boiling-heat-4669.appspot.com",
};

// FirebaseUI config.
var uiConfig = {
  // Query parameter name for mode.
  'queryParameterForWidgetMode': 'mode',
  // Query parameter name for sign in success url.
  'queryParameterForSignInSuccessUrl': 'signInSuccessUrl',
  //HERE YOU CAN CONFIGURE A REDIRECT URL IF NEEDS BE
  //FOR EXAMPLE: gift-box.html
  'signInSuccessUrl': 'index.html',
  'signInOptions': [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  'tosUrl': 'tos.html',
  'callbacks': {
    'signInSuccess': function(currentUser, credential, redirectUrl) {
      //Let's write starting user data to firebase here
      createUser(currentUser);

      // Do something.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    }
  }
};

//This function get called only in the sign in flow
//TODO refactor this so that new user gets explicitly created only when one doesnt exist
function createUser(data) {
  //Write new user to FB
  DB_ROOT.child('users/' + data.uid).update({
    name: data.displayName,
    email: data.email,
    photoURL: data.photoURL
  });
}

//Init the app
var app = firebase.initializeApp(config);
var DB_ROOT = app.database().ref();
var auth = app.auth();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(auth);
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

//Check if user is logged in
initApp = function() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      user.getToken().then(function(accessToken) {
        document.getElementById('btn-sign-in').textContent = 'Sign out';
      });

      USER_LOGGEDIN = true;
      //Update UI with current user
      var currentUserData = '';
      if (user.photoURL) {
        currentUserData += '<div class="col-xs-12 text-xs-center"><img src="' + user.photoURL + '" title="Current logged in user"></div>';
      }
      currentUserData += '<p class="col-xs-12">Current logged in user: <strong>' + user.displayName + '</strong></p>';
      currentUserData += '<p class="col-xs-12">Email: <strong>' + user.email + '</strong></p>';
      $('#outputCurrentUser').html(currentUserData);


      //TODO
      //Refactor this; for now we test here what access does the current user have
      //All users should only have access at their personal nodes
      DB_ROOT.child('/users/' + uid + '/giftbox').on('value', function(snap) {
        var constructor = '';
        //Loop all gifts
        for (var i in snap.val()) {
          //Loop all gift properties
          constructor += '<div class="col-xs-3"><div class="text-xs-left alert alert-info gift-item">';
          for (var j in snap.val()[i]) {
            constructor += j + ': <strong>' + snap.val()[i][j] + '</strong><br>';
          }
          constructor += '</div></div>';
        }
        $('#outputGiftbox').html(constructor);
      });


    } else {
      // User is signed out.
      document.getElementById('btn-sign-in').textContent = 'Sign in';

      USER_LOGGEDIN = false;
      $('#outputGiftbox').html("");
      $('#outputCurrentUser').html('<div class="col-xs-12">No user is logged in!</div>');
    }

  }, function(error) {
    console.log(error);
  });
};

//Rework this later
//On load init
window.onload = function() {
  initApp();
};

//Click events
$('#btn-sign-in').click(function() {
  if (USER_LOGGEDIN) {
    //Log user out
    auth.signOut();
  } else {
    //Open log in modal
    $('#login-modal').modal();
  }
});
