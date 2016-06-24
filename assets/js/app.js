//CONSTANTS
var USER_LOGGEDIN = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBartoXcvlmH1wu6lLuFXcpGEqiSjIoXng",
  authDomain: "giftbox-40985.firebaseapp.com",
  databaseURL: "https://giftbox-40985.firebaseio.com",
  storageBucket: "giftbox-40985.appspot.com",
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
  'tosUrl': '<your-tos-url>',
  'callbacks': {
    'signInSuccess': function(currentUser, credential, redirectUrl) {
      // Do something.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    }
  }
};

//Init the app
var app = firebase.initializeApp(config);
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
        document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
        document.getElementById('btn-sign-in').textContent = 'Sign out';
        document.getElementById('quickstart-account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
      USER_LOGGEDIN = true;
    } else {
      // User is signed out.
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('btn-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';

      USER_LOGGEDIN = false;
    }
  }, function(error) {
    console.log(error);
  });
};


//Log in the user

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
