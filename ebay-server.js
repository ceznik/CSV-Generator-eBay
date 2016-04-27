// ========================================================================================
// DEPENDENCIES
// Various npm packages that we use to give our server useful functionality
//=========================================================================================

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var colors = require('colors');
var ebay = require('ebay-api');
var fs = require('fs');
var Table = require('cli-table');
var prKeys = require('./pr_keys.js');


// =========================================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties of our express server
// =========================================================================================
var app = express();
var PORT = process.env.PORT || 8080;

// LISTENER
app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT);
});



// use for downloading files from File Exchange
var url = 'https://bulksell.ebay.com/ws/eBayISAPI.dll?FileExchangeProgrammaticDownload';


//use for reading File Exchange Token
// fs.readFile('filex_token.txt', 'utf8', function(err, data){
// 	if (err) throw err;
// 	console.log('File Exchange Token: ' + data);
// });


// use for displaying query data to the console
// var table = new Table({
// 	head: ['Ebay Item ID', 'Title', 'Price'],
// 	colWidths: [15, 80, 10]
// });



var params = {
  keywords: process.argv[3],

  // add additional fields
  outputSelector: ['AspectHistogram'],

  paginationInput: {
    entriesPerPage: 20
  },

  itemFilter: [
    {name: 'Seller', value: 'ultrarevparts'}
  ],

  primaryCategory: [
    {name: 'categoryName', value: process.argv[2]}
  ]
};
app.use(function(req, res){
	res.sendFile(path.join(__dirname + '/compsearch.html'));
});


app.post('/', function(req, res){
	console.log(req.body);
})
ebay.xmlRequest({
    serviceName: 'Finding',
    opType: 'findItemsByKeywords',
    appId: prKeys.applicationKeys_PR.authToken,      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
    params: params,
    parser: ebay.parseResponseJson    // (default)
  },
  // gets all the items together in a merged array
  function itemsCallback(error, itemsResponse) {
    if (error) throw error;

    var items = itemsResponse.searchResult.item;

    console.log(colors.magenta.bold('Found', items.length, 'items'));
    //console.log(items);
    
    for (var i = 0; i < items.length; i++) {
      //table.push([items[i].itemId, items[i].title, '$' + items[i].sellingStatus.convertedCurrentPrice.amount.toFixed(2)]);
      //console.log(items[i].shippingInfo.shippingServiceCost);
    }
    //console.log(colors.green(table.toString()));
  }
);
