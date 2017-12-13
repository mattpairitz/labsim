import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Calculations = createReactClass ({

  getInitialState(){
    return {
            constants: {"HA NaA": 0.00001, "HF NaF": 0.00035,  "HClO NaClO": 0.000000029, "NH\u2084Cl NH\u2083": 0.000000000568},
            pH: 5, fmol: {"H": null, "A": null, "strong": null}
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
    let results = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)
    let pH = results[0];
    Hmoles = results[1];
    Amoles = results[2];
    let new_fmol = {"H": Hmoles, "A": Amoles, "strong": 0 }
    this.setState({pH: pH})
    this.setState({fmol: new_fmol})
  },


  componentWillReceiveProps(nextProps){
    let pH;
    let volumes = nextProps.volumes;
    let buffer = nextProps.buffer;
    let strong = nextProps.strong;
    let Hmoles = this.getMolarity(volumes['H']);
    let Amoles = this.getMolarity(volumes['A']);
    let strongMoles = this.getMolarity(volumes['strong']);
    let total = volumes['total'];
    let Ka = this.state.constants[buffer];
    let Kb = 0.00000000000001/Ka

    // strong present
    if (strong != 'None' && volumes['strong'] != 0){
      // HCl Present
      if(strong == 'HCl'){
        // imolHCl <= imolA
        if(strongMoles <= Amoles){
          Amoles -= strongMoles;
          Hmoles += strongMoles;
          let results = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)
          pH = results[0];
          Hmoles = results[1];
          Amoles = results[2];
          strongMoles = 0
          // imolHCl > imolA
        } else {
          Hmoles += Amoles;
          strongMoles -= Amoles;
          Amoles = 0;
          let x = (-(strongMoles+Ka) + Math.sqrt(Math.pow((strongMoles+Ka), 2)+ 4*Hmoles*Ka))/2
          strongMoles += x;
          strongMoles = strongMoles/(total*.001);
          pH = -(Math.log(strongMoles)/Math.log(10))
          pH = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format((pH));
          
        }
      // NaOH present
      } else {
        if(strongMoles <= Hmoles){
          Amoles += strongMoles;
          Hmoles -= strongMoles;
          strongMoles = 0;
          let results = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)
          pH = results[0];
          Hmoles = results[1];
          Amoles = results[2];
          // imolHCl > imolA
        } else {
          Amoles += Hmoles;
          strongMoles -= Hmoles;
          Hmoles = 0;
          let x = (-(strongMoles+Kb) + Math.sqrt(Math.pow((strongMoles+Kb), 2)+ 4*Amoles*Kb))/2
          strongMoles += x;
          Hmoles = x;
          Amoles = Amoles - x
          let OHneg = strongMoles/(total*.001);
          let Hplus = .00000000000001/OHneg
          pH = -(Math.log(Hplus)/Math.log(10))
          pH = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format((pH));
        }
      }
    // no strong present
    } else {
      let results = this.props.getBufferPh(Hmoles, Amoles, Ka, Kb)
      pH = results[0];
      Hmoles = results[1];
      Amoles = results[2];
    }

    Hmoles = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format((Hmoles));
    Amoles = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format((Amoles));
    strongMoles = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format((strongMoles));

    let new_fmol = {"H": Hmoles, "A": Amoles, "strong": strongMoles }

    if(this.state.pH != pH){
      this.setState({pH: pH})
      this.setState({fmol: new_fmol})
      this.props.updatepH(pH)
    } else {
      return
    }
  },

  getMolarity(volume){
    return parseFloat(new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format((volume*.1/1000)));
  },

  render(){
    let volumes = this.props.volumes;
    let buffer = this.props.buffer;
    let Ka = this.state.constants[buffer];
    let pKa = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format((-(Math.log(Ka)/Math.log(10))));
    let fmol = this.state.fmol;
    let acid = fmol["H"];
    let base = fmol["A"];
    let strong = fmol["strong"];
    return (
    <div>
      <table className="table">
        <thead>
        <tr>
          <th>pH</th>
          <th>Ka</th>
          <th>pKa</th>
          <th>Weak Acid</th>
          <th>Conjugate Base</th>
          <th>Strong</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{this.state.pH}</td>
          <td>{Ka}</td> 
          <td>{pKa}</td> 
          <td>{acid} mol/L</td> 
          <td>{base} mol/L</td> 
          <td>{strong} mol/L</td>  
        </tr>
        </tbody>
      </table>
    </div>
    )
  }
});

