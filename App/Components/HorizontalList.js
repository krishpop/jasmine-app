var React = require('react-native');
var Card = require('./Card');

var {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView
} = React;

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
		console.log(Cards)
		return (
			<View> 
				<ScrollView horizontal={true} directionalLockEnabled={true}>
					{Cards}
				</ScrollView>
			</View>
		)
	}
})

module.exports = HorizontalList