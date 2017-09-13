import React from 'react';
import ReactDOM from 'react-dom';

var Child = React.createClass({
  render: function() {
    return( <div>
      <h3>{this.props.childName} Here!</h3>
    </div> );
  }
});

var Root = React.createClass({

  getInitialState: function(){
    return {name: this.props.name};
  },

  handleChange: function(event) {
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div>
      <Child childName={this.state.name}/>
        <div>
            <input type="text" value={this.state.name} onChange={this.handleChange} />
        </div>
      <h2>Hello</h2>
      <p>Hello, {this.state.name}!</p>
      </div>
      );
  }
});   

ReactDOM.render(<Root name="Matt"/>,document.querySelector("#container"));