var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

describe('littleprinter', function() {
  describe('icon', function() {
    var res;
    beforeEach(function() {
      littleprinter.handler = sinon.stub();
      res = sinon.stub();
      res.sendfile = sinon.stub();
    });
    it('should default icon if missing', function() {
      littleprinter.icon(null, res);
      assert(res.sendfile.calledOnce);
      assert.equal(res.sendfile.firstCall.args[0], 'icon.png');
    });
    it('should use icon if present', function() {
      littleprinter.handler.icon = 'ICON';
      littleprinter.icon(null, res);
      assert(res.sendfile.calledOnce);
      assert.equal(res.sendfile.firstCall.args[0], 'ICON');
    });
  });
});