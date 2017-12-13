const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import Slider from "rc-slider";

export var SlideBar = createReactClass({
  getInitialState: function(){
    return { min: null, max: null, step: null, amount: null, temp: ''}
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
    this.setState({temp: nextProps.amount})
  },

  disableOnNone(){
    var disabled = this.props.buffer=='None' ? true : false;
    return disabled;
  },

  validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
    if( regex.test(key) || evt.keyCode == 8) {
      if (evt.keyCode === 8){
        console.log("Backspace")
        let temp = this.state.temp;
        if (temp.toString().length<=1)
          temp = ''
        else 
          temp = parseInt(temp.toString().slice(0, -1));
        this.storeTemp(temp)
      }     
    else {
      let temp = this.state.temp;
      temp = temp.toString().concat(key)
      this.storeTemp(parseInt(temp))
    }
  } else {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) 
      theEvent.preventDefault();
  }
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
	      <input className='slider' type="text" value={this.state.temp} onBlur={this.props.onChange} onKeyUp={this.validate} min={0} max={1000}/>
	    <span> mL</span>  
    </div>    
    );
 }
});