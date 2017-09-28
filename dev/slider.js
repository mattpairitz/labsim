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

  overwriteAmount: function(event){
    this.setState({amount: event.currentTarget.value})
  },

  render: function(){
    var min = this.state.min;
    var max = this.state.max;
    var step = this.state.step;
    var amount = this.state.amount;
   return (
    <div>
      <div><Slider min={min} max={max} step={step}
       onChange={this.props.onChange} value={amount}/></div>
	    <span>{this.props.buffer} </span>
	      <input className='slider' type="number" value={amount} onChange={this.overwriteAmount}/>
	    <span> mL</span>  
    </div>    
    );
 }
});