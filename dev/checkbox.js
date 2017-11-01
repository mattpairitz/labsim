const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var Checkbox = createReactClass({

  render: function(){
   var Picker = this.props.options.map(function(option, index){
   let [left, right] = option.split(" ");
   let label = null;
   if(this.props.id==="strong"){
        label = <label htmlFor={'radio-'+index}> {left}</label>
      } else {
        label = <label htmlFor={'radio-'+index}> 0.10M {left} + 0.10M {right} </label>
      }
     return (
      <div className="input-row" key={index}>
      <input id={this.props.id} type="radio" name={option}
      checked={this.props.currentOption === option} 
      onChange={this.props.onClick}/>
      {label}
      </div>
      );
   }, this);
   return (
    <div>
      <div ref="buffer-select"></div>
      <div data-role="fieldcontain">
      <fieldset>
          {Picker}
      </fieldset>
      </div>   
    </div>    
    );
 }
});