var crypto = require('crypto'),
      littleprinter = { };

littleprinter.handler = undefined;

littleprinter.setup = function(app, handler) {
  littleprinter.handler = handler;

  app.use(littleprinter.defaultHandler);
  app.get('/meta.json', littleprinter.meta);
  app.get('/edition', littleprinter.edition);
  app.get('/sample', littleprinter.sample);
  app.get('/icon.png', littleprinter.icon);
};

littleprinter.meta = function(req, res) {
  return res.json(littleprinter.handler.meta);
};

littleprinter.edition = function(req, res) {
  var localDeliveryTime = req.query.local_delivery_time;
  var deliveryCount = req.query.delivery_count;
  var other = req.query;

  littleprinter.handler.edition(localDeliveryTime, deliveryCount, other, function(e, data) {
    if(e) {
      return res.send(500);
    }

    if(!data.view) {
      data.view = 'edition';
    }

    if(!data.meta) {
      data.meta = {
        localDeliveryTime: localDeliveryTime,
        deliveryCount: deliveryCount,
        other: other
      };
    }

    if(!data.etag) {
      data.etag = littleprinter.createEtag(JSON.stringify(data));
    }

    res.set('ETag', data.etag);
    if(req.headers && req.headers['if-none-match'] === data.etag) {
      return res.send(304);
    }

    return res.render(data.view, data.meta);
  });
};

littleprinter.sample = function(req, res) {
  littleprinter.handler.sample(function(e, data) {
    if(e) {
      return res.send(500);
    }

    if(!data.view) {
      data.view = 'sample';
    }

    return res.render(data.view, data.meta);
  });
};

littleprinter.icon = function(req, res) {
  if(!littleprinter.handler.icon) {
    littleprinter.handler.icon = 'icon.png';
  }

  res.sendfile(littleprinter.handler.icon);
};

littleprinter.defaultHandler = function(req, res, next) {
  if(!littleprinter.handler || !littleprinter.handler.meta) {
    return res.send(500);
  }

  if(!littleprinter.handler.edition) {
    littleprinter.handler.edition = function(l, d, o, done) {
      done(null, {});
    };
  }

  if(!littleprinter.handler.sample) {
    littleprinter.handler.sample = function(done) {
      done(null, {});
    };
  }

  next();
};

littleprinter.createEtag = function(s) {
    var hash = crypto.createHash('md5');
    hash.update(s);
    return hash.digest('hex');
};

module.exports = littleprinter;