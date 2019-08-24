
var functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require("serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trapteam-cc.firebaseio.com"
  // databaseURL: "https://localhost:9000"
});

var db = admin.database()

// Toggles state of trap specified
exports.ToggleTrap = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    console.error("Not POST: " + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
    return;
  }
  var TrapHolder = req.body.owner;
  var TrapName = req.body.name;
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
    .once("value", snapshot => {
      var Value = snapshot.val();
      if (Value == "Full") {
        admin
          .database()
          .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
          .set("Empty");
        console.log("Emptyed " + TrapHolder + "'s Trap.");
        res.status(200).send("Emptyed " + TrapHolder + "'s Trap.");
      } else if (Value === "Empty") {
        admin
          .database()
          .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
          .set("Full");
        console.log("Filled " + TrapHolder + "'s Trap.");
        res.status(200).send("Filled " + TrapHolder + "'s Trap.");
      } else {
        res.status(400).send("You mucked up!!!");
      }
    });
});

// Set the trap specified to full
exports.FillTrap = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    console.error("Not POST: " + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
  }
  var TrapHolder = req.body.owner;
  var TrapName = req.body.name;
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
    .set("Full");
  console.log("Filled " + TrapHolder + "'s Trap.");
  res.status(200).send("Filled " + TrapHolder + "'s Trap.");
});

// Set the trap specified to empty
exports.EmptyTrap = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    console.error("Not POST: " + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
    return;
  }
  var TrapHolder = req.body.owner;
  var TrapName = req.body.name;
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
    .set("Empty");
  console.log("Emptyed " + TrapHolder + "'s Trap.");
  res.status(200).send("Emptyed " + TrapHolder + "'s Trap.");
});


// Gets the trap specified's trap number
exports.GetTrapNumber = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    console.error("Not GET: " + req.method);
    res.status(405).send("Error, Must send with GET not: " + req.method);
    return;
  }
  var TrapHolder = req.body.owner;
  var TrapName = req.body.name;
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/ID")
    .once("value", snapshot => {
      var Value = snapshot.val();
      res
        .status(200)
        .send(
          TrapName +
          " is owned by " +
          TrapHolder +
          " and has Trap Number of " +
          value
        );
    });
});

/**
 * Adds a trap to the database
 */
exports.AddTrap = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ reason: "Method Not Allowed" }) 
    return
  }

  // make variables to make it easy on ourselves
  let trapID = req.body.number
  let trapName = req.body.name
  let trapHolder = req.body.TrapHolder
  let trapStatus = 'Empty'

  // create Firebase db references
  let userReference = db.ref(`Trapholders/${trapHolder}/Traps/${trapID}`)
  let trapReference = db.ref(`Traps/${trapID}`)

  // set the user and trap references
  userReference.set({
    ID: trapID,
    Status: trapStatus
  }, error => {
    if (error) console.error("q1: " + error)
    else       console.log("query 1 synced")
  })
  trapReference.set({
    Name: trapName,
    Owner: trapHolder
  }, error => {
    if (error) console.error("q2: " + error)
    else       console.log("query 2 synced")
  })
    
  res.status(200).contentType('json').send(JSON.stringify({
    trap: {
      id: trapID,
      name: trapName,
      owner: trapHolder,
      status: trapStatus
    },
    dbRef: {
      user: String(userReference.path),
      trap: String(trapReference.path)
    }
  }, undefined, 2));
});

// No idea, Stevie told me to keep it
exports.addAccount = functions.auth.user().onCreate(user => {
  if (user.email === null) {
    user.email = user.phoneNumber;
  }

  const email = user.email; // The email of the user.

  const displayName = user.displayName; // The display name of the user.
  return admin
    .database()
    .ref("/Trapholders/" + id + "/email")
    .set(email);
});

exports.dbTest = functions.https.onRequest((req, res) => {
  db.ref('/').once('value', (value => {
    res.send(JSON.stringify(value, undefined, 2))
  }))
})
