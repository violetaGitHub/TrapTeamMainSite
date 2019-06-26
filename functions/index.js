const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.TakeDataFromTrap = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
    var TrapHolder = request.body.owner;
    var TrapName = request.body.name;
    admin.database().ref("/Trapholders/" + trapholder + "/Traps/" + trapname + "/Status").set("full");
    response.status(200).send("TrapHolder: " + TraphHolder + ", TrapName: " + TrapName);
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

/* Ezra's code
let TrapSlot;
var x;
var helper = false;
for (x = 1; x <= 10; x++) {
TrapSlot = x;
admin.database().ref('Request/TrapSlot' + TrapSlot +'/').once("value", function(data) {
console.log(TrapSlot)
if (data.val() === "Random") {
var helper = true;
}
});
if (helper === true) {
break;
}
}
console.log('Working. Method: POST');
var RequestBody = request.body;
console.log('Using: ' + TrapSlot)
const promise = admin.database().ref('Request/TrapSlot' + TrapSlot + '/').set(RequestBody);
promise.then(snapshot => {
console.log('Working. Updated DataBase')
response.status(200).send('Working. Payload To DataBase. Slot: ' + TrapSlot);
return "Done!";
})
.catch(error => {
console.error(error)
response.status(500).send('NOT WORKING')
})
*/
