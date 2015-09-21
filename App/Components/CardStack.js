/* 
* Author: Krishnan
* Date:   2015-09-20 02:06:51
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-21 13:26:27
*/
'use strict';

var React = require('react-native');

var {
  Image,
  Text,
  StyleSheet,
  View
} = React;

var Swiper = require('react-native-swiper');

var CardStack = React.createClass({
  propTypes: {
    dataSource: React.PropTypes.object.isRequired,
    fbID: React.PropTypes.string.isRequired
  },

  _renderData() {
    return ({ friendName: 'Krishpop' });
  },

  render() {
    var image = "https://fbcdn-photos-c-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-0/p480x480/12004053_938699566169054_1348251934629670171_n.jpg?oh=7edacbdb7be89c642917d39337f37bd6&oe=569D88F0&__gda__=1453056192_348d78943078b3bc9eece1f44f855835"
    var pp = "http://graph.facebook.com/" + "10206492640987706" + "/picture?type=square";
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <Card cardData={this._renderData()} img={image} pp={pp}/>
        <Card cardData={this._renderData()} img={image} pp={pp}/>
        <Card cardData={this._renderData()} img={image} pp={pp}/>
      </Swiper>
    )
  }
});

var Card = React.createClass({
  propTypes: {
    cardData: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {};
  },

  render() {
    var profilePic = this.props.pp;
    var image = this.props.img;
    return(
      <View style={styles.cardContainer}>
        <View style={styles.cardView}>
          <View style={styles.cardHeader}>
            <Image source={{uri: profilePic}}
              style={styles.profilePic}></Image>
            <Text style={styles.title}>{this.props.cardData.friendName}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={{width: 200, height: 300, topMargin: 20}}>
              <Image source={{uri: image}}
              style={styles.photo}></Image>
            </View>
              <Text style={{marginBottom: 30, fontFamily: 'Avenir Book'}}>Rotaract Club at Dwight Hall</Text>
          </View>
        </View>
      </View>
    )
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
  photo: {
    height: 250,
    width: 200,
    alignSelf: 'center', 

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