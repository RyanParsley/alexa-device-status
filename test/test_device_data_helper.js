/*jshint expr: true*/
'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var deviceDataHelper = require('../device_data_helper');
chai.config.includeStack = true;

describe('deviceDataHelper', function() {
  var subject = new deviceDataHelper();
  var device_name;
  describe('#getDeviceStatus', function() {
    context('with an invalid device name', function() {
      it('returns invalid status', function() {
        device_name = 'NOT_A_THING';
        return expect(subject.requestDeviceStatus(device_name)).to.be.rejectedWith(Error);
      });
    });
  });
});
