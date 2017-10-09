const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
import {BarChart} from "d3plus-react";

export var Graph = createReactClass({

  getInitialState(){
    return { volume1: this.props.volume1, volume2: this.props.volume2, 
             buffer: this.props.buffer, config: []}
  },

  componentWillMount(){
    let volume1 = this.state.volume1;
    let volume2 = this.state.volume2;
    let buffer = this.state.buffer;
    let [b_left, b_right] = buffer.split(" ");
    this.makeGraphConfig(b_left, b_right, volume1, volume2);
  },

  shouldComponentUpdate(nextProps){
    let volume1 = nextProps.volume1;
    let volume2 = nextProps.volume2;
    let buffer = nextProps.buffer;
    let [b_left, b_right] = buffer.split(" ");
    this.makeGraphConfig(b_left, b_right, volume1, volume2);
    return true;
  },

  makeGraphConfig(b_left, b_right, volume1, volume2){

    let array = this.state.config;
    array[0] = {id: b_left, x: b_left, y: volume1};
    array[1] = {id: b_right, x: b_right, y: volume2};
    this.setState({config: array});
  },

  render(){  
   let data = this.state.config;         
   return (<div><BarChart config={{data}} /></div>);
 }
});