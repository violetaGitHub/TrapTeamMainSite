var functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trapteam-cc.firebaseio.com"
});


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
    console.error("Not POST: " + req.method);
    res.status(405).send("Error, Must send with POST not: " + req.method);
	return;
  }
  var TrapNumber = req.body.number;
  var TrapName = req.body.name;
  var TrapHolder = req.body.TrapHolder;
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/Status")
    .set("Empty");
  admin
    .database()
    .ref("/Trapholders/" + TrapHolder + "/Traps/" + TrapName + "/ID")
    .set(TrapNumber);
  res.status(200).send("Working, Completed NewTrap Operation.");
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
