// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBHB7H6L2TgZeDJKS4ENC_fkdWtS_99T_E",
    authDomain: "trapteam-cc.firebaseapp.com",
    databaseURL: "https://trapteam-cc.firebaseio.com",
    projectId: "trapteam-cc",
    storageBucket: "trapteam-cc.appspot.com",
    messagingSenderId: "150993996289",
    appId: "1:150993996289:web:9a6a477accc058af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Instantiate the GoTrue auth client with an optional configuration

auth = new GoTrue({
  APIUrl: "https://trapteam-cc.netlify.com/.netlify/identity",
  setCookie: true
});
function loggy() {
    try {
        
firebase.auth().createUserWithEmailAndPassword(auth.currentUser().email, auth.currentUser().created_at).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
firebase.auth().signInWithEmailAndPassword(auth.currentUser().email, auth.currentUser().created_at).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

    } catch (error) {
        console.log(error);
            console.log(auth.currentUser());
    }
}
setInterval(loggy, 900);
console.log('HELLO THERE!');