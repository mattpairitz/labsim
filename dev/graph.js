const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
import {BarChart} from "d3plus-react";

export var Graph = createReactClass({

  getInitialState(){
    return { volume1: this.props.volume1, volume2: this.props.volume2, volume3: this.props.volume3,
             buffer: this.props.buffer, strong: this.props.strong, config: []}
  },

  componentWillMount(){
    let volume1 = this.state.volume1;
    let volume2 = this.state.volume2;
    let volume3 = this.state.volume3;
    let buffer = this.state.buffer;
    let strong = this.state.strong;
    let [b_left, b_right] = buffer.split(" ");
    this.makeGraphConfig(b_left, b_right, strong, volume1, volume2, volume3);
  },

  shouldComponentUpdate(nextProps){
    let volume1 = nextProps.volume1;
    let volume2 = nextProps.volume2;
    let volume3 = nextProps.volume3;
    let buffer = nextProps.buffer;
    let strong = nextProps.strong;
    let [b_left, b_right] = buffer.split(" ");
    this.makeGraphConfig(b_left, b_right, strong, volume1, volume2, volume3);
    return true;
  },

  getMolarity(volume){
    return volume*.1/1000
  },

  makeGraphConfig(b_left, b_right, strong, volume1, volume2, volume3){

    let molarity1 = this.getMolarity(volume1)
    let molarity2 = this.getMolarity(volume2)
    let molarity3 = this.getMolarity(volume3)

    let data_array=[];
    if(strong!=='None'){
      data_array[2] = {id: strong, x: strong, y: molarity3};
    } else {
      data_array.pop();
    }
    data_array[0] = {id: b_left, x: b_left, y: molarity1};
    data_array[1] = {id: b_right, x: b_right, y: molarity2};

    const methods = {
      label: d => parseFloat(Math.round(d.y * 10000) / 10000).toFixed(3),
      xConfig: {
        title: "Substrate"
      },
      yConfig: {
        title: "Molarity"
      },
      data: data_array,
    };

    this.setState({config: methods});
  },

  render(){  
   let data = this.state.config;         
   return (<div><BarChart config={data} /></div>);
 }
});