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
      req = { query: { local_delivery_time: 'LDT', delivery_count: 'DC' } };
    });
    it('should call edition once', function() {
      littleprinter.handler.edition.yields(null, { });
      littleprinter.edition(req, res);
      assert(littleprinter.handler.edition.withArgs('LDT', 'DC', req.query).calledOnce);
    });
    it('should return 500 if handler errors', function() {
      littleprinter.handler.edition.yields('ERROR');
      littleprinter.edition(req , res);
      assert(res.send.withArgs(500).calledOnce);
    });
    it('should default view if missing', function() {
      littleprinter.handler.edition.yields(null, { });
      littleprinter.edition(req, res);
      assert(res.render.calledOnce);
      assert.equal(res.render.firstCall.args[0], 'edition');
    });
    it('should use view if present', function() {
      littleprinter.handler.edition.yields(null, { view: 'VIEW' });
      littleprinter.edition(req, res);
      assert(res.render.calledOnce);
      assert.equal(res.render.firstCall.args[0], 'VIEW');
    });
    it('should default meta if missing', function() {
      littleprinter.handler.edition.yields(null, { });
      littleprinter.edition(req, res);
      assert(res.render.calledOnce);
      assert.deepEqual(res.render.firstCall.args[1], {"localDeliveryTime":"LDT","deliveryCount":"DC","other":{"local_delivery_time":"LDT","delivery_count":"DC"}});
    });
    it('should use meta if present', function() {
      littleprinter.handler.edition.yields(null, { meta: 'META' });
      littleprinter.edition(req, res);
      assert(res.render.calledOnce);
      assert.equal(res.render.firstCall.args[1], 'META');
    });
  });
});