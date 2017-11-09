import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
var createReactClass = require('create-react-class');

export var Strong = createReactClass ({
	getIntialState() {
		return {strong: this.props.strong, rotation: this.props.rotation}
	},

	componentWillMount() {
        this.setState({strong: this.props.strong})
        this.setState({rotation: this.props.rotation})
        this.randomizePositions(1);
    },

    componentWillReceiveProps(nextProps) {
        this.setState({strong: nextProps.strong});
        this.setState({rotation: nextProps.rotation});
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

/*********** Draw Scene with HCl *********/
    drawAcid() {
        var pos1 = new THREE.Vector3(
                            this.moleculePositions[0].x + 0.6,
                            this.moleculePositions[0].y,
                            this.moleculePositions[0].z);

    	return (<group
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
                        position = {pos1}
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
        )
    },

    /********* Draw Scene with NaOH ********/
    drawBase() {
    	var pos1 = new THREE.Vector3(
    						this.moleculePositions[0].x + 0.6,
    						this.moleculePositions[0].y,
    						this.moleculePositions[0].z);

        var pos2 = new THREE.Vector3(
                            this.moleculePositions[0].x + 1.2,
                            this.moleculePositions[0].y,
                            this.moleculePositions[0].z);

    	return (<group
                    rotation = {this.state.rotation}
                >
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
                            color={0xAB5CF2}
                            side = {THREE.DoubleSide}
                        />
                    </mesh>
                    <mesh
                        position = {pos1}
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
	                    position = {pos2}
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
        )
    },

	render() {
        var scene;

        if (this.state.strong === "HCL") {
            scene = this.drawAcid();

        } else if (this.state.strong === "NaOH") {
            scene = this.drawBase();
        } else {
            scene = null;
        }

		return(scene);

	}
});