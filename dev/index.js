require('webpack-jquery-ui');
require('webpack-jquery-ui/css');
const React = require('react');
const ReactDOM = require('react-dom');
const Checkbox = require('./checkbox.js').Checkbox;

const Index = React.createClass({

  getInitialState: function(){
    var list = ["HA/NaA", "HF/NaF", "HClO/NaClO", "NH\u2083/NH\u2084Cl"];
    return {buffer: "HA/NaA", buffers: list};
  },

  changeBuffer: function(event){
    this.setState({buffer: event.currentTarget.value});
  },

  render: function() {
    return (
      <div>
        <div>
            <p>Selected: {this.state.buffer}</p>
        </div>
      <div><Checkbox options={this.state.buffers} currentOption={this.state.buffer} onClick={this.changeBuffer}/></div>
      </div>
      );
  }
});

ReactDOM.render(<div><Index /></div>, document.getElementById("container"))