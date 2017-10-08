import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Canvas = createReactClass ({
    
    getInitialState() {
        return {volume1: this.props.volume1, volume2: this.props.volume2, volume3: this.props.volume3}
    },

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        /* Fill Rectangle */
        ctx.fillStyle = "#ccffe5";
        //ctx.fillRect(50, 50, 200, 200);

        /* mL to pixels: grabbing intial slider values */
        var amount1 = this.props.volume1;
        var amount2 = this.props.volume2;
        var amount3 = this.props.volume3;
        amount1 = (amount1 / 15);
        amount2 = (amount2 / 15);
        amount3 = (amount3 / 15);
        var total = (amount1 + amount2 + amount3);

        console.log(amount1);
        console.log(amount2);
        console.log(amount3);
        console.log(total);

        //ctx.fillStyle = "#000000";
        //ctx.fillRect(50, 50, 200, (200 - total));
        ctx.clearRect(50, 50, 200, 200);
        ctx.fillRect(50, 250, 200, - total);

        this.drawCanvas();
    },

    componentWillReceiveProps(nextProps) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        console.log(nextProps)

        /* mL to pixels: grabbing new slider values */
        var amount1 = nextProps.volume1;
        var amount2 = nextProps.volume2;
        var amount3 = nextProps.volume3;
        amount1 = (amount1 / 15);
        amount2 = (amount2 / 15);
        amount3 = (amount3 / 15);
        var total = (amount1 + amount2 + amount3);

        console.log(amount1);
        console.log(amount2);
        console.log(amount3);
        console.log(total);

        //ctx.fillStyle = "#000000";
        //ctx.fillRect(50, 50, 200, total);
        ctx.clearRect(50, 50, 200, 200);
        ctx.fillRect(50, 250, 200, - total);

        this.drawCanvas();
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
        
    render(){
        return(
          <div>
            <canvas ref="canvas" width={300} height={300} />
          </div>
        )
      }
    });