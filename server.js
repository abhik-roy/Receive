// [WEBSERVER FILE]

// Define custom package imports
const express = require('express');
const bodyParser = require('body-parser');
// Database import from the database folder
const database = require('./database/database.js');

// Port we are running the server on. Can be any free port.
const port = 4000;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Create the ExpressJS object
var app = express();

app.use(bodyParser.json()); // for parsing application/json requests

// Give everyone access to our static directory 'public'
app.use(express.static(__dirname + '/public'));

// Whenever a client connects (and thus calling a GET request) to 'localhost:4000/', we will route them to index.html.
app.get('/', function (req, res) {
        res.sendFile('./public/index.html');
});

// Handle POST request for login
// => req is the object for the requesting party (the client-side information)
// => res is the response object we are sending back to the client.
/*
app.post('/login', function (req, res) {
        // req.body is now a loaded JSON structure, and **should** contain variables 'email' and 'password'
        // => We can verify whether this is the case later.... TODO

        console.log("[WEBSERVER]\tIP address (" + req.connection.remoteAddress +
                ") tried to login with email (" + req.body.email +
                ") and password (" + req.body.password + ").")

        // Generic success message sent back to the client (its enforced that we have to send a response)
        res.send("Generic success!");
});*/

app.listen(port, () => {
        console.log(`[WEBSERVER]\tServer active on port ${port}`);
});


