import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var DrawMolecules = createReactClass ({

getInitialState() {
     return {mole1: this.props.mole1, mole2: this.props.mole2}
 },

 componentDidMount() {

 },

 /***************************** H MOLECULE ***********/
 drawH(xPos, yPos, size, ctx) {
    /* H Molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.stroke();

    /* Draw '+' sign */
    drawPosCharge(xPos, yPos, ctx);
},

/***************************** O MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* O molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0D0D";
    ctx.fill();

    /* Draw '-' sign */
    //drawNegCharge(xPos, yPos, ctx); 
},

/***************************** N MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#3050F8";
    ctx.fill();

    /* Draw '+' sign */
    drawPosCharge(xPos, yPos, ctx); 
},

/***************************** Cl MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#1FF01F";
    ctx.fill();

    /* Draw '-' sign */
    //drawNegCharge(xPos, yPos, ctx); 
},

/***************************** F MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#90E050";
    ctx.fill();

    /* Draw '-' sign */
    //drawNegCharge(xPos, yPos, ctx); 
},

/***************************** Na MOLECULE ***********/
drawNa(xPos, yPos, size, ctx) {
    /* Na molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#AB5CF2";
    ctx.fill();

    /* Draw '+' sign */
    drawPosCharge(xPos, yPos, ctx);
},

/***************************** A MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF1493";
    ctx.fill();

    /* Draw '-' sign */
    drawNegCharge(xPos, yPos, ctx); 
},


/***** DRAW '+' SIGN *****/
drawPosCharge(xPos, yPos, ctx) {

    ctx.moveTo(xPos - 3, yPos);
    ctx.lineTo(xPos + 3, yPos);
    ctx.stroke();

    ctx.moveTo(xPos, yPos - 3);
    ctx.lineTo(xPos, yPos + 3);
    ctx.stroke();
},

/***** DRAW '-' SIGN *****/
drawNegCharge(xPos, yPos) {
    ctx.moveTo(a_pos.x - 3, a_pos.y);
    ctx.lineTo(a_pos.x + 3, a_pos.y);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
},

render() {
    return(
      <div>
      <canvas ref="canvas" width={300} height={300} />
      </div>
      )
}
});