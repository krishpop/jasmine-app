var React = require('react-native');
var Parse = require('parse/react-native');
var ParseReact = require('parse-react/react-native');
var Dimensions = require('Dimensions');
Parse.initialize("EvI5rKmppTeSEgJPxGQkIRV8Me5clIcwcZBwES8Z", "QOw8Kuma6j7dqo19mJOwvTbwDrp8D2g7zwS3P18k");

var {
  Text,
  StyleSheet,
  View,
  TouchableHighlight
} = React;

var {
  width
} = Dimensions.get('window');

var styles = StyleSheet.create({
    card: {
   		 borderWidth: 3,
   		 borderRadius: 3,
   		 borderColor: '#000',
   		 width: width,
   		 height: 300,
   		 padding: 10
 	},
});

var Card = React.createClass({ 
	pushToParse: function () { 
	    var user = ParseReact.Mutation.Create('User', {
	      userId: '1738'
	    });

	    user.dispatch();
  	},
	setPosition: function(e) {
    	this.setState({
    	  x: this.state.x + (e.nativeEvent.pageX - this.drag.x),
    	  y: this.state.y + (e.nativeEvent.pageY - this.drag.y)
    	});
    	this.drag.x = e.nativeEvent.pageX;
    	this.drag.y = e.nativeEvent.pageY;
	},
	_onStartShouldSetResponder: function(e) {
		this.dragging = true;
 		this.drag = {
 			y: e.nativeEvent.pageY
 		}
 		   return true;
 	},
	render: function() {
		return (
			<View>
				<Text> Push to Parse </Text>
				<TouchableHighlight 
					onPress={this.pushToParse} 
					style={styles.card} 
					onResponderMove={this.setPosition}
            		onResponderRelease={this.}
            		onStartShouldSetResponder={this._onStartShouldSetResponder}>
					<View>
						<Text>{this.props.text}</Text>
						<Text>{this.props.user}</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
});

module.exports = Card;