import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Equation = createReactClass ({
   getInitialState(){
       return { equations: null, equation: null, reactions: null, reaction: null }
   },

   componentWillMount(){
       this.setState({equations: this.props.equations});
       this.setState({reactions: this.props.reactions});
       this.setState({equation: this.props.equation});
       this.setState({reaction: this.props.reaction});
   },

   componentWillReceiveProps(nextProps){
       this.setState({equation: nextProps.equation});
       this.setState({reaction: nextProps.reaction});
   },

   render(){
       return(
       <div>
           <h3>Buffer: {this.state.equation}</h3>
           <h3>{this.state.reaction}</h3>
       </div>
       );
   }
});