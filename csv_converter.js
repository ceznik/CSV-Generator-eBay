var csvParser = require('csv-parse');
var fs = require('fs');
var filePath = './data/ebay_csv.csv';
var Table = require('cli-table');
var csvArray = [];

var table = new Table({
  head: ['id', 'manufacturer', 'part_number', 'title'],
  colWidths: [15, 20, 20, 50]
});


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
        var columns = data[0].length;
        for (i=1; i<data.length; i++){
          table.push([data[i][0], data[i][2], data[i][5], data[i][6]]);
        }
      }
      console.log(table.toString());
    });
  }
});