var littleprinter = { };

littleprinter.handler = undefined;

littleprinter.setup = function(app, handler) {
  littleprinter.handler = handler;

  app.get('/meta.json', littleprinter.meta);
};

littleprinter.meta = function(req, res) {
  if(!littleprinter.handler || !littleprinter.handler.meta) {
    return res.send(500);
  }

  return res.send(littleprinter.handler.meta);
};

module.exports = littleprinter;