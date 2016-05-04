// ========================================================================================
// DEPENDENCIES
// Various npm packages that we use to give our server useful functionality
//=========================================================================================

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ebay = require('ebay-api');



// =========================================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties of our express server
// =========================================================================================
var app = express();
var PORT = process.env.PORT||3000;

// LISTENER
app.listen(PORT, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// use for downloading files from File Exchange
var url = 'https://bulksell.ebay.com/ws/eBayISAPI.dll?FileExchangeProgrammaticDownload';


//use for reading File Exchange Token
// fs.readFile('filex_token.txt', 'utf8', function(err, data){
// 	if (err) throw err;
// 	console.log('File Exchange Token: ' + data);
// });


//use for displaying query data to the console
// var table = new Table({
// 	head: ['Item ID', 'Title', 'Price'],
// 	colWidths: [15, 80, 10]
// });




app.get('/', function(req, res){
res.sendFile(path.join(__dirname + '/compsearch.html'));
});


app.post('/:name', function(req, res){
	//console.log(req.params.name);
	var params = {
	  keywords: req.params.name,

	  // add additional fields
	  outputSelector: ['AspectHistogram'],

	  paginationInput: {
	    entriesPerPage: 2000
	  },

	  itemFilter: [
	    {name: 'Seller', value: 'ultrarevparts'}
	  ],

	  primaryCategory: [
	    {name: 'categoryName', value: ''}
	  ]
	};
	ebay.xmlRequest({
	    serviceName: 'Finding',
	    opType: 'findItemsByKeywords',
	    appId: 'ShawnSin-eBayPart-PRD-94d8cb72c-3a5252f1',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
	    params: params,
	    parser: ebay.parseResponseJson    // (default)
	  },
	  // gets all the items together in a merged array
	  function itemsCallback(error, itemsResponse) {
	    if (error) throw error;

	    var items = itemsResponse.searchResult.item;
	    var resultArray = [];
	    //console.log(colors.magenta.bold('Found', items.length, 'items'));
	    //console.log(items);
	    
	    for (var i = 0; i < items.length; i++) {
	      resultArray.push(['<a href="http://www.ebay.com/itm/' + items[i].itemId + '"' + ' target="_blank">' + items[i].itemId + '</a>', items[i].title, '$' + items[i].sellingStatus.convertedCurrentPrice.amount.toFixed(2)]);
	      //table.push([items[i].itemId, items[i].title, '$' + items[i].sellingStatus.convertedCurrentPrice.amount.toFixed(2)]);
	      //console.log(items[i].shippingInfo.shippingServiceCost);
	    }
	    //console.log(colors.green(table.toString()));
		res.send(resultArray);
	});
});

app.post('/:name/comp', function(req, res){
	//console.log(req.params.name);
	var params = {
	  keywords: req.params.name,

	  // add additional fields
	  outputSelector: ['SellerInfo'],

	  paginationInput: {
	    entriesPerPage: 200
	  },

	  itemFilter: [
	    {name: 'ExcludeSeller', value: 'ultrarevparts'},
	    {name: 'conditionId', value: 1000}
	  ],

	  primaryCategory: [
	    {name: 'categoryName', value: ''}
	  ]
	};
	ebay.xmlRequest({
	    serviceName: 'Finding',
	    opType: 'findItemsByKeywords',
	    appId: 'ShawnSin-eBayPart-PRD-94d8cb72c-3a5252f1',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
	    params: params,
	    parser: ebay.parseResponseJson    // (default)
	  },
	  // gets all the items together in a merged array
	  function itemsCallback(error, itemsResponse) {
	    if (error) throw error;

	    var items = itemsResponse.searchResult.item;
	    var resultArray = [];
	    //console.log(colors.magenta.bold('Found', items.length, 'items'));
	    //console.log(items);
	    
	    for (var i = 0; i < items.length; i++) {
	      resultArray.push(['<a href="http://www.ebay.com/itm/' + items[i].itemId + '"' + ' target="_blank">' + items[i].sellerInfo.sellerUserName + '</a>', items[i].title, '$' + items[i].sellingStatus.convertedCurrentPrice.amount.toFixed(2)]);
	      //table.push([items[i].itemId, items[i].title, '$' + items[i].sellingStatus.convertedCurrentPrice.amount.toFixed(2)]);
	      //console.log(items[i].shippingInfo.shippingServiceCost);
	    }
	    //console.log(colors.green(table.toString()));
		res.send(resultArray);
	});
	

});

