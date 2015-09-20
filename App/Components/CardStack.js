/* 
* Author: Krishnan
* Date:   2015-09-20 02:06:51
* Last Modified by:   Krishnan
* Last Modified time: 2015-09-20 03:52:00
*/
'use strict';

var React = require('react-native');

var {
  Text,
  StyleSheet,
  View
} = React;

var Swiper = require('react-native-swiper');

var CardStack = React.createClass({
  propTypes: {
    dataSource: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <Card/>
        <Card/>
        <Card/>
      </Swiper>
    )
  }
});

var Card = React.createClass({
  propTypes: {
    // cardData: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {};
  },

  render() {
    return(
      <View style={styles.cardContainer}>
        <View style={styles.cardView}>
          <Text style={styles.text}></Text>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  wrapper: {
  },
  cardContainer: {
    flex: 1,
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardView: {
    flex: 1,
    height: 450,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

module.exports = CardStack;