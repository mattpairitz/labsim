/*
  Node dependencies
*/
var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

/*
  Components
*/
var {Checkbox} = require('./checkbox.js');
var {Graph} = require('./graph.js');
var {SlideBar} = require('./slider.js');
import Slider from "rc-slider";

/*
  CSS
*/
require("./stylesheet.css");
import 'rc-slider/assets/index.css';

/*
  Data import
*/
const json = require('./data.json');

var Index = createReactClass({

  getInitialState: function(){
    return {secondsElapsed: 0, buffer: this.props.list[0], 
            buffers: this.props.list, data: json, HAmount: 500, AAmount: 500};
  },

  changeBuffer: function(event){
    this.setState({buffer: event.currentTarget.name});
  },

  changeHAVolume: function(value){
    this.setState({HAmount: value});
  },

  changeAVolume: function(value){
    this.setState({AAmount: value});
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
              </button>
                <a className="navbar-brand" href="#"></a>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
              <li className="active"><a href="#">LabSim</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid text-center">    
          <div className="row content">
            <div className="col-sm-9 text-left"> 
              <h1>The Reaction Space</h1>
                <p>Buffer: {this.state.buffer}</p>
              <div id='graph-well'>

              <div id="viz"></div>
                <div>
                  <div><Graph config={this.state.data}/></div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 sidenav">
              <div className="well">
                <div>
                  <p>Buffer: {this.state.buffer}</p>
                </div>
                <div>
                  <div><Checkbox options={this.state.buffers} currentOption={this.state.buffer} onClick={this.changeBuffer}/></div>
                </div>
              </div>

              <div className="well" id='HA-slider'>
                  <div>
                    <SlideBar min={0} max={1000} step={50} buffer={this.state.buffer} amount={this.state.HAmount} onChange={this.changeHAVolume}/>
                  </div>
              </div>

              <div className="well" id='A-slider'>
                <div>
                  <SlideBar min={0} max={1000} step={50} buffer={this.state.buffer} amount={this.state.AAmount} onChange={this.changeAVolume}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      );
  }
});
ReactDOM.render(<div><Index 
  list={["0.10 M HA + 0.10 M NaA", "0.10 M HF + 0.10 M NaF",  "0.10 M HClO + 0.10 M NaClO", "0.10 M NH\u2084Cl + 0.10 M NH\u2083"] }/></div>, 
  document.getElementById("container"))





