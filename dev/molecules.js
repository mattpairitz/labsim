import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({

    getInitialState() {
       return {mole1: null, mole2: null, mole3: null, cubeRotation: new THREE.Euler()}
    },

    componentWillMount() {
        var buffer = this.props.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = this.props.strong;

        this.cameraPosition = new THREE.Vector3(0, 0, 5);
        this._onAnimate = () => {
              this.setState({
                cubeRotation: new THREE.Euler(
                  this.state.cubeRotation.x + 0.1,
                  this.state.cubeRotation.y + 0.1,
                  0
                ),
              });
        };
       // this.animate();
    },

    componentWillReceiveProps(nextProps) {
        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = nextProps.strong;
        this.updateState(mole1, mole2, mole3);
        //this.animate();
    },

    updateState(mole1, mole2, mole3){
        this.setState({mole1: mole1})
        this.setState({mole2: mole2})
        this.setState({mole3: mole3})    
    },
    
    render() {
        var width = 300;
        var height = 300;

        return (<React3
              mainCamera="camera" // this points to the perspectiveCamera below
              width={width}
              height={height}

              onAnimate={this._onAnimate()}
            >
              <scene>
                <perspectiveCamera
                  name="camera"
                  fov={75}
                  aspect={width / height}
                  near={0.1}
                  far={1000}

                  position={this.cameraPosition}
                />
                <mesh
                  rotation={this.state.cubeRotation}
                >
                  <boxGeometry
                    width={1}
                    height={1}
                    depth={1}
                  />
                  <meshBasicMaterial
                    color={0x00ff00}
                  />
                </mesh>
              </scene>
            </React3>);

        /*
        return(
          <div>
            <DrawMolecules mole1={this.state.mole1} mole2={this.state.mole2} mole3={this.state.mole3}/>
          </div>
        )
*/
    }

});