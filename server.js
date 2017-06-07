//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//globals
var port = 2017;

var config = {
  database: 'omega',
  host: 'localhost',
  port: 5432,
  max: 30
};

var pool = new pg.Pool(config);

//spin up server
app.listen(port, function() {
  console.log('server is up on port:', port);
});
//base url
app.get('/', function(req, res) {
  console.log('in base url');
  res.sendFile(path.resolve('views/index.html'));
}); //end base url

//show customers
app.get('/customers', function(req, res) {
  console.log('get list');
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to db');
      var customersList = [];
      var resultSet = connection.query('SELECT * FROM customers');
      resultSet.on('row', function(row) {
        customersList.push(row);
      }); //end resultSet
      resultSet.on('end', function() {
        done();
        res.send(customersList);
      }); //end end resultSet
    }
  }); //done pool get
}); //end get

app.get('/orders/:id', function(req, res) {
  console.log('get list');
  var id = req.params.id;
  pool.connect(function(err, connection, done) {
    if (err) {
      console.log('error');
      done();
      res.send(400);
    } else {
      console.log('connected to db');
      var ordersList = [];
      var resultSet = connection.query('SELECT orders.id, products.description, line_items.unit_price, line_items.quantity '+
        'FROM customers '+
        'JOIN addresses ON customers.id = addresses.customer_id' +
	       ' JOIN orders ON addresses.id = orders.address_id '+
	        'JOIN line_items ON orders.id = line_items.order_id'+
	         ' JOIN products ON line_items.product_id = products.id '+
	          'WHERE customers.id = $1',[id]);
      resultSet.on('row', function(row) {
        ordersList.push(row);
      }); //end resultSet
      resultSet.on('end', function() {
        done();
        res.send(ordersList);
      }); //end end resultSet
    }
  }); //done pool get
}); //end get
