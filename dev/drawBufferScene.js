import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {Strong} from './drawStrongScene.js';

var createReactClass = require('create-react-class');

export var DrawBufferScene = createReactClass ({

    getInitialState() {
       return {mole1: this.props.mole1, mole3: this.props.mole3, 
                    rotation: new THREE.Euler(), rotation2: new THREE.Euler()}
    },

    componentWillMount() {
        this.setState({mole1: this.props.mole1})
        this.setState({mole3: this.props.mole3})
        this.randomizePositions(5);
        this.addPositions(this.moleculePositions);

        this.cameraPosition = new THREE.Vector3(0, 0, 5);

       /* SIMPLE ANIMATION FUNCTION */
        this._onAnimate = () => {
           this.setState({
                rotation: new THREE.Euler(
                0,
                0,
                this.state.rotation.z + 0.0075
                ),
            });

            this.setState({
                rotation2: new THREE.Euler(
                0,
                0,
                this.state.rotation2.z - 0.0075
                ),
            });
        };

        //console.log(this.moleculeAnimation);
        console.log(this.props.mole3);
    },

    componentWillReceiveProps(nextProps) {
        this.moleculePositions = this.randomizePositions(5);
    },

    /********* Randomize Molecule Locations On Canvas **********/
    //TO DO: Fix issues with constant randomization of any props.
    randomizePositions(num) {
        this.moleculePositions = [];
        this.moleculePositions.length = num;

        for (let i = 0; i < num; i++) {
            this.moleculePositions[i] = new THREE.Vector3(
                (Math.random() * 5) - 2,
                (Math.random() * 5) - 2,
                0
            );

/*
            for (let j = 0; j < i; j++) {

                //Obj1 = Current Randomized Object, Obj2 = Comparison Object
                var obj1 = this.moleculePositions[i];
                var obj2 = this.moleculePositions[j];
                var radius = 0.5;

                //Find area of circle for overlap
                var x_min = obj2.x - radius;
                var x_max = obj2.x + radius;
                var y_min = obj2.y - radius;
                var y_max = obj2.y + radius;

                //Find overlap of obj1 in comparision to range of obj2
                if (obj1.x > x_min && obj1.x < x_max) {
                    console.log("X OVERLAPS");

                    if (obj1.y > y_min && obj1.y < y_max) {

                        console.log("COLLISION")
                        console.log("OBJ1 at Position: " + i);
                        console.log("OBJ2 at Position: " + j);

                        obj1.x + (radius * 2);
                        obj1.y + (radius);
                    }
                }
            }
    */
        }

        //console.log(this.moleculePositions);

        return (this.moleculePositions);
    },

    addPositions(positions) {
        this.moleculeAnimation = [];
        this.moleculeAnimation.length = positions.length;

        for (var i = 0; i < positions.length; i++) {
            this.moleculeAnimation[i] = new THREE.Euler(
                    positions[i].x, 
                    positions[i].y,
                    0);
        }

        //console.log(this.moleculeAnimation);
    },



/********* CALCULATE POSITIONS OF HYDROGENS for NH4 & NH3 **********/
    addHydrogen(molecule, num) {
        this.hydroPosition = [];
        var radius = 0.75;

        //LEFT CIRCLE
        this.hydroPosition.push(new THREE.Vector3(
                molecule.x - radius,
                molecule.y,
                molecule.z));

        //RIGHT CIRCLE
        this.hydroPosition.push(new THREE.Vector3(
                molecule.x + radius,
                molecule.y,
                molecule.z));

        //DOWN CIRCLE
        this.hydroPosition.push(new THREE.Vector3(
                molecule.x,
                molecule.y - radius,
                molecule.z));

        //UP CIRCLE
        if (num == 4) {
            this.hydroPosition.push(new THREE.Vector3(
                molecule.x,
                molecule.y + radius,
                molecule.z));
        }

        return (this.hydroPosition);
    },

    /********* DRAW BUFFER SCENE **********/
    drawBufferScene(width, height) {
        var buffer = this.props.mole1;

        //console.log(buffer);

        switch (buffer) {
            case "HA": 
                return (this.drawBuffer1(width, height));
            case "HF": 
                return (this.drawBuffer2(width, height));
            case "HClO":
                return (this.drawBuffer3(width, height));
            case "NH\u2084Cl":
                return (this.drawBuffer4(width, height));
        }
    },
    
/********** BUFFER SCENE 1: HA and NaA ***********/
    drawBuffer1(width, height) {
        //var strong = this.props.mole3;
        //console.log(strong);

        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width = {width}
                height = {height}
                clearColor = {0xCCFFE5}

                onAnimate={this._onAnimate}
            >
            <scene>
                <perspectiveCamera
                    name = "camera"
                    fov = {75}
                    aspect = {width / height}
                    near={0.1}
                    far={1000}

                    position={this.cameraPosition}
                />
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.moleculePositions[0]}
                        rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    //THIS ONE IS ROTATING AROUND ANOTHER MOVING MOLECULE
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                > 
                    <mesh
                        position = {this.moleculePositions[1]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFF1493}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>  
                <group
                    position = {this.moleculePositions[3]}
                    rotation = {this.state.rotation}
                >  
                    <mesh
                        position = {this.moleculePositions[2]}
                        //rotation={this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xAB5CF2}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[2]}
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[3]}
                        //rotation={this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFF1493}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group> 
              </scene>
            </React3>)
    },

    /********** BUFFER SCENE 2: HF and NaF ***********/
    drawBuffer2(width, height) {
        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                clearColor = {0xCCFFE5}

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
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.moleculePositions[0]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}

                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation2}
                >    
                    <mesh
                        position = {this.moleculePositions[1]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x90E050}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[2]}
                    rotation = {this.state.rotation2}
                >
                    <mesh
                        position = {this.moleculePositions[2]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x90E050}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[3]}
                    rotation = {this.state.rotation2}
                >
                    <mesh
                        position = {this.moleculePositions[2]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x90E050}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[2]}
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[3]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xAB5CF2}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
              </scene>
            </React3>)
    },

    /********** BUFFER SCENE 3: HClO and NaClO ***********/
    drawBuffer3(width, height) {
        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                clearColor = {0xCCFFE5}

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
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.moleculePositions[0]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[1]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x1FF01F}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[1]}
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[2]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFF0D0D}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[2]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.moleculePositions[3]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xAB5CF2}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[3]}
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[4]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x1FF01F}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group> 
                <group
                    position = {this.moleculePositions[4]}
                    rotation = {this.state.rotation}
                >   
                    <mesh
                        position = {this.moleculePositions[5]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFF0D0D}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
              </scene>
            </React3>)
    },

    /********** BUFFER SCENE 4: NH4Cl and NH3 ***********/
    drawBuffer4(width, height) {
        var hydroPos1 = this.addHydrogen(this.moleculePositions[0], 4);
        var hydroPos2 = this.addHydrogen(this.moleculePositions[1], 3);


        return (<React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                clearColor = {0xCCFFE5}

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
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {hydroPos1[0]}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {hydroPos1[1]}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {hydroPos1[2]}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {hydroPos1[3]}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {this.moleculePositions[0]}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x3050F8}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group> 
                <group
                    position = {this.moleculePositions[0]}
                    rotation = {this.state.rotation}
                > 
                    <mesh
                        position = {hydroPos2[0]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {hydroPos2[1]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {hydroPos2[2]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.25}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0xFFFFFF}
                            side = {THREE.DoubleSide}
                        />
                    </mesh> 
                    <mesh
                        position = {this.moleculePositions[1]}
                        //rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x3050F8}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
                <group
                    position = {this.moleculePositions[1]}
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.moleculePositions[2]}
                        rotation = {this.state.rotation}
                    >
                        <circleGeometry
                            radius = {0.5}
                            segments = {20}
                            thetaStart = {0}
                            thetaLength = {Math.PI * 2}
                        />
                        <meshBasicMaterial
                            color={0x1FF01F}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                </group>
              </scene>
            </React3>)
    },

    render() {
        var width = 300;
        var height = 300;

        //console.log(this.props.mole3);
        var scene = this.drawBufferScene(width, height);

        return(scene);
    }
});