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
  // Initialize Firebase
firebase.auth().onAuthStateChanged(
    function(user) {
      if (user) {
        // User is signed in.
        displayName = user.displayName;
        email = user.email;
        emailVerified = user.emailVerified;
        photoURL = user.photoURL;
        uid = user.uid;
        phoneNumber = user.phoneNumber;
        providerData = user.providerData;
        document.getElementById("uuid").innerHTML = uid;
        if (firebase.auth().currentUser.emailVerified) {
          console.log("account is fine");
        } else {
          console.log(
            "You Email is Not Verified. Click OK to send an email to you so you can get verified."
          );
          user
            .sendEmailVerification()
            .then(function() {
              // Email sent.
            })
            .catch(function(error) {
              // An error occured.
            });
        }
        analytics.identify(user.uid, {
          name: displayName,
          email: user.email
        });
        analytics.identify(user.uid, {
          name: displayName,
          email: user.email
        });        user.getIdToken().then(function(accessToken) {
          document.getElementById("sign-in-status").textContent = "Signed in";
          document.getElementById("sign-in").textContent = "Sign out";
          document.getElementById(
            "account-details"
          ).textContent = JSON.stringify(
            {
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              phoneNumber: phoneNumber,
              photoURL: photoURL,
              uid: uid,
              accessToken: accessToken,
              providerData: providerData
            },
            null,
            "  "
          );
          console.log(
            JSON.stringify(
              {
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              },
              null,
              "  "
            )
          );
        });
      } else {
        document.location.href = "/authneeded.html";
      }
    },
    function(error) {
      console.log(error);
    }
  );
  let urcount = 0;
async function useri() {
  urcount++
   console.log(urcount);

  //App.initializeApp(firebaseConfig);
    var starCountRef = firebase.database().ref('Trapholders/' + document.getElementById("uuid").innerHTML);
    let outputs = [];
    starCountRef.on('value', function(snapshot) {
        var trapz = snapshot.val().Traps;
        for (const key in trapz) {
            console.warn(key);
            if (trapz[key].Status == "Empty") {outputs.push(key);};
            console.log(outputs);
        }
        console.error(trapz);
        console.log(outputs);
        if (outputs.length > 0) {
        console.log("YAY");
        document.getElementById("page-major-secion").innerHTML = "";
        let compiledHTML;
        for (const key of outputs) {
        compiledHTML = document.getElementById("page-major-secion").innerHTML + document.getElementById("prototype").innerHTML.replace("TrapName",key);
        document.getElementById("page-major-secion").innerHTML = compiledHTML;
        }
        } else {
          if (urcount < 20) {
            useri();
           console.log("FUNCTION REPEATED");
          }
          console.log("MCCI");
        } 
        console.log(document.getElementById("uuid").innerHTML);
    });
}
async function usery() {
  useri();
  setTimeout(function() {
    useri();
  }, 10000);
}
    window.addEventListener("load", usery);
