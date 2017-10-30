const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var ControlPanel = createReactClass({
  getInitialState(){
    return {  }
  },

  render(){
  let viewControl = this.props.viewControl;
   return (
    <div>
       <button id='graph' value={viewControl['graph']} onClick={this.props.onClick}>Graph</button>
       <button id='beaker' value={viewControl['beaker']} onClick={this.props.onClick}>Beaker/Equation</button>
       <button id='anim' value={viewControl['anim']} onClick={this.props.onClick}>Animation</button>
    </div>    
    );
 }
});