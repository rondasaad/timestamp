var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

function parseTimeUrl(date_url){
  var unix = null;
  var natural = null;
  
  // test if url is a number
  if(/^\d+$/.test(date_url))
    date_url = Number(date_url) * 1000;
  
  var date = new Date(date_url);
  
  // if the date is valid
  if (!isNaN(date.getTime()))
  {
    var day = date.getUTCDate();
    var month = ["January", "February", "March", "April", "May", 
                "June", "July", "August", "September",
                "October", "November", "December"][date.getUTCMonth()];
    var year = date.getUTCFullYear();
    
    unix = Math.floor(date.getTime()/ 1000);
    natural = month + ' ' + day + ', ' + year;
  }
  
  return {
    unix: unix,
    natural: natural
  };
}

app.get('/', function (req, res) {
  res.sendFile('index.html'); // a modifier
});

app.get('/:date', function (req, res) {
  var result = parseTimeUrl(req.params.date);
  
  res.writeHead(200,{'Content-Type': 'application/json'});
  res.end(JSON.stringify(result));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('The application starting on https://'+process.env.C9_HOSTNAME+':'+process.env.PORT);
});