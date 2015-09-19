/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 17:59:42
*/
'use strict';

var React = require('react-native');

var {
  Text,
  StyleSheet,
  View
} = React;

var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKAccessToken,
} = FBSDKCore;

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
                FBSDKAccessToken(result.grantedPermissions)
                alert('Logged in.');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={["email", "user_friends", "user_posts", "user_status", "user_friends", "read_stream"]}
          />
      </View>
    );
  }
});

module.exports = Login;