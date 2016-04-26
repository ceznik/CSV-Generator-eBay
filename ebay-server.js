var http = require('http');
var ebay = require('ebay-api');
var fs = require('fs');
var prKeys = require('./pr_keys.js');

console.log(prKeys.applicationKeys_PR.authToken);

var url = 'https://bulksell.ebay.com/ws/eBayISAPI.dll?FileExchangeProgrammaticDownload';

fs.readFile('filex_token.txt', 'utf8', function(err, data){
	if (err) throw err;
	console.log('File Exchange Token: ' + data);
});


