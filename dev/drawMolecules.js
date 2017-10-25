import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var DrawMolecules = createReactClass ({

getInitialState() {
     return {mole1: this.props.mole1, mole2: this.props.mole2, mole3: this.props.mole3}
 },

 componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    ctx.clearRect(0, 0, 300, 300);

    var mole1 = this.state.mole1;
    var mole2 = this.state.mole2;
    var mole3 = this.state.mole3;

    this.drawGroups(mole1, mole2, mole3, ctx);
 },

 componentWillReceiveProps(nextProps) {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    /* Split inoming equations into Molecule types */
    var mole1 = nextProps.mole1;
    var mole2 = nextProps.mole2;
    var mole3 = nextProps.mole3;

    ctx.clearRect(0, 0, 300, 300);
    this.drawGroups(mole1, mole2, mole3, ctx);
 },

 /***************************** FIND + DRAW GROUPS OF MOLES *********/
 drawGroups(mole1, mole2, mole3, ctx) {

    switch (mole1) {
        case "HA":
            this.drawH(70, 100, 10, ctx);
            this.drawA(100, 100, 20, ctx);

        break;

        case "HF":
            this.drawH(70, 100, 10, ctx);
            this.drawF(100, 100, 20, ctx);

        break;

        case "HClO":
            this.drawH(70, 100, 10, ctx);
            this.drawO(130, 100, 20, ctx);
            this.drawCl(100, 100, 20, ctx);

        break;

        case "NH\u2084Cl":
            const numH = 4;

            const xPos = [70, 100, 130, 100];
            const yPos = [100, 130, 100, 70];

            for (var i = 0; i < numH; i++) {
                this.drawH(xPos[i], yPos[i], 10, ctx);
            }

            this.drawN(100, 100, 20, ctx);
            this.drawCl(180, 100, 20, ctx);

        break;
    }

    switch (mole2) {
        case "NaA":
            this.drawNa(120, 210, 20, ctx);
            this.drawA(160, 210, 20, ctx);

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

    switch (mole3) {
        case "None":
            this.drawH20(250, 50, ctx);
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
drawH20(xPos, yPos, ctx) {
    this.drawO(xPos, yPos, 20, ctx);
    this.drawH(xPos - 25, yPos + 15, 10, ctx);
    this.drawH(xPos + 25, yPos + 15, 10, ctx);
},

/****************************** H30 MOLECULE ********/
drawH30(xPos, yPos, ctx) {
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

});