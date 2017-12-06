import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

export var DrawMolecules = createReactClass ({

getInitialState() {
     return {buff1: this.props.buff1, strong: this.props.strong, canvas: this.props.canvas}
 },

 componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 100);

    var buff1 = this.state.buff1;
    var strong = this.state.strong;
    var c = this.state.canvas;

    if (c == 1) {
        this.drawGroups(buff1, ctx);
    } else if (c == 2) {
        this.drawStrong(buff1, strong, ctx);
    }
 },

 componentWillReceiveProps(nextProps) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 400, 100);

    var buff1 = nextProps.buff1;
    var strong = nextProps.strong;
    var c = this.state.canvas;

    if (c == 1) {
        this.drawGroups(buff1, ctx);
    } else if (c == 2) {
        this.drawStrong(buff1, strong, ctx);
    }
 },

 /******* UPDATE BUFFER SELECTION *********/
    updateState(buff1, buff2, strong){
        this.setState({buff1: buff1});
        this.setState({strong: strong});    
    },

 /***************************** FIND + DRAW GROUPS OF MOLES *********/
 drawGroups(buff1, ctx) {

    var pos1 = {x: 100, y: 50};
    var pos2 = {x: 200, y: 75};
    var pos3 = {x: 280, y: 50};
    var pos4 = {x: 340, y: 75};
    var smRadius = 10;
    var lgRadius = 20;
    var total = smRadius + lgRadius;

    switch (buff1) {
        case "HA":
            this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
            this.drawA(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawA(pos4.x, pos4.y, lgRadius, ctx);
            break;

        case "HF":
            this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
            this.drawF(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawF(pos4.x, pos4.y, lgRadius, ctx);
            break;

        case "HClO":
            this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
            this.drawO(pos1.x + (2 * total), pos1.y, lgRadius, "none", ctx);
            this.drawCl(pos1.x + total, pos1.y, lgRadius, ctx);
            this.drawH2O(pos2.x, pos2.y, ctx);
            this.drawH3O(pos3.x, pos3.y, ctx);
            this.drawO(pos4.x + total, pos4.y, lgRadius, "none", ctx);
            this.drawCl(pos4.x, pos4.y, lgRadius, ctx);
            break;

        case "NH\u2084Cl":
            this.drawNH3(pos1.x + 20, pos1.y - 20, ctx);
            this.drawH2O(pos2.x + 10, pos2.y - 25, ctx);
            this.drawO(pos3.x, pos3.y + total, lgRadius, "negative", ctx);
            this.drawH(pos3.x + total, pos3.y + total, smRadius, false, ctx);
            this.drawNH4(pos4.x + 20, pos4.y - 25, ctx);
            break;
    }
 },

 drawStrong(buff1, strong, ctx) {
    var pos1 = {x: 80, y: 50};
    var pos2 = {x: 150, y: 50};
    var pos3 = {x: 280, y: 50};
    var pos4 = {x: 350, y: 50};
    var smRadius = 10;
    var lgRadius = 20;
    var total = smRadius + lgRadius;

    switch (strong) {
        case "None":
            break;

        case "HCL":
            if (buff1 == "HA") {
                this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
                this.drawA(pos2.x, pos2.y, lgRadius, ctx);
                this.drawH(pos3.x, pos3.y, smRadius, true, ctx);
                this.drawA(pos3.x + total, pos3.y, lgRadius, ctx);

            } else if (buff1 == "HF") {
                this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
                this.drawF(pos2.x, pos2.y, lgRadius, ctx);
                this.drawH(pos3.x, pos3.y, smRadius, true, ctx);
                this.drawF(pos3.x + total, pos3.y, lgRadius, ctx);

            } else if (buff1 == "HClO") {
                this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
                this.drawO(pos2.x + total, pos2.y, lgRadius, "none", ctx);
                this.drawCl(pos2.x, pos2.y, lgRadius, ctx);
                this.drawH(pos3.x, pos3.y, smRadius, true, ctx);
                this.drawO(pos3.x + (2 * total), pos3.y, lgRadius, "none", ctx);
                this.drawCl(pos3.x + total, pos3.y, lgRadius, ctx);

            } else {
                this.drawH(pos1.x, pos1.y, smRadius, true, ctx);
                this.drawNH3(pos2.x, pos2.y, ctx);
                this.drawNH4(pos3.x, pos3.y, ctx);
            }
            break;

        case "NaOH":
            if (buff1 == "HA") {
                this.drawO(pos1.x, pos1.y, lgRadius, "negative", ctx);
                this.drawH(pos1.x + total, pos1.y, smRadius, false, ctx);
                this.drawH(pos2.x, pos2.y, smRadius, true, ctx);
                this.drawA(pos2.x + total, pos2.y, lgRadius, ctx);
                this.drawH2O(pos3.x, pos3.y, ctx);
                this.drawA(pos4.x, pos4.y, lgRadius, ctx);

            } else if (buff1 == "HF") {
                this.drawO(pos1.x, pos1.y, lgRadius, "negative", ctx);
                this.drawH(pos1.x + total, pos1.y, smRadius, false, ctx);
                this.drawH(pos2.x, pos2.y, smRadius, true, ctx);
                this.drawF(pos2.x + total, pos2.y, lgRadius, ctx);
                this.drawH2O(pos3.x, pos3.y, ctx);
                this.drawF(pos4.x, pos4.y, lgRadius, ctx);

            } else if (buff1 == "HClO") {
                this.drawO(pos1.x, pos1.y, lgRadius, "negative", ctx);
                this.drawH(pos1.x + total, pos1.y, smRadius, false, ctx);
                this.drawH(pos2.x, pos2.y, smRadius, true, ctx);
                this.drawO(pos2.x + (2 * total), pos2.y, lgRadius, "none", ctx);
                this.drawCl(pos2.x + total, pos2.y, lgRadius, ctx);
                this.drawH2O(pos3.x, pos3.y, ctx);
                this.drawO(pos4.x + total, pos4.y, lgRadius, "none", ctx);
                this.drawCl(pos4.x, pos4.y, lgRadius, ctx);

            } else {
                this.drawO(pos1.x, pos1.y, lgRadius, "negative", ctx);
                this.drawH(pos1.x + total, pos1.y, smRadius, false, ctx);
                this.drawNH4(pos2.x + 20, pos2.y, ctx);
                this.drawH2O(pos3.x, pos3.y, ctx);
                this.drawNH3(pos4.x + 10, pos4.y, ctx);

            }
            break;
    }
 },


 /***************************** H2O MOLECULE ********/
drawH2O(xPos, yPos, ctx) {
    this.drawO(xPos, yPos, 20, "none", ctx);
    this.drawH(xPos - 25, yPos + 15, 10, false, ctx);
    this.drawH(xPos + 25, yPos + 15, 10, false, ctx);
},

/****************************** H3O MOLECULE ********/
drawH3O(xPos, yPos, ctx) {
    this.drawO(xPos, yPos, 20, "positive", ctx);
    this.drawPosCharge(xPos, yPos, ctx);

    this.drawH(xPos - 30, yPos, 10, false, ctx);
    this.drawH(xPos, yPos + 30, 10, false, ctx);
    this.drawH(xPos + 30, yPos, 10, false, ctx);
},

/****************************** NH3 MOLECULE ********/
drawNH3(xPos, yPos, ctx) {
    this.drawN(xPos, yPos, 20, false, ctx);
    this.drawH(xPos - 30, yPos, 10, false, ctx);
    this.drawH(xPos, yPos + 30, 10, false, ctx);
    this.drawH(xPos + 30, yPos, 10, false, ctx);
},

/****************************** NH4 MOLECULE ********/
drawNH4(xPos, yPos, ctx) {
    this.drawN(xPos, yPos, 20, true, ctx);
    this.drawH(xPos - 30, yPos, 10, false, ctx);
    this.drawH(xPos, yPos + 30, 10, false, ctx);
    this.drawH(xPos + 30, yPos, 10, false, ctx);
    this.drawH(xPos, yPos - 30, 10, false, ctx);
},

/****************************** HCL MOLECULE *********/
drawHCL(xPos, yPos, ctx) {
    this.drawH(xPos, yPos, 10, true, ctx);
    this.drawCl(xPos + 30, yPos, 20, ctx);
},


/****************************** NaOH MOLECULE *********/
drawNaOH(xPos, yPos, ctx) {
    this.drawNa(xPos, yPos, 20, ctx);
    this.drawO(xPos + 30, yPos, 20, ctx);
    this.drawH(xPos + 60, yPos, 10, false, ctx);
},



 /***************************** H MOLECULE ***********/
 drawH(xPos, yPos, size, charge, ctx) {
    /* H Molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    /* Draw '+' sign */
    if (charge) {
        this.drawPosCharge(xPos, yPos, ctx);
    }
},

/***************************** O MOLECULE ***********/
drawO(xPos, yPos, size, charge, ctx) {
    /* O molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0D0D";
    ctx.fill();

    /* Draw '-' sign */
    if (charge == "negative") {
        this.drawNegCharge(xPos, yPos, ctx);

    } else if (charge == "positive") {
        this.drawPosCharge(xPos, yPos, ctx);
    } else {

    }
},

/***************************** N MOLECULE ***********/
drawN(xPos, yPos, size, charge, ctx) {
    /* A molecule */
    ctx.beginPath();
    ctx.arc(xPos, yPos, size, 0, 2 * Math.PI);
    ctx.fillStyle = "#3050F8";
    ctx.fill();

    /* Draw '+' sign */
    if (charge) {
        this.drawPosCharge(xPos, yPos, ctx);
    } 
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
            <canvas ref="canvas" width={400} height={100} />
          </div>
        )
}

});