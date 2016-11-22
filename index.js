'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('deviceinfo');
var deviceDataHelper = require('./device_data_helper');

app.launch(function(req, res) {
  var prompt = 'For device information, tell me an alias.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('listDevices', {
  'utterances': ['What devices do I have']
},
  function(req, res) {
    var deviceHelper = new deviceDataHelper();
    var reprompt = 'Tell me an device nickname to get information about it.';
    deviceHelper.getDevices().then(function(devices) {
      var names = devices.body.map(function(item) {
        return item.name;
      }).join(', ');
      res.say(names).send();
    }).catch(function(err) {
      console.log(err.statusCode);
      var prompt = 'I am not able to list your devices at this time. ';
        //https://github.com/matt-kruse/alexa-app/blob/master/index.js#L171
      res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
    });
    return false;
  }
);

app.intent('deviceInfo', {
  'slots': {
    'STATUS': 'STATUS',
    'DEVICE': 'DEVICE_LIST'
  },
  'utterances': ['about {|type} {|status} {-|DEVICE}']
},
  function(req, res) {
    //get the slot
    var device = req.slot('DEVICE');
    var reprompt = 'Tell me an device nickname to get information about it.';

    if (_.isEmpty(device)) {
      var prompt = 'I didn\'t hear a device that I know. Tell me a device name.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
      var deviceHelper = new deviceDataHelper();
      deviceHelper.requestDeviceStatus(device).then(function(device) {
        res.say(deviceHelper.formatDeviceStatus(device)).send();
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'I didn\'t have data for a device called ' + device;
         //https://github.com/matt-kruse/alexa-app/blob/master/index.js#L171
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
    }
  }
);
//hack to support custom utterances in utterance expansion string
console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;
