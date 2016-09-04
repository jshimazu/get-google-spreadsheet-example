var GoogleSpreadsheet = require('google-spreadsheet');

var my_sheet = new GoogleSpreadsheet('1m2R-5rLZiaS86ZQEBn9mynu281M0OrhwYta4qpF_SMs');
 
var creds = require('./secrets.json');

var data;
 
my_sheet.useServiceAccountAuth(creds, function(err){
    my_sheet.getInfo(function(err, sheet_info){
       data = sheet_info;
       getMessage();
    });
})

function getMessage() {
    var _worksheet = data.worksheets[0];
    var _columns = ['id', 'name', 'age'];
    var outputRows = [];
    _worksheet.getRows(function(err, rows) {
        rows.forEach(function(row){
            var _outputRow = {};
            _columns.forEach(function(column){
                if (row[column]) {
                    _outputRow[column] = row[column];
                }
            });
            outputRows.push(_outputRow);
        })
        console.log(outputRows);
    });
}
