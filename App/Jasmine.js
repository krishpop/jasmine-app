/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 18:41:37
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

var _ = require('lodash');
var Login = require('./Components/Login');


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
      var fetchCloseFriends = new FBSDKGraphRequest((error, result) => {
                    if (error) {
                      alert(error.message);
                    } else {
                      // Custom friends: 283894981621420
                      this._handleRequest(result);
                    }
                  }, '/me?fields=friends{name}'); // ?fields=name,list_type

      FBSDKGraphRequestManager.batchRequests([fetchCloseFriends], () => {}, 60);
    }
    return (
      <View style={styles.container}>
        { !this.state.loggedIn &&  <Login setUser={this._setUser}/> }
      </View>
    );
  }, 

    _handleRequest(result) {
    var friends = result.data;
    friendIDs = _.pluck(friends, 'id');
    for (friendID in friendIDs) {
      var fetchFriendMessage = new FBSDKGraphRequest((error, result) => {
        if (error) {
          alert(error.message);
        } else {
          console.log(result);
        }
      })
    }
    // _.result(_.find(friendlists, function(list) {
    // }), 'id');
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