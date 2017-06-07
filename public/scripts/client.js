$(onReady);

function onReady (){
  console.log('JS/JQ is sourced');
  getList();
$('#customer').on('click', 'button', function(){
  var id = $(this).data('id');
  console.log(id);
  getOrders(id);
});



}


function getList(){
  $.ajax({
    type: 'GET',
    url: '/customers',
    success: function(response) {
      console.log('meow', response);
      displayCust(response);
    }
  });
}

function displayCust(response){
  $('#customer').empty();
for (var i = 0; i < response.length; i++) {
  var custDiv = '<div class="customer">';
    custDiv += '<p>';
    custDiv += '<button data-id="' + response[i].id + '">INFO</button>  ';
    custDiv += response[i].first_name + ' ' + response[i].last_name;
    custDiv += '</p>';
    custDiv += '</div>';
    $('#customer').append(custDiv);
}


}
function getOrders(id){
  $.ajax({
    type: 'GET',
    url: '/orders/'+ id,
    success: function(response) {
      console.log('meow', response);
      displayOrders(response);
    }
  });
}

function displayOrders(response){
  $('#myTable').find("tr:gt(0)").remove();
    var itemQuan = [];
    var totalSum = [];

for (var i = 0; i < response.length; i++) {
var itemSum = 0;

var price = response[i].unit_price;
console.log(price);
  var tableRow = '<tr>';
        tableRow += '<td>' + response[i].id + '</td>';
        tableRow += '<td>' + response[i].description + '</td>';
        tableRow += '<td>' + price + '</td>';
        tableRow += '<td>' + response[i].quantity + '</td>';
        itemSum = response[i].unit_price * response[i].quantity;
        totalSum.push(itemSum);
        itemQuan.push(response[i].quantity);
        tableRow += '<td>' + Number(itemSum).toFixed(2) + '</td>';
        tableRow += '</tr>';
    // var etableRow = '<tr id="orderRow">';
    //       etableRow += '<td>';
    //       etableRow += '<td>';
    //       etableRow += '<td>TOTAL:</td>';
    //       etableRow += '<td id>'+ itemQuan1+'</td>';
    //       etableRow += '<td>'+ totalSum2.toFixed(2) +'</td>';
    //       etableRow += '</tr>';
    $('#myTable tr:last').after(tableRow);

}
var itemQuan1 = itemQuan.reduce(function (a, b) {
  return a + b;
}, 0);
var totalSum2 = totalSum.reduce(function (a, b) {
  return a + b;
}, 0);

var ftableRow = '<tr id="lastOne">';
  ftableRow += '<td>';
  ftableRow += '<td>';
  ftableRow += '<td>TOTAL:</td>';
  ftableRow += '<td>'+ itemQuan1+'</td>';
  ftableRow += '<td>'+ totalSum2.toFixed(2) +'</td>';
  ftableRow += '</tr>';
  $('#myTable tr:last').after(ftableRow);
console.log(itemQuan);
console.log(totalSum);

}
