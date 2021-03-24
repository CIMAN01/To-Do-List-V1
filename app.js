// index.js

// let and const have local scope within a block {} (if/else/for/while etc.)
// so var should be avoided as much as possible as it has global scope;
// var/let/const all have local scope within a function, however 

// create an items array and initialize with the first 3 list items 
let items = ["Buy Food", "Cook Food", "Eat Food"]; // can also use const
// empty work item array
let workItems = []; // Javscript allows for use of  const in this case 
// create a listening port
const port = 3000;

// require (import) local date module 
const date = require(__dirname + "/date.js")
// require https
const https = require("https");
// require express module
const express = require("express");
// path
const { dirname } = require("path");

// create an application that uses express
const app = express();


// parse the URL-encoded body of a POST request
app.use(express.urlencoded({extended: true})); 
// give express app (server) access to local static files (css/images) 
app.use(express.static("public")); // public is name of the static folder

// view engine setup (assumes a views folder with an index.ejs file)
app.set("view engine", "ejs");


// a GET request for home route (first time homepage is loaded app.get() gets called)
app.get("/", function(req, res) { // any re-directs will also trigger app.get()
    // retrieve the current day from the date module's function
    const day = date.getDate(); // call the function getDate (date.js)
    // create a response by rendering a template file called list (.ejs file in views 
    // folder) and pass in objects that contains a key-value pair
    res.render("list", { 
        listTitle: day,
        newListItems: items
    });
});


// GET request for work route
app.get("/work", function(req, res) {
    // create a response by rendering list file
    res.render("list", { 
        listTitle: "Work List", 
        newListItems: workItems})
});


// POST request - receives the data from the post request
app.post("/", function(req, res) {
    // grabs and stores 'newItem' from the body of the post request (html)
    const item = req.body.newItem;
    // if a request comes from the work list (work route)
    if (req.body.list === "Work") { // "Work List" <-> listTitle <-> <%= EJS %>
         // add the item to the array in the work list instead
        workItems.push(item);
        res.redirect("/work"); // redirect to work route 
    }
    // if the request comes from the date list (home route)
    else {
        items.push(item); // add item to the array in the date list 
        res.redirect("/"); // redirect to home route 
    } 
});


// (Heroku dynamic port || local static port)
app.listen(process.env.PORT || port, function() {
    console.log("Server is running on port 3000")
});
