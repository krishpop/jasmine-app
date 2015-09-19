/**
 * Jasmine: A React Native App
 * https://github.com/krishpop/jasmine-app
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var Jasmine = require('./App/Jasmine')

AppRegistry.registerComponent('Jasmine', () => Jasmine);
