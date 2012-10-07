# node-littleprinter
[![Build Status](https://secure.travis-ci.org/roylines/node-littleprinter.png)](http://travis-ci.org/roylines/node-littleprinter)

## Introduction
node-little printer is a node.js module that makes it simple to create a
node.js server that can serve up content for [Little Printers](http://bergcloud.com/littleprinter/).
It simplifies publising content for Little Printer, handling all of the API
routing and etag generation so that you can concentrate on the actual content.

## What are Little Printers?
> Little Printer lives in your home, bringing you news, puzzles and gossip from friends. Use your smartphone to set up subscriptions and Little Printer will gather them together to create a timely, beautiful miniature newspaper.

Take a look at the [BERG](http://bergcloud.com/littleprinter/) documentation for more info.

## Installation and Usage
### Super Simple Example
```
var express = require('express'),
      littleprinter = require('littleprinter');

var app = express();

// in this example I am using ejs, feel free to use a different view engine if you wish
app.set('view engine', 'ejs');

var handler = { };

handler.meta = {
  "owner_email":"a@a.com",
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
```

There is also a more structured [example project](https://github.com/roylines/node-littleprinter-example) that you can fork and play with.

I have also written a [post](http://roylines.co.uk/2012/10/07/publishing-for-little-printer-using-node-and-heroku.html) about hosting a Little Printer server on Heroku if it's useful.

## Unsupported Features
Currently doesn't support validate_config and configure.
