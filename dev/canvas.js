import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var Canvas = createReactClass ({
    
    getInitialState() {
        return {volume1: this.props.volume1, volume2: this.props.volume2, volume3: this.props.volume3, pH: this.props.pH}
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

        ctx.clearRect(50, 50, 200, 200);
        ctx.fillRect(50, 250, 200, - total);

        this.drawCanvas();
        this.drawDropper(this.state.pH);
    },

    componentWillReceiveProps(nextProps) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        /* mL to pixels: grabbing new slider values */
        var amount1 = nextProps.volume1;
        var amount2 = nextProps.volume2;
        var amount3 = nextProps.volume3;
        var pH = nextProps.pH;

        amount1 = (amount1 / 15);
        amount2 = (amount2 / 15);
        amount3 = (amount3 / 15);
        var total = (amount1 + amount2 + amount3);

        ctx.clearRect(50, 50, 200, 200);
        ctx.fillRect(50, 250, 200, - total);

        this.drawCanvas();
        this.drawDropper(pH);
    },

    drawCanvas() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        /* Draw rectangle on canvas */
        ctx.strokeStyle = "#000000";
        ctx.rect(50, 50, 200, 200);
    },

    drawDropper(pH) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        /* Draw pH graphic with dynamic text */
        ctx.moveTo(220, 10);
        ctx.lineTo(220, 225);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.rect(220, 5, 40, 20);
        ctx.stroke();
        ctx.strokeText(pH, 240, 17);
    },
        
    render(){
        return(
          <div>
            <canvas ref="canvas" width={300} height={300} />
          </div>
        )
      }
    });