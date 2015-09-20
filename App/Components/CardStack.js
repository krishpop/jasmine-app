/* 
* Author: Krishnan
* Date:   2015-09-20 02:06:51
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-20 05:56:27
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

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <Card cardData={this._renderData()}/>
        <Card cardData={this._renderData()}/>
        <Card cardData={this._renderData()}/>
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
  propTypes: {
    cardData: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {};
  },

  render() {
    var profilePic = "http://graph.facebook.com/" + "10153126850212997" + "/picture?type=square";
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