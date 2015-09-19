/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 04:48:45
*/
'use strict';

var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");

var {
  Text,
  StyleSheet,
  View
} = React;

var FBSDKLogin = require('react-native-fbsdklogin');

var {
  FBSDKLoginButton,
} = FBSDKLogin;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
} = FBSDKCore;



var Login = React.createClass({

  parseInit: function () { 
    var user = ParseReact.Mutation.Create('User', {
      userId: '123'
    });

    user.dispatch();
  },

  fetchFriendsRequest: function() {
    var fetchFriends = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('Error making request.');
      } else {
        console.log(result);
      }
    }, '/me/friends');
    fetchFriends.start();
  },
  // Start the graph request.
  render: function() {
    this.parseInit();
    return (
      <View>
        <FBSDKLoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCanceled) {
                alert('Login cancelled.');
              } else {
                fetchFriendsRequest();
                alert('Logged in.');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={["email", "user_friends"]}

          />
      </View>
    );
  }
});

module.exports = Login;