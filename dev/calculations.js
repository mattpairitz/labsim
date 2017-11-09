import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Calculations = createReactClass ({

  getInitialState(){
    return {volumes: this.props.volumes, 
            constants: {"HA NaA": 0.00001, "HF NaF": 0.00035,  "HClO NaClO": 0.000000029, "NH\u2084Cl NH\u2083": 0.000000000568},

          }
        
  },

  getMolarity(volume){
    return parseFloat(new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format((volume*.1/1000)));
  },

  getPH(HA, A, Ka, Kb){
    var pH;
    var total = this.state.volumes['total']
    var x, Hplus;
    if(HA>=A){
      x = this.getIntermediatePH(A, HA, Ka)
      HA = HA-x
      A = A+x
    } else {
      x = this.getIntermediatePH(HA, A, Kb)
      HA = HA+x
      A = A-x
    }
    HA = HA/total;
    A = A/total;
    Hplus = Ka*HA/A
    pH = -(Math.log(Hplus)/Math.log(10))
    return pH;
  },

  getIntermediatePH(a, b, K){
    return (-(a+K) + Math.sqrt(Math.pow((a+K), 2)+ 4*b*K))/2
  },

  render(){
    let volumes = this.state.volumes;
    let buffer = this.props.buffer;
    let strong = this.props.strong;
    let Hmoles = this.getMolarity(volumes['H']);
    let Amoles = this.getMolarity(volumes['A']);
    let Ka = this.state.constants[buffer];
    let Kb = 0.00000000000001/Ka
    return (
      <div>
      <p>pH: {this.getPH(Hmoles, Amoles, Ka, Kb)}</p>
      </div>
      )
  }
});

