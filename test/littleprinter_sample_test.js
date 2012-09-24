var assert = require('assert'),
    sinon = require('sinon'),
    littleprinter = require('../lib/littleprinter.js');

// describe('littleprinter', function() {
//   describe('sample', function() {
//     var res;
//     beforeEach(function() {
//       littleprinter.handler = sinon.stub();
//       res = sinon.stub();
//       res.send = sinon.stub();
//       res.render = sinon.stub();
//     });
//     it('should return 500 if no handler defined', function() {
//       littleprinter.handler = undefined;
//       littleprinter.sample(null, res);
//       assert(res.send.withArgs(500).calledOnce);
//     });
//     it('should render defaults if no sample defined', function() {
//       littleprinter.sample(null, res);
//       assert(res.render.withArgs('sample', null).calledOnce);
//     });
//     it('should render defaults if no sample:view defined', function() {
//       littleprinter.handler.sample = { meta: 'META' };
//       littleprinter.sample(null, res);
//       assert(res.render.withArgs('sample', 'META').calledOnce);
//     });
//     it('should render defaults if no sample:meta defined', function() {
//       littleprinter.handler.sample = { view: 'VIEW' };
//       littleprinter.sample(null, res);
//       assert(res.render.withArgs('VIEW', null).calledOnce);
//     });
//     it('should render supplied view if sample defined', function() {
//       littleprinter.handler.sample = { view: 'VIEW', meta: 'META' };
//       littleprinter.sample(null, res);
//       assert(res.render.withArgs('VIEW', 'META').calledOnce);
//     });
//   });
// });