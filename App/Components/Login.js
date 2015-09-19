/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 14:46:55
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

var FBSDKCore = require('react-native-fbsdkcore');

var {
  FBSDKAccessToken,
} = FBSDKCore;

var FBSDKLogin = require('react-native-fbsdklogin');

var {
  FBSDKLoginButton,
} = FBSDKLogin;

var FBSDKCore = require('react-native-fbsdkcore');
var {
  FBSDKGraphRequest,
} = FBSDKCore;



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
                this.props.setUser();
                FBSDKAccessToken.getCurrentAccessToken((token) => {
                  // console.log(token.tokenString);
                })
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={["email", "user_friends", "user_posts", "user_status", "user_friends"]}
          />
      </View>
    );
  }
});

module.exports = Login;