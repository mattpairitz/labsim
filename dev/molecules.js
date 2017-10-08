import React from 'react';
import ReactDOM from 'react-dom';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({
    
    getInitialState() {
       return {buffer: this.props.buffer, strong: this.props.strong, mole1: null, mole2: null, mole3: null}
    },

    componentWillMount() {
        this.setState({mole1: this.props.mole1})
        this.setState({mole2: this.props.mole2})
        this.setState({mole3: this.props.mole3})     
    },

    componentDidMount() {
        /* Split inoming equations into Molecule types */
        var buffer = this.props.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];
        var mole3 = this.props.strong;

        console.log(mole1);
        console.log(mole2);
        console.log(mole3);
    },

    componentWillReceiveProps(nextProps) {
        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];
        var mole3 = this.props.strong;

        console.log(mole1);
        console.log(mole2);
        console.log(mole3);
    },
    
    render() {
        /* Split inoming equations into Molecule types */
        var buffer = this.props.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];
        var mole3 = this.props.strong;

        return(
          <div>
            <DrawMolecules mole1={mole1} mole2={mole2} mole3={mole3}/>
          </div>
        )
      }
    });