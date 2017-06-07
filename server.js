//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//globals
var port = 2017;

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url
