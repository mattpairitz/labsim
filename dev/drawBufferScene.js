import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {DrawMolecules} from './drawMolecules.js';
var createReactClass = require('create-react-class');

export var DrawBufferScene = createReactClass ({

    getInitialState() {
       return {mole1: this.props.mole1, mole3: this.props.mole3, 
                        mole1Rotation: new THREE.Euler(), 
                        mole2Rotation: new THREE.Euler(),
                        mole1Animation: new THREE.Euler()}
    },

    componentWillMount() {
        this.setState({mole1: this.props.mole1})
        this.moleculePositions = this.randomizePositions(5);
        this.cameraPosition = new THREE.Vector3(0, 0, 5);
       
       /* SIMPLE ANIMATION FUNCTION
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
        */
    },

    componentWillReceiveProps(nextProps) {
        this.moleculePositions = this.randomizePositions(5);
    },

    randomizePositions(num) {
        this.moleculePositions = [];
        this.moleculePositions.length = num;

        for (let i = 0; i < num; i++) {
            this.moleculePositions[i] = new THREE.Vector3(
                (Math.random() * 5) - 2,
                (Math.random() * 5) - 2,
                0
            );
        }

        return (this.moleculePositions);
    },

    /********* DRAW BUFFER SCENE **********/
    drawBufferScene(width, height) {
        var buffer = this.props.mole1;

        console.log(buffer);

        switch (buffer) {
            case "HA": 
                return (this.drawBuffer1(width, height));
            case "HF": 
                return (this.drawBuffer2(width, height));
            case "HClO":
                return (this.drawBuffer3(width, height));
            case "NH\u2083Cl":
                return (this.drawBuffer4(width, height));
        }
    },

    /********** BUFFER SCENE 1: HA and NaA ***********/
    drawBuffer1(width, height) {
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
                    position = {this.moleculePositions[0]}
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
                    position = {this.moleculePositions[1]}
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
                    position = {this.moleculePositions[2]}
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
                    position = {this.moleculePositions[3]}
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

    /********** BUFFER SCENE 2: HF and NaF ***********/
    drawBuffer2(width, height) {
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
                    position = {this.moleculePositions[0]}
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
                    position = {this.moleculePositions[1]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x90E050}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[2]}
                    rotation={this.state.mole1Animation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x90E050}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[3]}
                    rotation={this.state.mole2Rotation}
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
              </scene>
            </React3>)
    },

    /********** BUFFER SCENE 3: HClO and NaClO ***********/
    drawBuffer3(width, height) {
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
                    position = {this.moleculePositions[0]}
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
                    position = {this.moleculePositions[1]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x1FF01F}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[2]}
                    rotation={this.state.mole1Animation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF0D0D}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[3]}
                    rotation={this.state.mole2Rotation}
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
                    position = {this.moleculePositions[4]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x1FF01F}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[5]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF0D0D}
                    />
                </mesh>
              </scene>
            </React3>)
    },

    /********** BUFFER SCENE 4: NH4Cl and NH3 ***********/
    drawBuffer4(width, height) {
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
                    position = {this.moleculePositions[0]}
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
                    position = {this.moleculePositions[1]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x3050F8}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[2]}
                    rotation={this.state.mole1Animation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x3050F8}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[3]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0x1FF01F}
                    />
                </mesh>
                <mesh
                    position = {this.moleculePositions[4]}
                    rotation={this.state.mole2Rotation}
                >
                    <circleGeometry
                        radius = {0.5}
                        segments = {20}
                        thetaStart = {0}
                        thetaLength = {Math.PI * 2}
                    />
                    <meshBasicMaterial
                        color={0xFF0D0D}
                    />
                </mesh>
              </scene>
            </React3>)
    },
    
    render() {
        var width = 300;
        var height = 300;

        console.log(this.props.mole1);
        var scene = this.drawBufferScene(width, height);

        return(scene);
    }
});