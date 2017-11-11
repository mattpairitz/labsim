import React from 'react';
import ReactDOM from 'react-dom';
import {DrawMolecules} from './DrawMolecules.js';
var createReactClass = require('create-react-class');

export var Equation = createReactClass ({

  getInitialState() {
       return {buff1: null, strong: null}
    },

    componentWillMount() {
        var buffer = this.props.buffer;
        var [buff1, buff2] = buffer.split(" ");
        var strong = this.props.strong;
        this.updateState(buff1, strong);
    },

    componentWillReceiveProps(nextProps) {
        var buffer = nextProps.buffer;
        var [buff1, buff2] = buffer.split(" ");
        var strong = nextProps.strong;
        this.updateState(buff1, strong);
    },

    /******* UPDATE BUFFER SELECTION *********/
    updateState(buff1, strong){
        this.setState({buff1: buff1})
        this.setState({strong: strong})    
    },

   render(){
       return(
       <div>
           <DrawMolecules buff1={this.state.buff1} canvas={1}/>
           <h3>Buffer: {this.props.equation}</h3>
           <DrawMolecules buff1={this.state.buff1} strong={this.state.strong} canvas={2}/>
           <h3>{this.props.reaction}</h3>
       </div>
       );
   }
});