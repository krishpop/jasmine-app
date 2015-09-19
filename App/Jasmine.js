/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 14:43:21
*/
'use strict';

var React = require('react-native');

var {
  AsyncStorage,
  Text,
  StyleSheet,
  View
} = React;
 
var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKGraphRequest,
  FBSDKGraphRequestManager
} = FBSDKCore;

var Login = require('./Components/Login')
var Card = require('./Components/Card');
var HorizontalList = require('./Components/HorizontalList');


var Jasmine = React.createClass({
  getInitialState() {
    return {
      loggedIn: false,
      photos: []
    }
  },

  _setUser() {
    this.setState({loggedIn: true});
  },

  render() {
    if (this.state.loggedIn) {
      // Create a graph request asking for friends with a callback to handle the response.
      var fetchHomeRequest = new FBSDKGraphRequest((error, result) => {
        if (error) {
          alert(error.message);
        } else {
          console.log(result);
        }
      }, '/me/home');
      FBSDKGraphRequestManager.batchRequests([fetchHomeRequest], function() {}, 60);
    }
    return (
      <View>
        <HorizontalList/>
      </View>
    );
  },

  _handleRequest(error, result) {
    if (!error) {
      var photos = result.data;
      var renderedPhotos = [];
      for (var i = 0, il = photos.length; i < il; i++) {
        var photo = photos[i];
        if (photo.images && photo.images.length > 0) {
          renderedPhotos.push(this._renderPhoto(photo.images[0]));
        }
      }
      this.setState({ photos: renderedPhotos });
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Jasmine;