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
        ctx.fillStyle = "#3daee2";
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

        /* Draw measurement labels */
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.strokeText("500mL", 15, 220);
        ctx.strokeText("1000mL", 12, 186);
        ctx.strokeText("1500mL", 12, 152);
        ctx.strokeText("2000mL", 12, 119);
        ctx.strokeText("2500mL", 12, 85);
        ctx.stroke();
        ctx.closePath();
        // console.log("drew labels");

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
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, 250);
        ctx.lineTo(250, 250);
        ctx.lineTo(250, 50);
        ctx.stroke();
        ctx.closePath();

        /* Draw measurement hash marks */
        ctx.beginPath();
        ctx.strokeStyle = "#FF0000";
        var count = 249;
        var i = 0;
        for (i; i < 25; i++){
            if (i % 3 == 0){
                count -= 6;
            }
            else {
                count -= 7;
            }
            ctx.moveTo(50, count);
            if (i % 5 == 4){
                ctx.lineTo(70, count);
            }
            else {
                ctx.lineTo(60, count);
            }
        }
        ctx.stroke();
        ctx.closePath();
    },

    drawDropper(pH) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(220, 5, 40, 20);

        /* Draw pH graphic with dynamic text */
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(220, 10);
        ctx.lineTo(220, 225);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.rect(220, 5, 40, 20);
        ctx.stroke();
        ctx.strokeText(pH, 230, 17);
    },
        
    render(){
        return(
          <div>
            <canvas ref="canvas" width={270} height={270} />
          </div>
        )
      }
    });