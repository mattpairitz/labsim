import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

import PropTypes from 'react/lib/ReactPropTypes';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

export var Shape = createReactClass ({

	getDefaultProps: function () {

		return {
	    size: PropTypes.number.isRequired,
	    color: PropTypes.any.isRequired,
	    x: PropTypes.number.isRequired,
	    y: PropTypes.number.isRequired,
	    z: PropTypes.number.isRequired,
	    rx: PropTypes.number.isRequired,
	    ry: PropTypes.number.isRequired,
	    rz: PropTypes.number.isRequired,
	    s: PropTypes.number.isRequired,
	};
	},

	render() {
		const {
			    size,
			    color,
			    x,
			    y,
			    z,
		} = this.props;

		return (<group>
					<mesh
				        position={new THREE.Vector3(x, y, z)}
				    >
				        <circleGeometry
		                    radius = {size}
		                    segments = {20}
		                    thetaStart = {0}
		                    thetaLength = {Math.PI * 2}
		                />
				        <meshBasicMaterial
		                    color={color}
		                />
				    </mesh>
				    <line
				        position={new THREE.Vector3(x, y, z)}
				    >
				        <lineBasicMaterial
				          color={0x000000}
				          // wireframe
				        />
				    </line>
				</group>
			)
	}
});	