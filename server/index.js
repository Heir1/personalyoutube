const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors")
let bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors())

async function main() {
    // await mongoose.connect('mongodb+srv://heritier:0998521480h@cluster0.yf3ehdz.mongodb.net/test');
    await mongoose.connect('mongodb+srv://heritier:0998521480h@cluster0.jccagtw.mongodb.net/?retryWrites=true&w=majority');
    
}

main().catch(err => console.log(err));


// const user = new User({name : 'Héritier'})
// console.log(user.name);

app.set("view engine", "ejs");

// Routes
app.use("/", require('./routes/user'));


app.listen(3001, () => {
    console.log("Running on port 3001");
})