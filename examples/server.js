var express = require('express'),
    littleprinter = require('../lib/littleprinter.js');

var app = express();

var handler = { };

handler.meta = {
  "owner_email":"roy@roylines.co.uk",
  "publication_api_version":"1.0",
  "name": "Hello, World!",
  "description": "Example publication for Little Printer",
  "delivered_on":"every day",
  "external_configuration": false,
  "send_timezone_info": false,
  "send_delivery_count": false
  };

littleprinter.setup(app, handler);

app.listen(3000);