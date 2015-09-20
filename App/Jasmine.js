/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-19 21:48:38
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
  mixins: [ParseReact.Mixin, TimerMixin],
  getInitialState() {
    return {
      loggedIn: false,
      photos: []
    }
  },

  // observe(props, state) {
  //   var userQuery= (new Parse.Query('User')).ascending('price');
  //   return state.loggedIn ?  { listings: listingQuery } : null;
  // },

  componentWillMount() {
    Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");
  },

  _setUser() {
    this.setState({loggedIn: true});
  },

  _fetchFriends() {
    var fetchCloseFriends = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('1: ' + error.message);
      } else {
        this._parseFriendList(result);
      }
    }, 'me/friends');
    return fetchCloseFriends;
  },

  _fetchFeed() {
    var fetchMeFeed = new FBSDKGraphRequest((error, result) => {
      if (error) {
        alert('2: ' + error.message);
      } else {
        this._parseFeed(result);
      }
    }, 'me/feed');
    return fetchMeFeed;
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

  render() {
    if (this.state.loggedIn) {
      // Create a graph request asking for friends with a callback to handle the response.
      

      FBSDKGraphRequestManager.batchRequests([this._fetchFriends()], () => {}, 60);
    }
    return (
      <View style={styles.container}>
        { !this.state.loggedIn &&  <Login setUser={this._setUser}/> }
      </View>
    );
  }, 

  _parseFriendList(result) {
    var friends = result.data;
    console.log(friends);
    var friendIDs = _.pluck(friends, 'id');
    for (var friendID in friendIDs) {
      // console.log(friendID);
    }
  },

  _parseFeed(result) {
    var feed = result.data;
    console.log(feed);
    var feedIDs = _.pluck(feed, 'id');
    for (var feedID in feedIDs) {
      // console.log(feedID);
    }
  },

  _parsePhotos(result) {
    var photos = result.data;
    console.log(photos);
    var photoIDs = _.pluck(photos, 'id');
    for (var photoID in photoIDs) {
      // console.log(photoID);
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