var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('edition', function() {
    var res;
    var req;
    beforeEach(function() {
      littleprinter.handler = sinon.stub();
      littleprinter.handler.edition = sinon.stub();
      res = sinon.stub();
      res.send = sinon.stub();
      res.render = sinon.stub();
    });
    it('should call edition once', function() {
      littleprinter.handler.edition.yields(null, { });
      var req = {
        query: {
          local_delivery_time: 'LDT',
          delivery_count: 'DC'
        }
      };

      littleprinter.edition(req, res);
      assert(littleprinter.handler.edition.withArgs('LDT', 'DC', req.query).calledOnce);
    });

    it('should render correct view if edition yields ok', function() {
      littleprinter.handler.edition.yields(null, { view: 'VIEW', meta: 'META' });
      var req = {
        query: {}
      };

      littleprinter.edition(req, res);
      assert(res.render.withArgs('VIEW', 'META').calledOnce);
    });
  });
});