const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import Slider from "rc-slider";

export var SlideBar = createReactClass({
  getInitialState: function(){
    return { min: null, max: null, step: null, amount: null}
  },
  
  componentWillMount: function(){
  	this.setState({min: this.props.min})
  	this.setState({max: this.props.max})
  	this.setState({step: this.props.step})
  	this.setState({amount: this.props.amount})
  },

  componentWillReceiveProps: function(nextProps) {
  	this.setState({amount: nextProps.amount})
  },

  render: function(){
   return (
    <div>
      <div><Slider min={this.state.min} max={this.state.max} step={this.state.step}
       onChange={this.props.onChange} defaultValue={this.state.amount}/></div>
	    <span>{this.props.buffer} </span>
	      <input className='slider' type="number" value={this.state.amount}/>
	    <span> mL</span>  
    </div>    
    );
 }
});