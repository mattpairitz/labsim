const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var Checkbox = createReactClass({
  getInitialState: function(){
    return { options: this.props.buffers, currentOption: this.props.currentOption}
  },

  render: function(){
   var acidPicker = this.props.options.map(function(listValue, index){
     return (
      <div className="input-row" key={index}>
      <input id={this.props.id} type="radio" name={listValue} 
      checked={this.props.currentOption === listValue} 
      onChange={this.props.onClick}/>
      <label htmlFor={'radio-'+index}> {listValue} </label>
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