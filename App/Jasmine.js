/* 
* Author: Krishnan
* Date:   2015-09-19 03:06:29
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-20 08:56:18
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
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var TimerMixin = require('react-timer-mixin');
var Login = require('./Components/Login');
var CardStack = require('./Components/CardStack');

Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");

var Jasmine = React.createClass({
  mixins: [ParseReact.Mixin, TimerMixin],

  getInitialState() {
    return {
      email: '',
      fbID: '',
      loggedIn: false,
      photos: []
    }
  },

  observe(props, state) {
    return {
      user: ParseReact.currentUser,
    }
  },

  componentWillMount() {
  },

  componentDidMount() {
    var _this = this;
    this.setTimeout(() => {AsyncStorage.getItem('@AsyncStorage:Jasmine:loggedIn')
      .then((loginState) => {
          loginState = JSON.parse(loginState);
          _this.setState({loggedIn: loginState.loggedIn});
        })
      .then(() => {
        AsyncStorage.getItem('@AsyncStorage:Jasmine:email')
          .then((res) => {
            email = JSON.parse(res);
            _this.setState({email: res});
          });
        })
      .done();
    }, 500);
  },

  render() {
    if (this.data.user) {
      // Create a graph request asking for friends with a callback to handle the response.
      FBSDKGraphRequestManager.batchRequests([this._fetchFriends(), this._fetchPhotos()], () => {}, 60);
    }
    else {

    }
    return (
      <View style={styles.container}>
        { <Login setUser={this._setUser} setLogout={this._setLogout}/> }
        { this.state.loggedIn &&  <CardStack cards={this._fetchCards()} fbID={this.state.fbID}/> }
      </View>
    );
  }, 

  _initParseUser(email, fbID) {
    if (!this.data.user) {
      var userQuery = (new Parse.Query(Parse.User));
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
            Parse.User.logIn(email, 'password');
          }
        },
        error: function(user, error) {
          alert(error.message);
        }
      });
    }
  },

  _fetchCards() {
    var cards = [];
    Parse.User.current().fetch()
      .then((user) => {
        console.log(user);
        var topFriends = Object.keys(user.get("topFriends"));
        console.log(topFriends);
        for (var i=0; i< topFriends.length; i++) {
          console.log(topFriends[i]);
          var friendQuery = new Parse.Query("User");
          friendQuery.equalTo("fbID", '10153126850212997');
          friendQuery.find({
            success: function(friend) {
              console.log(friend);
              cards.push(friend.get('photo'));
            }
          })
        }
        // friendQuery.containedIn("fbID", topFriends);
        // friendQuery.find({
        //   success: function(friends) {
        //     console.log(friends);
        //     if(friends.length !==0) {
        //       _(friends).foreach((friend) => {
        //         var f = Parse.Query(Parse.User);
        //         f.
        //         cards.push(friend.get('photo'));
        //       });
        //     }
        //   }
        // });
      })
      .done()
    console.log('cards: ' + cards)
    return cards;
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
      } 
      else {
        var topFriends = this._parseFriendList(result);
        Parse.User.current().fetch()
          .then((user) => {
            user.set("topFriends", topFriends);
            user.save();
          })
      }
    }, 'me/friends');
    return fetchCloseFriends;
  },

   _fetchPhotos() {
    var fetchMePhotos = new FBSDKGraphRequest((error, result) => {
      // console.log('fetching photos');
      if (error) {
        alert('3: ' + error.message);
      } else {
        var photo = this._parsePhotos(result);
        var user = Parse.User.current();
        if(user) {
          user.set("photo", photo);
          user.save();
        }
        else {
          var email = this.state.email;
          Parse.User.logIn(email, 'password');
        }
      }
    }, 'me/photos?fields=images');
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
    var image = {};
    var imageSizes = (photos[0]["images"]);
    for(var j=0; j < imageSizes.length; j++) {
      if(imageSizes[j]["height"] < 540 && imageSizes[j]["height"] >= 426) {
        imageSizes[j]["fbID"] = '10153126850212997';
        image = imageSizes[j];
      }
    }
    return image;
  },

  _setLogout() {
    this.setState({loggedIn: false, email: ''});
    Parse.User.logOut();
    AsyncStorage.setItem('@AsyncStorage:Jasmine:email', '');
    AsyncStorage.setItem('@AsyncStorage:Jasmine:loggedIn', JSON.stringify({loggedIn: false}));
  },

  _setUser() {
    var email;
    var fbID;
    var fetchEmail = new FBSDKGraphRequest((error, result) => {
      if(error) {
        alert(error.message);
      } else {
        email = result.email;
        fbID = result.id;
        this.setState({email, fbID});
        AsyncStorage.setItem('@AsyncStorage:Jasmine:email', JSON.stringify(email));
        AsyncStorage.setItem('@AsyncStorage:Jasmine:loggedIn', JSON.stringify({loggedIn: this.state.loggedIn}));
        console.log(fbID);
        this._initParseUser(email, fbID);
      }
    }, 'me?fields=email');
    this.setState({loggedIn: true});
    FBSDKGraphRequestManager.batchRequests([fetchEmail], () => {}, 60);
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  }
});

module.exports = Jasmine;