const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

exports.FillTrap = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    var TrapHolder = req.body.owner;
    var TrapName = req.body.name;
    admin.database().ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status").set("Full");
    console.log("Filled " + TrapHolder + "'s Trap.");
    res.status(200).send("Filled " + TrapHolder + "'s Trap.");
  } else {
    console.error('Not POST: ' + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
  }
});

exports.EmptyTrap = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    var TrapHolder = req.body.owner;
    var TrapName = req.body.name;
    admin.database().ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status").set("Empty");
    console.log("Emptyed " + TrapHolder + "'s Trap.");
    res.status(200).send("Emptyed " + TrapHolder + "'s Trap.");
  } else {
    console.error('Not POST: ' + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
  }
});

exports.addAccount = functions.auth.user().onCreate((user) => {
  if (user.email === null) {
    user.email = user.phoneNumber
  }
  
  const email = user.email; // The email of the user.
  const id = user.uid;
  const displayName = user.displayName; // The display name of the user.
  admin.database().ref("/Trapholders/" + id + "/traps/name").set("test");
  return admin.database().ref("/Trapholders/" + id + "/email").set(email);
  
});
