var littleprinter = { };

littleprinter.handler = undefined;

littleprinter.setup = function(app, handler) {
  littleprinter.handler = handler;

  app.get('/meta.json', littleprinter.meta);
  app.get('/edition', littleprinter.edition);
};

littleprinter.meta = function(req, res) {
  if(!littleprinter.handler || !littleprinter.handler.meta) {
    return res.send(500);
  }

  return res.json(littleprinter.handler.meta);
};

littleprinter.edition = function(req, res) {
  if(!littleprinter.handler) {
    return res.send(500);
  }

  if(!littleprinter.handler.edition) {
    littleprinter.handler.edition = { };
  }

  if(!littleprinter.handler.edition.view) {
    littleprinter.handler.edition.view = 'edition';
  }

  if(!littleprinter.handler.edition.meta) {
    littleprinter.handler.edition.meta = null;
  }

  return res.render(littleprinter.handler.edition.view, littleprinter.handler.edition.meta);
};

module.exports = littleprinter;