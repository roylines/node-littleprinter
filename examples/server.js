var express = require('express'),
      littleprinter = require('littleprinter');

var app = express();

// in this example I am using ejs, feel free to use a different view engine if you wish
app.set('view engine', 'ejs');

var handler = { };

handler.meta = {
  "owner_email":"roy@roylines.co.uk",
  "publication_api_version":"1.0",
  "name": "Hello, World!",
  "description": "Example publication for Little Printer",
  "delivered_on":"every day",
  "external_configuration": false,
  "send_timezone_info": true,
  "send_delivery_count": true
};

littleprinter.setup(app, handler);
console.log('Server started on: http://localhost:3000');
app.listen(3000);