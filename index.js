const express = require('express'),
      morgan = require('morgan'),
      pug = require('pug'),
      fs = require('fs'),
      bodyParser = require('body-parser');

var app = express(),
    userStore = JSON.parse(fs.readFileSync('users.json'));

    function findUser(input) {
      for (var i = 0; i < userStore.length; i++) {
        if (userStore[i].firstname || userStore[i].lastame === userStore[i].firstname || userStore[i].lastame) {
          return userStore[i];
        }
      }
    }

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', { users: userStore });
});

app.get('/search', (request, response) => {
  response.render('search');
});

app.post('/search', (request, response) => {
  console.log(request.body);
  response.redirect('/search/' + request.body.query);
});

// app.get('/search/', (request, response) => {
//   console.log(request.params[0]);
//   reponse.send('search a user with the query: ' + request.params[0]);
// });

app.get('/search/*', function(req, res) {
  var foundUser = findUser(req.params[0]);
  console.log(foundUser);
  res.send(pug.renderFile('views/search-result.pug', { user: foundUser }));
});


app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});





// var fs = require('fs');
// var express = require('express');
// var pug = require('pug');
// var morgan =require('morgan');
// var app = express();
//
//
//
//
//
//
// var DataPeoplesMemory = JSON.parse(fs.readFileSync("users.json"));
//
// // function findPeople(slug) {
// //   for (var i = 0; i < DataPeoplesMemory.length; i++) {
// //     if (DataPeoplesMemory[i].slug === slug) {
// //       return DataPeoplesMemory[i];
// //     }
// //   }
// // }
//
// app.use(morgan('dev'));
//
// app.set('view engine', 'pug');
//
//
// app.get('/', function(request, response) {
//   responge.render('index', { peoples: dataPeoplesMemory });
// });
//
// // app.get('/peoples', function(req, res) {
// //    console.log('Requesting /peoples');
// //    res.send(pug.renderFile('/views/index.pug', { peoples: dataPeoplesMemory }));
// // });
//
// // app.get('/peoples/*', function(req, res) {
// //   var foundPeople = findPeople(req.params[0]);
// //   console.log(foundPoeple);
// //   res.send(pug.renderFile('views/people.pug', { people: foundPeople }));
// // });
//
//
//
// app.listen(3001, function() {
//   console.log('Web server is now running on port 3001');
// });
