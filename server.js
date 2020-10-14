// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://dbUser:llsLiz12@cluster0.yeato.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null;
client.connect(err => {
  collection = client.db("datatest").collection("scores");
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

//Add
app.post("/add", bodyParser.json(), function(req, res) {
  var num = parseInt(req.body.score)
  let json = { score:num, username:req.body.username }
  console.log("Adding: ", json);
  collection.insertOne(json).then(dbresponse => {
    res.json(dbresponse.ops[0]);
  });
});

//Gets items in list for specific user
app.post("/items", bodyParser.json(), function(req, res){
  console.log("Getting for:", req.body.username)
  var query = {username:req.body.username}
  collection.find(query).sort({'score':-1}).toArray()
    .then(result => res.json(result))
})

//Remove a Score from Server
app.post("/delete", bodyParser.json(), function(req, res) {
  console.log( "Removing: ", req.body )
  collection
    .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
    .then(result => res.json(result));
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
