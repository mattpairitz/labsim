import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

class Canvas extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.state = {volume1: this.prop.volume1};
        this.state = {volume2: this.props.volume2};
        //return { volume1: this.props.volume1, volume2: this.prop.volume2};
    }
*/
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        //const height = this.props.volume1

       // this.setState({volume1: this.props.volume1});
       // this.setState({volume2: this.props.volume2});

        /* Fill Rectangle */
        ctx.fillStyle = "#ccffe5";
        ctx.fillRect(50, 250, 200, -100);
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