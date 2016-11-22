'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://mysterious-mountain-45455.herokuapp.com/devices/';

function deviceDataHelper() {
}

deviceDataHelper.prototype.requestDeviceStatus = function(device) {
  return this.getDeviceStatus(device).then(
    function(response) {
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

deviceDataHelper.prototype.getDevices = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
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
};

module.exports = deviceDataHelper;
