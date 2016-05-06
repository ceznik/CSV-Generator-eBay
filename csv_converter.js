var csvParser = require('csv-parse');
var fs = require('fs');
var filePath = './data/ebay_csv.csv';
var Table = require('cli-table');
var csvArray = [];




fs.readFile(filePath, {
  encoding: 'ascii'
}, function(err, csvData) {
  if (err) {
    console.log(err);
  }
  else{
    csvParser(csvData, {
      delimiter: ','
    }, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        for (i=0; i<1; i++){
          console.log(data[i].length);
          //console.log(data[1]);
        }
      }
    });
  }
});