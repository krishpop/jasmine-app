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