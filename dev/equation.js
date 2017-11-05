import React from 'react';
import ReactDOM from 'react-dom';
import {DrawMolecules} from './DrawMolecules.js';
var createReactClass = require('create-react-class');

export var Equation = createReactClass ({

   render(){
       return(
       <div>
           <DrawMolecules buff1 = {"NH\u2084Cl"} strong = {"None"}/>       	
           <h3>Buffer: {this.props.equation}</h3>
           <h3>{this.props.reaction}</h3>
       </div>
       );
   }
});