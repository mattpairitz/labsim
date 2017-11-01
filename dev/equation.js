import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Equation = createReactClass ({

   render(){
       return(
       <div>
           <h3>Buffer: {this.props.equation}</h3>
           <h3>{this.props.reaction}</h3>
       </div>
       );
   }
});