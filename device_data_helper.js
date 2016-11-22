'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = '';

function deviceDataHelper() {
}

deviceDataHelper.prototype.requestDeviceStatus = function(device) {
  return this.getDeviceStatus(device).then(
    function(response) {
      console.log('success - received device info for ' + device);
      return response.body;
    }
  );
};

deviceDataHelper.prototype.getDeviceStatus = function(device) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + device,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

deviceDataHelper.prototype.formatDeviceStatus = function(device) {
    return _.template('${name} is ${status}')({
      name: device.name,
      status: device.status
    });
  }
};

module.exports = deviceDataHelper;
