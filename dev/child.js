import React from 'react';
import ReactDOM from 'react-dom';

export const Child = React.createClass({
	getInitialState: function(){
		return {name: this.props.name}
	},

	render: function() {
		return( <div>
			<h3>{this.props.name} Here!</h3>
			</div> );
	}
})