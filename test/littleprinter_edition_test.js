var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('edition', function() {
    var res;
    beforeEach(function() {
      littleprinter.handler = sinon.stub();
      res = sinon.stub();
      res.send = sinon.stub();
      res.render = sinon.stub();
    });
    it('should return 500 if no handler defined', function() {
      littleprinter.handler = undefined;
      littleprinter.edition(null, res);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should render defaults if no edition defined', function() {
      littleprinter.edition(null, res);
      assert(res.render.withArgs('edition', null).calledOnce);
    });
    it('should render defaults if no edition:view defined', function() {
      littleprinter.handler.edition = { meta: 'META' };
      littleprinter.edition(null, res);
      assert(res.render.withArgs('edition', 'META').calledOnce);
    });
    it('should render defaults if no edition:meta defined', function() {
      littleprinter.handler.edition = { view: 'VIEW' };
      littleprinter.edition(null, res);
      assert(res.render.withArgs('VIEW', null).calledOnce);
    });
    it('should render supplied view if edition defined', function() {
      littleprinter.handler.edition = { view: 'VIEW', meta: 'META' };
      littleprinter.edition(null, res);
      assert(res.render.withArgs('VIEW', 'META').calledOnce);
    });
  });
});