const errorempty = "Fields can't be empty";
const emptyerror = {"login":false, errorempty};
const badinput = {"login":false, "error": "bad input"};
//==================SIGN UP REQUESTS
// Adds a customer to the database
app.post('/customer-signup', (req, res) => {
  console.log(`customer-signup`);
  try{
    if(req.body.email.length == 0 || req.body.password.length == 0){
      res.json(emptyerror);
      return;
    }
    database.addcustomer(req.body.email, req.body.password, null, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});
app.post('/business-signup', (req, res) => {
  console.log('business-signup');
  try{
    if(req.body.email.length == 0 || req.body.password.length == 0 ||
        req.body.name.length == 0){
      res.json(emptyerror);
      return;
    }
    database.addbusiness(req.body.email, req.body.password, req.body.name, null, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});
app.post('/store-signup', (req, res)=>{
  console.log('store-signup');
  const body = req.body;
  try{
    if(body.busername.length == 0 || body.bpassword.length == 0 ||
        body.susername.length == 0 || body.spassword.length == 0){
      res.json(emptyerror);
      return;
    }
    database.addstore(body.busername, body.bpassword, body.susername,
        body.spassword, body.street, body.city, body.state, body.zipcode, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});

//==================LOGIN REQUESTS
app.post('/customer-login', (req, res) => {
  //json: {'email':'', 'password': ''}
  console.log(`/customer-login`);
  try{
    if(req.body.email.length == 0 || req.body.password.length == 0){
      res.json(emptyerror);
      return;
    }
    database.getallreceipts(req.body.email, req.body.password, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});
app.post('/business-login', (req, res) => {
  console.log(`/business-login`);
  try{
    //json: {'email':'', 'password': ''}
    if(req.body.email.length == 0 || req.body.password.length == 0){
      res.json(emptyerror);
      return;
    }
    database.getstores(req.body.email, req.body.password, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});
app.post('/store-login', (req, res) => {
  console.log(`/store-login`);
  try{
    //json: {'email':'', 'password': ''}
    if(req.body.email.length == 0 || req.body.password.length == 0){
      res.json(emptyerror);
      return;
    }
    database.getsid(req.body.email, req.body.password, res);
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});

//====================Add receipts
app.post('/store-add-receipt', (req, res)=>{
  console.log('store-add-receipt');
//susername,spasswordhash,cid,date,tax,subtotal,other,items,res
  const body = req.body;
  try{
    if(body.username.length == 0 || body.passwordhash == 0){
      res.json({"login":false, "error": errorempty});
      return;
    }
    if(body.cid <= 0 || typeof(body.cid) != 'number' || body.sid <= 0 || typeof(body.sid) !=
        'number' || typeof(body.date) != 'number'){
      res.json(badinput);
      return;
    }
    database.storeaddreceipt(
        body.username,
        body.password,
        body.cid,
        body.date,
        body.tax,
        body.subtotal,
        body.other,
        body.items,
        res
        ); 
  } catch(err){
    console.log(err);
    res.json(badinput);
  }

});
app.post('/customer-add-receipt', (req, res)=>{
  console.log('customer-add-receipt');
  const body=req.body;

  try{
    if(body.username.length == 0 || body.password.length == 0){
      res.json({"login":false, "error":errorempty});
      return;
    }
    if(typeof(body.date) != 'number' || body.date <= 0 ||
        typeof(body.tax) != 'number' || body.tax < 0 ||
        typeof(body.subtotal) != 'number' || body.subtotal < 0){
      res.json(badinput);
      return;
    }
    database.customeraddreceipt(
      body.username,
      body.password,
      body.date,
      body.tax,
      body.subtotal,
      body.other,
      body.items,
      res
    );
  } catch(err){
    console.log(err);
    res.json(badinput);
  }
});

//=====================Get individual receipts
app.post('/business-get-item', (req, res)=>{
    try{
      if(req.body.username.length == 0 || req.body.password == 0 ||
          !req.body.rid){
        res.json({"login":false, "error":errorempty});
        return;
      }
      if(typeof(req.body.rid) != 'number'){
        res.json(badinput);
        return;
      }
      database.getbusinessitem(req.body.usermame, req.body.password, req.body.rid,
          res);

    } catch(err){
      console.log(err);
      res.json(badinput);
    }


});
app.post('/store-get-item', (req, res)=>{
    try{
      if(req.body.username.length == 0 || req.body.password == 0 ||
          !req.body.rid){
        res.json({"login":false, "error":errorempty});
        return;
      }
      if(typeof(req.body.rid) != 'number'){
        res.json(badinput);
        return;
      }
      database.getstoreitem(req.body.usermame, req.body.password, req.body.rid,
          res);

    } catch(err){
      console.log(err);
      res.json(badinput);
    }

});

//maybe get names starting with ____
//then get stats on item with that name

/*
// Example use of the database:
//database.resettables();
console.log('start db stuff');
//database.printTable();

var reset = 0
if(reset == 1){
  database.resettables();
  database.createtables();
  return;
}
//database.adduser("user1", "code1", 1234);


database.getallreceipts("u3", "c3");
return;

//const util = require('util');
*/
//database.test();

//var fs = require('fs');
//https://www.w3schools.com/nodejs/nodejs_filesystem.asp
//write my outputs to file

// Rahul test cases here
//
if(1==0){
  var username;
  var password;
  /*
  username = "sdcdc";
  password = "sdcscscsd";

  // We will handle console.log
  database.addUser(username, password)
  console.log("Expected \"success\"  res");

  //we should ensure we cannot have a null username -- not sure if this is a valid test case but
  //wanted to be sure
  username = null
  password = "a;kdflk"
  database.addUser(username,password)
  console.log("Expected failure res")
  */

  //adding customer to database
  var customerusername = "Rahul";
  var customerpassword = "ARM3453";
  database.addcustomer(customerusername,customerpassword);
  sleep(5000);
  //get username -- here username will be Rahul
  database.getcid(customerusername,customerpassword);
  console.log("Expected \"success\"  res");

  //should fail -- no username found in database
  username = "dflk39";
  database.getcid(username,password);
  console.log("Expected failure res");

  //adding business
  var businessName = "Target";
  var businesspassword = "expect more pay less";
  database.addbusiness(businessName,businesspassword, businessName);
  console.log("Expected \"success\"  res");
  sleep(5000);
  //adding store
  var storename = "Lootable";
  //type = "S"
  var storepassword = "lootMe";
  var street = "riotStreet";
  var city = "Minneapolis";
  var state = "MN";
  var zipcode = "12345";
  database.addstore(businessName,businesspassword,storename,storepassword,street,
      city, state, zipcode);
  console.log("Expected \"success\"  res");

  sleep(5000);
  //adding store name with same business name should fail
  database.addstore(businessName,businesspassword,storename,storepassword,street,
      city, state, zipcode);
  console.log("Expected \"failure\"  res");
  /*
  //adding a store with another store with same address should fail
  storeId = "aflkjs"
  address = "earth"
  database.addstore(businessName,storeId,password,address,type)
  console.log("Expected \"failure\"  res")
  */
}

