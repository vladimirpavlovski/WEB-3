var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");
var nameSchema = new mongoose.Schema({
    firstname: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    cardname: String,
    cardnumber: Number,
    expmonth: String,
    expyear: Number,
    cvv: Number


});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Вашите податоци се зачувани");
        })
        .catch(err => {
            res.status(400).send("Вашите податоци НЕ се зачувани");
        });
});


   

app.listen(port, () => {
    console.log("Server listening on port " + port);
});