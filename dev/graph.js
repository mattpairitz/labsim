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
    let colors = {"HCl": "#FFFFFF", "NaOH": "#AB5CF2", "HA": "#FF1493", "NaA": "#AB5CF2",
                  "HF": "#90E050", "NaF": "#AB5CF2",  "HClO": "#1FF01F", "NaClO": "#FF0D0D",
                  "NH\u2084Cl": "#1FF01F", "NH\u2083": "#3050F8" }
    let total = (volume1 + volume2 + volume3)/1000;
    let molarity1 = this.getMolarity(volume1/total)
    let molarity2 = this.getMolarity(volume2/total)
    let molarity3 = this.getMolarity(volume3/total)

    let data_array=[];
    if(strong!=='None'){
      data_array[2] = {id: strong, x: strong, y: molarity3, color: colors[strong]};
    } else {
      data_array.pop();
    }
    data_array[0] = {id: b_left, x: b_left, y: molarity1, color: colors[b_left]};
    data_array[1] = {id: b_right, x: b_right, y: molarity2, color: colors[b_right]};

    const methods = {
      label: d => d.x,
      xConfig: {
        title: "Substrate"
      },
      yConfig: {
        title: "Molarity"
      },
      shapeConfig: {
        fill: function(d) {return d.color}
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