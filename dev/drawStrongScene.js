import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
var createReactClass = require('create-react-class');

export var Strong = createReactClass ({
    getIntialState() {
        return {strong: this.props.strong, rotation: this.props.rotation,
                    pos1: this.state.pos1, 
                    pos2: this.state.pos2,
                    pos3: this.state.pos3}
    },

    componentWillMount() {
        this.setState({strong: this.props.strong});
        this.setState({rotation: this.props.rotation});
        this.setState({pos1: this.props.pos1});
        this.setState({pos2: this.props.pos2});
        this.setState({pos3: this.props.pos3});
    },

    componentWillReceiveProps(nextProps) {
        this.setState({strong: nextProps.strong});
        this.setState({rotation: nextProps.rotation});
        this.setState({pos1: nextProps.pos1});
        this.setState({pos2: nextProps.pos2});
        this.setState({pos3: nextProps.pos3});
    },

/*********** Draw Scene with HCl *********/
    drawAcid() {
        return (<group
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.state.pos1}
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
                        position = {this.state.pos2}
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
            </group>);
    },

    /********* Draw Scene with NaOH ********/
    drawBase() {
        return (<group
                    rotation = {this.state.rotation}
                >
                    <mesh
                        position = {this.state.pos1}
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
                    <group
                        position = {this.state.pos2}
                    >
                        <mesh
                            position = {this.state.pos2}
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
                            position = {this.state.pos3}
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
            </group>
        )
    },

    render() {
        var scene;

        if (this.state.strong === "HCl") {
            scene = this.drawAcid();

        } else if (this.state.strong === "NaOH") {
            scene = this.drawBase();
        } else {
            scene = null;
        }

        return(scene);

    }
});