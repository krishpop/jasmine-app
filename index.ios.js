/**
 * Jasmine: A React Native App
 * https://github.com/krishpop/jasmine-app
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var {
  AppRegistry,
} = React;

var Jasmine = require('./App/Jasmine')

Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");

AppRegistry.registerComponent('Jasmine', () => Jasmine);
