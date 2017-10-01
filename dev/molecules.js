import React from 'react';
import ReactDOM from 'react-dom';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({
    
    getInitialState() {
       return {buffer: this.props.buffer, mole1: null, mole2: null}
    },

    componentWillMount() {
        this.setState({mole1: this.props.mole1})
        this.setState({mole2: this.props.mole2})
        
    },

    drawCanvas() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        /* Draw rectangle on canvas */
        ctx.strokeStyle = "#000000";
        ctx.moveTo(50,50);
        ctx.lineTo(250, 50);
        ctx.stroke();

        ctx.moveTo(250, 50);
        ctx.lineTo(250, 250);
        ctx.stroke();

        ctx.moveTo(250, 250);
        ctx.lineTo(50, 250);
        ctx.stroke();

        ctx.moveTo(50, 250);
        ctx.lineTo(50, 50);
        ctx.stroke();

    },




    componentDidMount() {
     //   const canvas = this.refs.canvas
     //   const ctx = canvas.getContext("2d")

     //   this.drawCanvas();

        /* Split inoming equations into Molecule types */
        var buffer = this.props.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];

        console.log(mole1);
        console.log(mole2);
/*
        switch (mole1) {
            case "HA":
                var h_pos = {x: 70, y: 100};
                var a_pos = {x: 100, y: 100};
                var size = {small: 10, large: 20};

                /* H Molecule 
                ctx.beginPath();
                ctx.arc(h_pos.x, h_pos.y, size.small, 0, 2 * Math.PI);
                ctx.stroke();

                /* Draw '+' sign 
                ctx.moveTo(h_pos.x - 3, h_pos.y);
                ctx.lineTo(h_pos.x + 3, h_pos.y);
                ctx.stroke();

                ctx.moveTo(h_pos.x, h_pos.y - 3);
                ctx.lineTo(h_pos.x, h_pos.y + 3);
                ctx.stroke();


                /* A molecule 
                ctx.beginPath();
                ctx.arc(a_pos.x, a_pos.y, size.large, 0, 2 * Math.PI);
                ctx.fillStyle = "#FF1493";
                ctx.fill();

                /* Draw '-' sign 
                ctx.moveTo(a_pos.x - 3, a_pos.y);
                ctx.lineTo(a_pos.x + 3, a_pos.y);
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();

                break;
                

        }

        switch (mole2) {

                case "NaA":

                    var na_pos = {x: 120, y: 150};
                var a_pos = {x: 160, y: 150};
                var size = {small: 10, large: 20};

                /* Na molecule 
                ctx.beginPath();
                ctx.arc(na_pos.x, na_pos.y, size.large, 0, 2 * Math.PI);
                ctx.fillStyle = "#AB5CF2";
                ctx.fill();

                /* Draw '+' sign 
                ctx.moveTo(na_pos.x - 3, na_pos.y);
                ctx.lineTo(na_pos.x + 3, na_pos.y);
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();

                ctx.moveTo(na_pos.x, na_pos.y - 3);
                ctx.lineTo(na_pos.x, na_pos.y + 3);
                ctx.stroke();

                /* A molecule 
                ctx.beginPath();
                ctx.arc(a_pos.x, a_pos.y, size.large, 0, 2 * Math.PI);
                ctx.fillStyle = "#FF1493";
                ctx.fill();

                /* Draw '-' sign 
                ctx.moveTo(a_pos.x - 3, a_pos.y);
                ctx.lineTo(a_pos.x + 3, a_pos.y);
                ctx.strokeStyle = "#FFFFFF";
                ctx.stroke();

                break;
        }

        */

    },

    componentWillReceiveProps(nextProps) {
    //    const canvas = this.refs.canvas
    //    const ctx = canvas.getContext("2d")

        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];

        console.log(mole1);
        console.log(mole2);

     //   ctx.clearRect(0, 0, 300, 300);
     //   this.drawCanvas();
    },
    
    render() {
        /* Split inoming equations into Molecule types */
        var buffer = this.props.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];

        return(
          <div>
            <DrawMolecules mole1={mole1} mole2={mole2} />
          </div>
        )
      }
    });