var fs = require('fs');
var express = require('express');
var pug = require('pug');
var app = express();

var DataPeopleMemory = JSON.parse(fs.readfileSync("user.json").toString())["people"];














app.listen(3001, function() {
  console.log('Web server is now running on port 3001');
});
