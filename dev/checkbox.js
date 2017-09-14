const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var Checkbox = createReactClass({
        getInitialState: function(){
            return { options: this.props.buffers, currentOption: this.props.currentOption}
        },

        componentDidMount: function(){
        	$(".acid-picker").controlgroup( {
              direction: "vertical"
            } ); 
        },

        render: function(){
           var acidPicker = this.props.options.map(function(listValue, index){
               return (<div key={index}>
                   <input type="radio" name="acid" 
                                       value={listValue} 
                                       checked={this.props.currentOption === listValue} 
                                       onChange={this.props.onClick}/>{listValue}
                   </div>
               );
           }, this);
           return (
               <fieldset>
                <legend>Select a buffer: </legend>
                    {acidPicker}
               </fieldset>        
           );
      }
    });