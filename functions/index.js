const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.FillTrap = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    var TrapHolder = request.body.owner;
    var TrapName = request.body.name;
    admin.database().ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status").set("Full");
    console.log("Filled " + TrapHolder + "'s Trap.");
    response.status(200).send("Filled " + TrapHolder + "'s Trap.");
  } else {
    console.error('Not POST: ' + request.method);
    response.status(405).send("Error, Must send with POST not: " + request.method);
  }
});

exports.EmptyTrap = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    var TrapHolder = request.body.owner;
    var TrapName = request.body.name;
    admin.database().ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status").set("Empty");
    console.log("Emptyed " + TrapHolder + "'s Trap.");
    response.status(200).send("Emptyed " + TrapHolder + "'s Trap.");
  } else {
    console.error('Not POST: ' + request.method);
    response.status(405).send("Error, Must send with POST not: " + request.method);
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
