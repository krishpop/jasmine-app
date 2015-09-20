/* 
* Author: Krishnan
* Date:   2015-09-20 02:06:51
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-20 06:18:54
*/
'use strict';

var React = require('react-native');

var {
  Image,
  Text,
  StyleSheet,
  View
} = React;

var Parse = require('parse').Parse;
var Swiper = require('react-native-swiper');

var CardStack = React.createClass({
  render() {
    var _this = this;
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        {
          _this.props.cards.map((card) => {
            return ( <Card cardData={card}/> );
          })
        }
      </Swiper>
    )
  },

  _renderData() {
    return {
      friendName: 'Christopher Wan'
    }
  }
});

var Card = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    var profilePic = "http://graph.facebook.com/" + this.props.cardData.fbID + "/picture?type=square";
    var name = this._getName(cardData, this.props.fbID)

    return(
      <View style={styles.cardContainer}>
        <View style={styles.cardView}>
          <View style={styles.cardHeader}>
            <Image source={{uri: profilePic}}
              style={styles.profilePic}></Image>
            <Text style={styles.title}>{this.props.cardData.friendName}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={{width: 200, height: 300, backgroundColor: 'white'}}>
            </View>
          </View>
        </View>
      </View>
    )
  },

  _getName(cardData, fbID) {
    var targetID = cardData.fbID;
    var userQuery = new Parse.Query(Parse.User);
    var name = '';
    userQuery.equalTo('fbID', targetID);
    userQuery.find({
      success: function(user) {
        if (user) {
          var name = user.get('username');
        }
      },
      error: function(user, error) {
        alert(error.message)
      }
    });
    return name;
  }
});

var styles = StyleSheet.create({
  wrapper: {
  },
  baseText: {
    fontFamily: 'Avenir Book',
  },
  cardContainer: {
    flex: 1,
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeader: {
    alignItems: 'center',
  },
  cardView: {
    flex: 1,
    flexDirection: 'column',
    height: 450,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    borderRadius: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5
  },
  title: {
    fontFamily: 'Avenir Book',
    color: '#202020',
    fontSize: 24,
    fontWeight: 'bold',
  }
});

module.exports = CardStack;