import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

class Canvas extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")

        /* Fill Rectangle */
        ctx.fillStyle = "#ccffe5";
        ctx.fillRect(50, 250, 200, -100);

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
    }
        
    render() {
        return(
          <div>
            <canvas ref="canvas" width={300} height={300} />
          </div>
        )
      }
    }
export default Canvas