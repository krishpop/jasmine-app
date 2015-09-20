var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Dimensions = require('Dimensions');
var Button = require('react-native-button');
Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");

var {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  PanResponder
} = React;

var {
  width
} = Dimensions.get('window');
var windowSize = Dimensions.get('window');

var styles = StyleSheet.create({
    card: {
   		 borderWidth: 3,
   		 borderRadius: 3,
   		 borderColor: '#000',
   		 width: width,
   		 height: 300,
		 marginTop: 200,
   		 padding: 10,
   		 marginRight: 10,
   		 borderRadius: 10
 	},
 	button: {
 		borderColor: '#123',
 	}

});

var Card = React.createClass({ 
	pushToParse: function () { 
	    var user = ParseReact.Mutation.Create('User', {
	      userId: '1738'
	    });

	    user.dispatch();
  	},
	getInitialState: function() {
	    return {
	      y: 400,
	    }
	},
	resetPosition: function(e) {
		console.log('reseting')
	    this.setState({
	      y: 0
	    })
	 },
	setPosition: function(e) {
		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~setting position!!!!!!!!!!!!!!!!!!!!!!!!')
    	this.setState({
			y: this.state.y + (e.nativeEvent.pageY + this.drag.y)
    	});
    	this.drag.y = e.nativeEvent.pageY;
	},
	_onStartShouldSetResponder: function(e) {
		console.log('!!!!!!!!!!!!!')
		this.dragging = true;
 		this.drag = {
 			y: e.nativeEvent.pageY
 		}
		console.log(this.drag)
 		return true;
 	},
 	componentWillMount: function() {
 		this._panGesture = PanResponder.create({
 			 onPanResponderTerminationRequest: function () { return false }
 		})
 	},
	render: function() {
		return (
			<View onResponderMove={this.setPosition}
            		onResponderRelease={this.resetPosition}
					onMoveShouldSetResponder={this._onStartShouldSetResponder}
					style={styles.card}>
					<Text>{this.props.text}</Text>
				    <Text>{this.props.user}</Text>
				    <Button style={[styles.button,  {color: 'green'}]} onPress={this._handlePress}>
				        Like!
				      </Button>
				      <Button style={[styles.button, {color: 'red'}]} onPress={this._handlePress}>
				        Ignore
				      </Button>
			</View>
		)
	}
});

module.exports = Card;