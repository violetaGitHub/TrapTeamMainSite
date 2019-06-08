var http = require('http');
const https = require('https');
var url = require('url');
var fs = require('fs');

console.log("Starting Server");

function quitti(arg) {
  console.log(`arg was => ${arg}`);

}
async function myFunc() {
  while (true) {
  http.get('http://trapteamnz.tk/index.html', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log('good,complete');
    });

  }).on("error", (err) => {
      console.log('glitch!');
    console.log("Error: " + err.message);
    setTimeout(quitty, 10, 'funky');  });
  //process.exit();
  }
}
function myFuncy(arg) {
  console.log(`arg was => ${arg}`);

}
async function coo() {
    while (true) {
    myFunc();
}
}
async function initscplus() {
    myFunc();
    coo();
}

initscplus();
