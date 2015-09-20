/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-20 01:24:23
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
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var TimerMixin = require('react-timer-mixin');
var Login = require('./Components/Login');

var Jasmine = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      fbID: '',
      loggedIn: false,
      photos: []
    }
  },

  componentWillMount() {
    Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");
  },

  render() {
    if (this.state.loggedIn) {
      // Create a graph request asking for friends with a callback to handle the response.

      FBSDKGraphRequestManager.batchRequests([this._fetchFriends(), this._fetchFeed()], () => {}, 60);
    }
    return (
      <View style={styles.container}>
        { !this.state.loggedIn &&  <Login setUser={this._setUser}/> }
      </View>
    );
  }, 

  _initParseUser(email, fbID) {
    if (this.state.loggedIn && email) {
      var userQuery= (new Parse.Query(Parse.User));
      userQuery.equalTo("email", email);
      userQuery.find({
        success: function (user) {
          if (user.length == 0) {
            var user = new Parse.User();
            user.set('username', email);
            user.set('email', email);
            user.set('password', 'password');
            user.set('fbID', fbID);
            this.setState({fbID});
            user.signUp(null, {
              success: function() {
                console.log('successfully signed up ' + email)
              },
              error: function(user, error) {
                alert(error.message);
              }
            });
          }
          else {
            Parse.User.logIn(email, "");
          }
        },
        error: function(user, error) {
          alert(error.message);
        }
      });
    }
  },

  _fetchFeed() {
    var fetchMeFeed = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('2: ' + error.message);
      } else {
        var feed = result.data; // @kp: data is an array of objects
        var fbID = this.state.fbID;
        var feedObject = new Parse.Object('Feed');
        feedObject.set('fbID', fbID);
        feedObject.set('posts', feed);
        feedObject.save(null, {
          success() {
            console.log(feed);
          },
          error(feedObject, error) {
            alert(error.message);
          }
        });
      }
    }, 'me/feed');
    return fetchMeFeed;
  },

  _fetchFriends() {
    var fetchCloseFriends = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('1: ' + error.message);
      } else {
        var topFriends = this._parseFriendList(result);
        var user = Parse.User.current();
        console.log(user);
        user.set("topFriends", topFriends);
        user.save();
      }
    }, 'me/friends');
    return fetchCloseFriends;
  },

  _fetchPhotos() {
    var fetchMePhotos = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('3: ' + error.message);
      } else {
        this._parsePhotos(result);
      }
    }, 'me/photos');
    return fetchMePhotos;
  },

  _parseFriendList(result) {
    var friends = result.data;
    var friendIDs = _.pluck(friends, 'id');
    var friendNames = _.pluck(friends, 'name');
    var topFriends = _.zipObject(friendIDs, friendNames);
    return topFriends;
  },

  _parsePhotos(result) {
    var photos = result.data;
    console.log(photos);
    var photoIDs = _.pluck(photos, 'id');
  },

  _setUser() {
    this.setState({loggedIn: true});
    var email;
    var fbID;
    var fetchEmail = new FBSDKGraphRequest((error, result) => {
      if(error) {
        alert(error.message);
      } else {
        email = result.email;
        fbID = result.id;
        console.log(fbID);
        this._initParseUser(email, fbID);
      }
    }, 'me?fields=email');
    FBSDKGraphRequestManager.batchRequests([fetchEmail], () => {}, 60);
  },
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