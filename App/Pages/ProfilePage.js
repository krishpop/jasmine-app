/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 04:48:45
*/
'use strict';

var React = require('react-native');

var {
  Text,
  StyleSheet,
  View
} = React;

var FBSDKLogin = require('react-native-fbsdklogin');

var {
  FBSDKLoginButton,
} = FBSDKLogin;


var Login = React.createClass({
  render: function() {
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