import React from 'react';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import {DrawBufferScene} from './DrawBufferScene.js';
var createReactClass = require('create-react-class');

export var Molecules = createReactClass ({

    getInitialState() {
       return {buff1: null, buff2: null, strong: null}
    },

    componentWillMount() {
        var buffer = this.props.buffer;
        var [buff1, buff2] = buffer.split(" ");
        var strong = this.props.strong;
        this.updateState(buff1, buff2, strong);
    },

    componentWillReceiveProps(nextProps) {
        /* Split inoming equations into Molecule types */
        var buffer = nextProps.buffer;
        var [buff1, buff2] = buffer.split(" ");
        var strong = nextProps.strong;
        this.updateState(buff1, buff2, strong);
    },

    /******* UPDATE BUFFER SELECTION *********/
    updateState(buff1, buff2, strong){
        this.setState({buff1: buff1})
        this.setState({buff2: buff2})
        this.setState({strong: strong})    
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.buffer !== this.props.buffer;
    },
    
    render() {
        var width = 300;
        var height = 300;
<<<<<<< HEAD
        
        console.log(this.state.mole3);
=======
        //console.log(this.state.buff1);
>>>>>>> origin/master

        return(
                <div> 
                    <DrawBufferScene buff1={this.state.buff1} strong={this.state.strong}/>
                </div>
            )
    }
});
