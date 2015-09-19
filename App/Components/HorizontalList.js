var React = require('react-native');
var Card = require('./Card');
var Dimensions = require('Dimensions');

var {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView
} = React;

var {
  height
} = Dimensions.get('window');

var styles = StyleSheet.create({
    container: {
   		 height: height,
   		 padding: 0, 
 	}
});

var HorizontalList = React.createClass({ 
	getInitialState: function () { 
		console.log('here')
		return { data : 
			[
				{ 
					text: 'ayy',
					user: 'faiq'
				},
				{
					text: 'lmao', 
					user: 'chrisxwan'
				}
			]
		}
	},
	render: function() {
		var Cards = this.state.data.map(function (post, index) {
			console.log('card')
			return <Card user={post.user} text={post.text} key={index}/>
		})
		return (
			<View style={styles.container}> 
				<ScrollView horizontal={true} directionalLockEnabled={true}>
					{Cards}
				</ScrollView>
			</View>
		)
	}
})

module.exports = HorizontalList