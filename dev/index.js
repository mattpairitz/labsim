import React from 'react';
import ReactDOM from 'react-dom';

var HelloWorld = React.createClass({
  getInitialState: function(){
    return {name: "Student"};
  },

  handleChange: function(event) {
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </div>
      <h2>Hello</h2>
      <p>Hello, {this.state.name}!</p>
      </div>
      );
  }
});   