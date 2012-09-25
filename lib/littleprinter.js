var littleprinter = { };

littleprinter.handler = undefined;

littleprinter.setup = function(app, handler) {
  littleprinter.handler = handler;

  app.use(littleprinter.defaultHandler);
  app.get('/meta.json', littleprinter.meta);
  app.get('/edition', littleprinter.edition);
};

littleprinter.meta = function(req, res) {
  return res.json(littleprinter.handler.meta);
};

littleprinter.edition = function(req, res) {
  littleprinter.handler.edition(req.query.local_delivery_time, req.query.delivery_count, req.query, function(e, data) {
    if(e) {
      return res.send(500);
    }

    return res.render(data.view, data.meta);
  });
};

littleprinter.defaultHandler = function(req, res, next) {
  if(!littleprinter.handler || !littleprinter.handler.meta) {
    return res.send(500);
  }

  if(!littleprinter.handler.edition) {
    littleprinter.handler.edition = littleprinter.defaultEdition;
  }

  next();
};

littleprinter.defaultEdition = function(localDeliveryTime, deliveryCount, other, done) {
  var data =  {
    "view": "edition",
    "meta": {
      localDeliveryTime: localDeliveryTime,
      deliveryCount: deliveryCount,
      other: other
    }
  };

  return done(null, data);
};

module.exports = littleprinter;