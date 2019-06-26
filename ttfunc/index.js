const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()

exports.TakeDataFromTrap = functions.https.onRequest((request, response) => {
  if (request.method === "POST") {
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
  } else {
    console.error('Not POST: ' + request.method)
    response.status(501).send("Error, Must send with POST not: " + request.method);
  }
});
exports.TestForValues = functions.https.onRequest((request, response) => {
  let TrapSlot;
  var helper = false;
  var value;
  var x;
  for (x = 1; x <= 10; x++) {
    const promise = admin.database().ref('Request/TrapSlot' + x +'/').once("value")
    promise.then(snapshot => {
      value = snapshot.val();
      return value;
    })
    .catch(error => {
      console.error('Hey: ' + error);
    });
    if (helper === true) {
      console.log('Found: ' + x)
      break;
    } else {
      console.log(x + ': ' + value)
    }
  }
  response.send(x + ': ' + value)
});
