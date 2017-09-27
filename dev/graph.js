const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
import {BarChart} from "d3plus-react";

export var Graph = createReactClass({
  getInitialState: function(){
    return { config: this.props.config}
  },

  componentWillMount(){

  },

  componentWillReceiveProps( nextProps ) {

  },

  render: function(){  
   var data = this.state.config;          
   return (<div><BarChart config={{data}} /></div>);
 }
});

// <div id="viz"></div>