// Instantiate the GoTrue auth client with an optional configuration

auth = new GoTrue({
  APIUrl: "https://trapteam-cc.netlify.com/.netlify/identity",
  setCookie: true
});
function loggy() {
    try {
        
firebase.auth().createUserWithEmailAndPassword(auth.currentUser().email, auth.currentUser().token.access_token).catch(function(error) {
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