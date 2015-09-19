/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 14:24:55
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
} = FBSDKCore;

var Login = require('./Pages/ProfilePage')


var Jasmine = React.createClass({
  getInitialState() {
    return {
      loggedIn: false
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
          alert('Error making request.');
        } else {
          console.log(result);
        }
      }, '/me/home');
      fetchHomeRequest.start();
    }
    return (
      <View style={styles.container}>
        { !this.state.loggedIn &&  <Login setUser={this._setUser}/> }
      </View>
    );
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