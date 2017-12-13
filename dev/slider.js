const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import Slider from "rc-slider";

export var SlideBar = createReactClass({
  getInitialState: function(){
    return { min: null, max: null, step: null, amount: null, temp: null}
  },
  
  componentWillMount(){
  	this.setState({min: this.props.min})
  	this.setState({max: this.props.max})
  	this.setState({step: this.props.step})
  	this.setState({amount: this.props.amount})
    this.setState({temp: this.props.amount})
  },

  componentWillReceiveProps(nextProps) {
  	this.setState({amount: nextProps.amount})
  },

  disableOnNone(){
    var disabled = this.props.buffer=='None' ? true : false;
    return disabled;
  },

  storeTemp(value){
    this.setState({temp: value})
  },

  render(){
    var min = this.state.min;
    var max = this.state.max;
    var step = this.state.step;
    var amount = this.state.amount;
    var disabled = this.state.disabled;
   return (
    <div>
      <div><Slider min={min} max={max} step={step} onChange={this.storeTemp} 
      onAfterChange={this.props.onChange} value={amount} disabled={this.disableOnNone()}/></div>
	    <span>{this.props.buffer} </span>
	      <input className='slider' disabled="true" type="number" value={this.state.temp} onChange={this.overwriteAmount}/>
	    <span> mL</span>  
    </div>    
    );
 }
});