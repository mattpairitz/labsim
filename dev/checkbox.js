import React from 'react';
import ReactDOM from 'react-dom';

export const Checkbox = React.createClass({
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