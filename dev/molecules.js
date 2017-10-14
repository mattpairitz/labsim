import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({

    getInitialState() {
<<<<<<< HEAD
       return {buffer: this.props.buffer, strong: this.props.strong, mole1: null, mole2: null, mole3: null, cubeRotation: new THREE.Euler()}
    },

    componentWillMount() {

        this.cameraPosition = new THREE.Vector3(0, 0, 5); 

        this.setState({mole1: this.props.mole1})
        this.setState({mole2: this.props.mole2})
        this.setState({mole3: this.props.mole3}) 

        this.setState({cubeRotation: new THREE.Euler(this.state.cubeRotation.x + 0.1,
                        this.state.cubeRotation.y + 0.1, 0)})  
    },

    componentDidMount() {
        /* Split inoming equations into Molecule types */
=======
       return {mole1: null, mole2: null, mole3: null}
    },

    componentWillMount() {
>>>>>>> master
        var buffer = this.props.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = this.props.strong;
<<<<<<< HEAD
        cubeRotation = new THREE.Euler(this.state.cubeRotation.x + 0.1, this.state.cubeRotation.y + 0.1, 0);

        console.log(mole1);
        console.log(mole2);
        console.log(mole3);
=======
        this.updateState(mole1, mole2, mole3);
>>>>>>> master
    },

    componentWillReceiveProps(nextProps) {
        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = nextProps.strong;
        this.updateState(mole1, mole2, mole3);
    },

    updateState(mole1, mole2, mole3){
        this.setState({mole1: mole1})
        this.setState({mole2: mole2})
        this.setState({mole3: mole3})    
    },
    
    render() {
<<<<<<< HEAD
        /* Split inoming equations into Molecule types */
        var buffer = this.props.buffer;
        var split = buffer.split(" ");
        var mole1 = split[2];
        var mole2 = split[6];
        var mole3 = this.props.strong;

        const {
            width,
            height,
        } = this.props;

        return (<React3
              mainCamera="camera" // this points to the perspectiveCamera below
              width={width}
              height={height}

              //onAnimate={this._onAnimate}
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
        }

/*
=======
>>>>>>> master
        return(
          <div>
            <DrawMolecules mole1={this.state.mole1} mole2={this.state.mole2} mole3={this.state.mole3}/>
          </div>
        )
      }
      */
    });