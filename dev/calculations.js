import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Calculations = createReactClass ({

  getInitialState(){
    return {
            constants: {"HA NaA": 0.00001, "HF NaF": 0.00035,  "HClO NaClO": 0.000000029, "NH\u2084Cl NH\u2083": 0.000000000568},
            pH: 5
          }
  },

  componentWillMount(){
    let volumes = this.props.volumes;
    let buffer = this.props.buffer;
    let strong = this.props.strong;
    let Hmoles = this.getMolarity(volumes['H']);
    let Amoles = this.getMolarity(volumes['A']);
    let Ka = this.state.constants[buffer];
    let Kb = 0.00000000000001/Ka
    let pH = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)
    this.setState({pH: pH})
  },


  componentWillReceiveProps(nextProps){
    let pH;
    let volumes = nextProps.volumes;
    let buffer = nextProps.buffer;
    let strong = nextProps.strong;
    let Hmoles = this.getMolarity(volumes['H']);
    let Amoles = this.getMolarity(volumes['A']);
    let strongMoles = this.getMolarity(volumes['strong']);
    let Ka = this.state.constants[buffer];
    let Kb = 0.00000000000001/Ka

    if (strong != 'None' && strong == 'HCL' && volumes['strong'] != 0){
      if(strongMoles <= Amoles){
        Amoles = Amoles - strongMoles;
        Hmoles = Hmoles + strongMoles;
      }
    } else if (strong != 'None' && strong == 'NaOH' && volumes['strong'] != 0){
      Amoles = Amoles + strongMoles;
      Hmoles = Hmoles - strongMoles;
    }


    pH = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)

    if(this.state.pH != pH){
      this.setState({pH: pH})
      this.props.updatepH(pH)
    } else {
      return
    }
  },

  getMolarity(volume){
    return parseFloat(new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format((volume*.1/1000)));
  },

  render(){
    let buffer = this.props.buffer;
    let Ka = this.state.constants[buffer];
    return (
      <div class="text-center">
      <p>pH: {this.state.pH}</p> <p>Ka: {Ka}</p>
      </div>
      )
  }
});

