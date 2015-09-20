/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 21:48:16
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
  FBSDKAccessToken,
} = FBSDKCore;

var FBSDKLogin = require('react-native-fbsdklogin');

var {
  FBSDKLoginButton,
} = FBSDKLogin;


var Login = React.createClass({

  render() {
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
                this.props.setUser();
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  console.log(token.tokenString);
                });
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={["email", "user_posts", "user_status", "user_friends", "user_photos", "read_custom_friendlists"]}
          />
      </View>
    );
  }
});

module.exports = Login;