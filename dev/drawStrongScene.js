import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
var createReactClass = require('create-react-class');

export var Strong = createReactClass ({
	getIntialState() {
		return {strong: this.props.strong, rotation: new THREE.Euler()}
	},

	componentWillMount() {
        this.setState({strong: this.props.strong})
        this.randomizePositions(3);

       /* SIMPLE ANIMATION FUNCTION */
        this._onAnimate = () => {
           this.setState({
                rotation: new THREE.Euler(
                0,
                0,
                this.state.rotation.z + 0.0075
                ),
            });
        };
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

        }	return (this.moleculePositions);
    },

    drawScene() {
    	var strong = this.props.strong;

    	switch (strong) {
    		case "None" :
    			return (<group></group>);
    		case "HCl":
    			return (this.drawAcid());
    		case "NaOH":
    			return (this.drawBase());
    	}
    },

/*********** Draw Scene with HCl *********/
    drawAcid() {
    	return(<group>
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
            </group>)
    },

    /********* Draw Scene with NaOH ********/
    drawBase() {
    	var hydroPos = new THREE.Vector3(
    						this.moleculePositions[1].x + 0.6,
    						this.moleculePositions[1].y,
    						this.moleculePositions[1].z);

    	return(<group>
    			<mesh
                        position = {this.moleculePositions[0]}
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
                    <group>
	                    <mesh
	                        position = {hydroPos}
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
	                            color={0xFF0D0D}
	                            side = {THREE.DoubleSide}
	                        />
	                    </mesh>
                    </group>
                </group>)
    },

	render() {
		var scene = this.drawScene();
		return(scene);

	}
});