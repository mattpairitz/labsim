import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Canvas = createReactClass ({
    
    getInitialState() {
        return {volume1: this.props.volume1, volume2: this.props.volume2, combinedVolume: null}
    },

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        /* Fill Rectangle */
        ctx.fillStyle = "#ccffe5";
        ctx.fillRect(50, 250, 200, -50);
       // ctx.fillRect(0, 500, 500, -100);

        /* Fill Text */
        //ctx.strokeText(this.props.volume1, 100, 100);

        /* Draw rectangle on canvas */
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

    componentWillReceiveProps(nextProps) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        console.log(nextProps)
        const intialVolume = 50;

        /* mL to pixels */
        var amount1 = nextProps.volume1;
        var amount2 = nextProps.volume2;
        amount1 = (amount1 / 20);
        amount2 = (amount2 / 20);
        var total = (amount1 + amount2 + intialVolume);

        console.log(amount1);
        console.log(amount2);
        console.log(total);

        ctx.fillRect(50, 250, 200, - total);
    },
        
    render(){
        return(
          <div>
            <canvas ref="canvas" width={300} height={300} />
          </div>
        )
      }
    });