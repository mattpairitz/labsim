import React from 'react';
import ReactDOM from 'react-dom';
let Child = require('./child.js').Child;

var Index = React.createClass({

  getInitialState: function(){
    return {name: this.props.name};
  },

  handleChange: function(event) {
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div>
        <div><Child name={this.state.name}/></div>
        <div>
            <input type="text" value={this.state.name} onChange={this.handleChange} />
        </div>
      <h2>Hello</h2>
      <p>Hello, {this.state.name}!</p>
      </div>
      );
  }
});

ReactDOM.render(<div><Index name="Matt"/></div>, document.getElementById("container"))