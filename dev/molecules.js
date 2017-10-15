import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({

    getInitialState() {
       return {mole1: null, mole2: null, mole3: null, mole1Rotation: new THREE.Euler(), mole2Rotation: new THREE.Euler(),
                mole1Animation: new THREE.Euler()}
    },

    componentWillMount() {
        var buffer = this.props.buffer;
        var [mole1, mole2] = buffer.split(" ");
        var mole3 = this.props.strong;

        this.cameraPosition = new THREE.Vector3(0, 0, 5);
        this.mole1Position = new THREE.Vector3(-2, 0, 0);
        this.mole2Position = new THREE.Vector3(-1.25, 0, 0);
        this.mole3Position = new THREE.Vector3(2, 0, 0);
        this.mole4Position = new THREE.Vector3(1.25, 0, 0);
        
        this._onAnimate = () => {
              this.setState({
                mole1Animation: new THREE.Euler(
                  this.state.mole1Animation.x + 0.01,
                  this.state.mole1Animation.y + 0.01,
                  0
                ),
              });

              this.setState({
                mole2Rotation: new THREE.Euler(
                  this.state.mole2Rotation.x + 0.01,
                  this.state.mole2Rotation.y + 0.01,
                  0
                ),
              });
        };
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

    drawBufferScene(width, height) {

        return (this.drawBuffer1(width, height));

        /*
        switch () {
            case "HA": return (this.drawBuffer1(width, height));
            case "HF": return (this.drawBuffer2(width, height));
        }
        */
    },

    drawBuffer1(width, height) {
        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}

                onAnimate={this._onAnimate}
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
                    position = {this.mole1Position}
                    rotation = {this.state.mole2Rotation} 
                >
                    <circleGeometry
                        radius = {0.25}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFFFFFF}
                    />
                </mesh>
                <mesh
                    position = {this.mole2Position}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF1493}
                    />
                </mesh>
                <mesh
                    position = {this.mole3Position}
                    rotation={this.state.mole1Animation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xAB5CF2}
                    />
                </mesh>
                <mesh
                    position = {this.mole4Position}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF1493}
                    />
                </mesh>
              </scene>
            </React3>)
    },

    drawBuffer2(width, height) {
        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}

                onAnimate={this._onAnimate}
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
                    position = {this.mole1Position}
                    rotation = {this.state.mole2Rotation} 
                >
                    <circleGeometry
                        radius = {0.25}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFFFFFF}
                    />
                </mesh>
                <mesh
                    position = {this.mole2Position}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF1493}
                    />
                </mesh>
                <mesh
                    position = {this.mole3Position}
                    rotation={this.state.mole1Animation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xAB5CF2}
                    />
                </mesh>
                <mesh
                    position = {this.mole4Position}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF1493}
                    />
                </mesh>
              </scene>
            </React3>)
    },
    
    render() {
        var width = 300;
        var height = 300;

        return(this.drawBufferScene(width, height));
        /*
        return(
          <div>
            <DrawMolecules mole1={this.state.mole1} mole2={this.state.mole2} mole3={this.state.mole3}/>
          </div>
        )
*/
    }
});