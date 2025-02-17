import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {Strong} from './drawStrongScene.js';

var createReactClass = require('create-react-class');

export var DrawBufferScene = createReactClass ({

    getInitialState() {
       return {buff1: this.props.buff1, strong: this.props.strong, 
                    rotation: new THREE.Euler(), react: false}
    },

    componentWillMount() {
        this.setState({buff1: this.props.buff1})
        this.setState({strong: this.props.strong})
        this.setState({react: this.props.react})
        this.randomizePositions(7);
        this.cameraPosition = new THREE.Vector3(0, 0, 5);

       /* SIMPLE ANIMATION FUNCTION */
        this._onAnimate = () => {

           this.setState({
                rotation: new THREE.Euler(
                0,
                0,
                this.state.rotation.z + 0.005
                ),
            });
        };

        console.log(this.state.react);
    },

    componentWillReceiveProps(nextProps) {
        this.setState({strong: nextProps.strong});

        if (nextProps.strong !== "None" /*&& nextProps.strong !== "NaOH"*/) {
            this.setState({react: true});
        } else {
            this.setState({react: false});
        }
    },

    /********* Randomize Molecule Locations On Canvas **********/
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

/******* RANDOMIZE SPECIFIC POSITIONS *******/
    randomize(positions, buffer, strong) {
        var pos1;
        var pos2 = 5;

        if (strong === "HCl") {
            switch (buffer) {
                case 1:
                    pos1 = 3;
                    break;

                case 2:
                    pos1 = 2;
                    break;

                case 3:
                    pos1 = 2;
                    break;

                case 4:
                    pos1 = 1;
                    break;
            }

        } else if (strong === "NaOH") {
            pos1 = 0;
            pos2 = 6;
        }

        positions[pos1] = new THREE.Vector3(
                (Math.random() * 5) - 2,
                (Math.random() * 5) - 2,
                0
            );

        positions[pos2] = new THREE.Vector3(
                (Math.random() * 5) - 2,
                (Math.random() * 5) - 2,
                0
            );
    },

/********* UPDATE POSITIONS OF REACTION MOLECULES ********/
    updatePositions(positions, buffer, strong) {
        var radius = 0.6;
        var pos1;
        var pos2;

        if (strong === "HCl") {
            switch (buffer) {
                case 1:
                    pos1 = 3;
                    pos2 = 5;

                    positions[pos1] = new THREE.Vector3(0, 0, 0); 
                    positions[pos2] = new THREE.Vector3(radius, 0, 0);
                    break;

                case 2:
                    pos1 = 2;
                    pos2 = 5;

                    positions[pos1] = new THREE.Vector3(0, 0, 0); 
                    positions[pos2] = new THREE.Vector3(radius, 0, 0);
                    break;

                case 3:
                    pos1 = 2;
                    pos2 = 5;
                    
                    positions[pos1] = new THREE.Vector3(0, 0, 0); 
                    positions[pos2] = new THREE.Vector3(-radius, 0, 0);
                    break;

                case 4:
                    pos1 = 1;
                    pos2 = 5;

                    positions[pos1] = new THREE.Vector3(0, 0, 0); 
                    positions[pos2] = new THREE.Vector3(0, 0.75, 0);
                    break;
            }

        } else if (strong === "NaOH") {
            pos1 = 0;
            pos2 = 6;

            switch (buffer) {

                case 1:
                    positions[pos1] = new THREE.Vector3(0, (-radius), 0);
                    positions[pos2] = new THREE.Vector3(0, 0, 0);
                    break;

                case 2:
                    positions[pos1] = new THREE.Vector3(0, (-radius), 0);
                    positions[pos2] = new THREE.Vector3(0, 0, 0);
                    break;

                case 3:
                    positions[pos1] = new THREE.Vector3((-radius), 0, 0);
                    positions[pos2] = new THREE.Vector3(0, 0, 0);
                    break;

                case 4:
                    positions[pos1] = new THREE.Vector3(0, 0.75, 0);
                    positions[pos2] = new THREE.Vector3(0, 0, 0);
                    break;
            }
        }
    },

/********* CALCULATE POSITIONS OF HYDROGENS for NH4 & NH3 & H2O **********/
    addHydrogen(molecule, num) {
        this.hydroPosition = [];
        var radius = 0.75;

        if (num == 3 || num == 4) {
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

        } else if (num == 2) {
            //LEFT CIRCLE
            this.hydroPosition.push(new THREE.Vector3(
                    molecule.x - (radius / 2),
                    molecule.y - (radius / 2),
                    molecule.z));

            //RIGHT CIRCLE
            this.hydroPosition.push(new THREE.Vector3(
                    molecule.x + (radius / 2),
                    molecule.y - (radius / 2),
                    molecule.z));

            return (this.hydroPosition);

        } else { 
            return (this.hydroPosition);
        }
    },

/********* ATTATCH MOLECULES TOGETHER *********/
    attachMolecules(molecule, num) {
        this.newPosition = [];
        var radius = 0.6;

        for (var i = 0; i < num; i++) {
            this.newPosition.push(new THREE.Vector3(
                molecule.x + (radius * (i + 1)),
                molecule.y,
                molecule.z));
        }

        return (this.newPosition);
    },

    /********* DRAW BUFFER SCENE **********/
    drawBufferScene(width, height) {
        var buffer = this.props.buff1;

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
        var newPos1 = this.attachMolecules(this.moleculePositions[0], 1);
        var hydroPos1 = this.addHydrogen(this.moleculePositions[4], 2);

        var strongPos3 = this.attachMolecules(this.moleculePositions[6], 1);

        return (
            <div>
                <React3
                    mainCamera="camera"
                    width = {width}
                    height = {height}
                    clearColor = {0x3DAEE2}

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
                        rotation = {this.state.rotation}
                    >
                        <mesh
                            position = {this.moleculePositions[0]}
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
                            position = {newPos1[0]}
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
                        position = {this.moleculePositions[2]}
                        rotation = {this.state.rotation}
                    >  
                        <mesh
                            position = {this.moleculePositions[2]}
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
                            position = {this.moleculePositions[3]}
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
                        position = {this.moleculePositions[4]}
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
                            position = {this.moleculePositions[4]}
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
                    <group>
                        <Strong strong={this.state.strong} rotation={this.state.rotation} pos1={this.moleculePositions[5]} pos2={this.moleculePositions[6]} pos3={strongPos3[0]}/>
                    </group>
                  </scene>
                </React3>

                <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.updatePositions(this.moleculePositions, 1, this.state.strong)}>React</button>
                <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.randomize(this.moleculePositions, 1, this.state.strong)}>UNReact</button>
                <button type="button" id="btn" className="btn btn-primary" onClick={() => this.randomizePositions(7)}>Randomize</button>
            </div>)
    },

    /********** BUFFER SCENE 2: HF and NaF ***********/
    drawBuffer2(width, height) {
        var newPos1 = this.attachMolecules(this.moleculePositions[0], 1);
        var hydroPos1 = this.addHydrogen(this.moleculePositions[3], 2);

        var strongPos3 = this.attachMolecules(this.moleculePositions[6], 1);

        return (
            <div>
                <React3
                    mainCamera="camera" // this points to the perspectiveCamera below
                    width={width}
                    height={height}
                    clearColor = {0x3DAEE2}

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
                        rotation = {this.state.rotation}
                    >
                        <mesh
                            position = {this.moleculePositions[0]}
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
                            position = {newPos1[0]}
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
                        rotation = {this.state.rotation}
                    >    
                        <mesh
                            position = {this.moleculePositions[1]}
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
                            position = {this.moleculePositions[2]}
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
                            position = {this.moleculePositions[3]}
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
                    <group>
                        <Strong strong={this.state.strong} rotation={this.state.rotation} pos1={this.moleculePositions[5]} pos2={this.moleculePositions[6]} pos3={strongPos3[0]}/>
                    </group>
                  </scene>
                </React3>

                <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.updatePositions(this.moleculePositions, 2, this.state.strong)}>React</button>
                <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.randomize(this.moleculePositions, 2, this.state.strong)}>UNReact</button>
                <button type="button" id="btn" className="btn btn-primary" onClick={() => this.randomizePositions(7)}>Randomize</button>
            </div>)
    },

    /********** BUFFER SCENE 3: HClO and NaClO ***********/
    drawBuffer3(width, height) {
        var newPos1 = this.attachMolecules(this.moleculePositions[0], 2);
        var newPos2 = this.attachMolecules(this.moleculePositions[2], 1);
        var hydroPos1 = this.addHydrogen(this.moleculePositions[3], 2);

        var strongPos3 = this.attachMolecules(this.moleculePositions[6], 1);

        return (<div>
            <React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                clearColor = {0x3DAEE2}

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
                        position = {newPos1[1]}
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
                    <mesh
                        position = {newPos1[0]}
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
                        position = {this.moleculePositions[1]}
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
                    rotation = {this.state.rotation}
                >    
                    <mesh
                        position = {this.moleculePositions[2]}
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
                    <mesh
                        position = {newPos2[0]}
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
                    position = {this.moleculePositions[3]}
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
                        position = {this.moleculePositions[3]}
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
                <group>
                    <Strong strong={this.state.strong} rotation={this.state.rotation} pos1={this.moleculePositions[5]} pos2={this.moleculePositions[6]} pos3={strongPos3[0]}/>
                </group>
              </scene>
            </React3>

            <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.updatePositions(this.moleculePositions, 3, this.state.strong)}>React</button>
            <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.randomize(this.moleculePositions, 3, this.state.strong)}>UNReact</button>
            <button type="button" id="btn" className="btn btn-primary" onClick={() => this.randomizePositions(7)}>Randomize</button>

            </div>)
    },

    /********** BUFFER SCENE 4: NH4Cl and NH3 ***********/
    drawBuffer4(width, height) {
        var hydroPos1 = this.addHydrogen(this.moleculePositions[0], 4);
        var hydroPos2 = this.addHydrogen(this.moleculePositions[1], 3);
        var hydroPos3 = this.addHydrogen(this.moleculePositions[3], 2);

        var strongPos3 = this.attachMolecules(this.moleculePositions[6], 1);

        return (<div>
            <React3
                mainCamera="camera" // this points to the perspectiveCamera below
                width={width}
                height={height}
                clearColor = {0x3DAEE2}

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
                    position = {this.moleculePositions[1]}
                    rotation = {this.state.rotation}
                > 
                    <mesh
                        position = {hydroPos2[0]}
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
                    position = {this.moleculePositions[3]}
                    rotation = {this.state.rotation}
                > 
                    <mesh
                        position = {hydroPos3[0]}
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
                        position = {hydroPos3[1]}
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
                        position = {this.moleculePositions[3]}
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
                <group>
                   <Strong strong={this.state.strong} rotation={this.state.rotation} pos1={this.moleculePositions[5]} pos2={this.moleculePositions[6]} pos3={strongPos3[0]}/>
                </group>
              </scene>
            </React3>

            <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.updatePositions(this.moleculePositions, 4, this.state.strong)}>React</button>
            <button type="button" disabled={!this.state.react} id="btn" className="btn btn-primary" onClick={() => this.randomize(this.moleculePositions, 4, this.state.strong)}>UNReact</button>
            <button type="button" id="btn" className="btn btn-primary" onClick={() => this.randomizePositions(7)}>Randomize</button>

            </div>)
    },

    render() {
        var width = 270;
        var height = 300;
        var scene = this.drawBufferScene(width, height);

        return(scene);
    }
});