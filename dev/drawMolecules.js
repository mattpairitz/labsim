import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var DrawMolecules = createReactClass ({

getInitialState() {
     return {buff1: this.props.buff1, strong: this.props.strong}
 },

 componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, 350, 100);

    var buff1 = this.state.buff1;
    var strong = this.state.strong;

    this.drawGroups(buff1, strong, ctx);
 },

 componentWillReceiveProps(nextProps) {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    /* Split inoming equations into Molecule types */
    var buff1 = nextProps.buff1;
    var strong = nextProps.strong;

    ctx.clearRect(0, 0, 350, 100);
    this.drawGroups(buff1, strong, ctx);
 },

 /***************************** FIND + DRAW GROUPS OF MOLES *********/
 drawGroups(buff1, strong, ctx) {

    const pos1 = {x: 50, y: 50};
    const pos2 = {x: 150, y: 40};
    const pos3 = {x: 250, y: 25};
    const pos4 = {x: 320, y: 40};
    const smRadius = 10;
    const lgRadius = 20;
    const total = smRadius + lgRadius;

    switch (buff1) {
        case "HA":
            this.drawH(pos1.x, pos1.y, smRadius, ctx);
            this.drawA(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawA(pos4.x, pos4.y, lgRadius, ctx);
        break;

        case "HF":
            this.drawH(pos1.x, pos1.y, smRadius, ctx);
            this.drawF(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawA(pos4.x, pos4.y, lgRadius, ctx);
        break;

        case "HClO":
            this.drawH(pos1.x, pos1.y, smRadius, ctx);
            this.drawO(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawCl(pos1.x + (2 * total), pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawCl(pos4.x, pos4.y, lgRadius, ctx);
            this.drawO(pos4.x + total, pos4.y, lgRadius, ctx);

        break;

        case "NH\u2084Cl":
            const xPos = [-30, 0, 30, 0];
            const yPos = [0, 30, 0, -30];

            for (var i = 0; i < 4; i++) {
                this.drawH(pos1.x + xPos[i], pos1.y + yPos[i], smRadius, ctx);
            }

            for (var i = 0; i < 3; i++) {
                this.drawH(pos3.x + xPos[i], pos3.y + yPos[i], smRadius, ctx);
            }

            this.drawN(pos1.x, pos1.y, lgRadius, ctx);
            this.drawCl(pos2.x, pos2.y, lgRadius, ctx);
            this.drawN(pos3.x, pos3.y, lgRadius, ctx);


        break;
    }

/*
    switch (buff2) {
        case "NaA":
            this.drawNa(pos2.x, pos2.y, lgRadius, ctx);
            this.drawA(pos2.x, pos2.y, lgRadius, ctx);

        break;

        case "NaF":
            this.drawNa(120, 210, 20, ctx);
            this.drawF(160, 210, 20, ctx);

        break;

        case "NaClO":
            this.drawNa(120, 210, 20, ctx);
            this.drawO(210, 210, 20, ctx);
            this.drawCl(180, 210, 20, ctx);

        break;

        case "NH\u2083":
            const numH = 3;

            const xPos = [120, 150, 180];
            const yPos = [180, 210, 180];

            for (var i = 0; i < numH; i++) {
                this.drawH(xPos[i], yPos[i], 10, ctx);
            }

            this.drawN(150, 180, 20, ctx);

        break;
    }
*/
    switch (strong) {
        case "None":
            //this.drawH20(250, 50, ctx);
        break;

        case "HCL":
            this.drawHCL(200, 150, ctx);

        break;

        case "NaOH":
            this.drawNaOH(50, 275, ctx);
        break;
    }

    //this.drawH30(250, 250, ctx);
 },


 /***************************** H20 MOLECULE ********/
drawH2O(xPos, yPos, ctx) {
    this.drawO(xPos, yPos, 20, ctx);
    this.drawH(xPos - 25, yPos + 15, 10, ctx);
    this.drawH(xPos + 25, yPos + 15, 10, ctx);
},

/****************************** H30 MOLECULE ********/
drawH3O(xPos, yPos, ctx) {
    this.drawO(xPos, yPos, 20, ctx);
    this.drawPosCharge(xPos, yPos, ctx);
    this.drawH(xPos - 30, yPos, 10, ctx);
    this.drawH(xPos, yPos + 30, 10, ctx);
    this.drawH(xPos + 30, yPos, 10, ctx);
},

/****************************** HCL MOLECULE *********/
drawHCL(xPos, yPos, ctx) {
    this.drawH(xPos, yPos, 10, ctx);
    this.drawCl(xPos + 30, yPos, 20, ctx);
},


/****************************** NaOH MOLECULE *********/
drawNaOH(xPos, yPos, ctx) {
    this.drawNa(xPos, yPos, 20, ctx);
    this.drawO(xPos + 30, yPos, 20, ctx);
    this.drawH(xPos + 60, yPos, 10, ctx);
},



 /***************************** H MOLECULE ***********/
 drawH(xPos, yPos, size, ctx) {
    /* H Molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.stroke();

    /* Draw '+' sign */
    this.drawPosCharge(xPos, yPos, ctx);
},

/***************************** O MOLECULE ***********/
drawO(xPos, yPos, size, ctx) {
    /* O molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0D0D";
    ctx.fill();

    /* Draw '-' sign */
    this.drawNegCharge(xPos, yPos, ctx); 
},

/***************************** N MOLECULE ***********/
drawN(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#3050F8";
    ctx.fill();

    /* Draw '+' sign */
    this.drawPosCharge(xPos, yPos, ctx); 
},

/***************************** Cl MOLECULE ***********/
drawCl(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#1FF01F";
    ctx.fill();

    /* Draw '-' sign */
    this.drawNegCharge(xPos, yPos, ctx); 
},

/***************************** F MOLECULE ***********/
drawF(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#90E050";
    ctx.fill();

    /* Draw '-' sign */
    this.drawNegCharge(xPos, yPos, ctx); 
},

/***************************** Na MOLECULE ***********/
drawNa(xPos, yPos, size, ctx) {
    /* Na molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#AB5CF2";
    ctx.fill();

    /* Draw '+' sign */
    this.drawPosCharge(xPos, yPos, ctx);
},

/***************************** A MOLECULE ***********/
drawA(xPos, yPos, size, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF1493";
    ctx.fill();

    /* Draw '-' sign */
    this.drawNegCharge(xPos, yPos, ctx); 
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
drawNegCharge(xPos, yPos, ctx) {
    ctx.moveTo(xPos - 3, yPos);
    ctx.lineTo(xPos + 3, yPos);
   // ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
},

render() {
    return(
          <div>
            <canvas ref="canvas" width={350} height={100} />
          </div>
        )
}

});