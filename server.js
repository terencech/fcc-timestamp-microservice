// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  res.json({
    unix: Date.now(),
    utc: new Date(Date.now()).toUTCString()
  })
});

app.get("/api/:date", function (req, res) {
  let date = undefined;
  if (req.params.date.match(/^\d+$/)) {
    date = new Date(Number.parseInt(req.params.date))
  }
  else if (Date.parse(req.params.date)) {
    date = new Date(req.params.date)
  }

  if (date) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  } else {
    res.json({
      error: "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
