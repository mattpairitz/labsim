import React from 'react';
import ReactDOM from 'react-dom';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({
    
    getInitialState() {
       return {mole1: null, mole2: null, mole3: null}
    },

    componentWillMount() {
        var buffer = this.props.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = this.props.strong;
        this.updateState(mole1, mole2, mole3);
    },

    componentWillReceiveProps(nextProps) {
        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = nextProps.strong;
        this.updateState(mole1, mole2, mole3);
    },

    updateState(mole1, mole2, mole3){
        this.setState({mole1: mole1})
        this.setState({mole2: mole2})
        this.setState({mole3: mole3})    
    },
    
    render() {
        return(
          <div>
            <DrawMolecules mole1={this.state.mole1} mole2={this.state.mole2} mole3={this.state.mole3}/>
          </div>
        )
      }
    });