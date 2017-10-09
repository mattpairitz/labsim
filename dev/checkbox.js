const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var Checkbox = createReactClass({
  getInitialState: function(){
    return { options: this.props.buffers, currentOption: this.props.currentOption}
  },

  componentWillMount(){

  },

  render: function(){
   var acidPicker = this.props.options.map(function(option, index){
   let [left, right] = option.split(" ");
     return (
      <div className="input-row" key={index}>
      <input id={this.props.id} type="radio" name={option}
      checked={this.props.currentOption === option} 
      onChange={this.props.onClick}/>
      <label htmlFor={'radio-'+index}> 0.10M {left} + 0.10M {right} </label>
      </div>
      );
   }, this);
   return (
    <div>
      <div ref="buffer-select"></div>
      <div data-role="fieldcontain">
      <fieldset>
          {acidPicker}
      </fieldset>
      </div>   
    </div>    
    );
 }
});