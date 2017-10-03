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
var {Canvas} = require('./canvas.js');
var {Molecules} = require('./molecules.js');

/*
  CSS
*/
import './stylesheet.css';
import 'rc-slider/assets/index.css';

/*
  Data import
*/
const json = require('./data.json')

var Index = createReactClass({

  getInitialState(){
    return {secondsElapsed: 0,
            equation: this.props.equations[0], equations: this.props.equations,
            buffer: this.props.buffers[0], buffers: this.props.buffers,
            strongs: this.props.strongs, strong: this.props.strongs[0],
            data: json, HAmount: 500, AAmount: 500, strongAmount: 0};
    },

  changeCheckbox(event){
    // add else ifs to target additional checkboxes by id
    if(event.currentTarget.id=='buffer'){
      this.setState({buffer: event.currentTarget.name});
      this.changeEquation(event.currentTarget.name);
    } else {
      this.setState({strong: event.currentTarget.name});
    }
  },

  changeHAVolume(value){
    this.setState({HAmount: value});
  },

  changeAVolume(value){
    this.setState({AAmount: value});
  },

  changeStrongVolume(value){
    this.setState({strongAmount: value});
  },

  changeEquation(value) {
    switch(value){
        case (this.props.buffers[0]):
            this.setState({equation: this.props.equations[0]});
            break;
        case (this.props.buffers[1]):
            this.setState({equation: this.props.equations[1]});
            break;
        case (this.props.buffers[2]):
            this.setState({equation: this.props.equations[2]});
            break;
        case (this.props.buffers[3]):
            this.setState({equation: this.props.equations[3]});

    }
  },


  render() {
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
            <div className="col-sm-6 text-left"> 
                <h1>The Reaction Space</h1>
                  <p>Buffer: {this.state.buffer}</p>
                  <p>Vol 1: {this.state.HAmount}</p>
                  <p>Vol 2: {this.state.AAmount}</p>
                  <p>Strong: {this.state.strong}</p>
                  <p>Strong Vol: {this.state.strongAmount}</p>

                <div id='canvas-well'> 
                    <div><Canvas volume1={this.state.HAmount} volume2={this.state.AAmount} volume3={this.state.strongAmount}/></div>
                    <div><Molecules buffer={this.state.buffer}/></div>
                </div>
                <div id='equation-well'>
                    <div><h3>Equation: {this.state.equation}</h3></div>
                </div>
            </div>
            <div className="col-sm-3"> 
                <div id="viz"></div>
                  <div>
                     <div><Graph config={this.state.data}/></div>
                  </div>
              </div>
            <div className="col-sm-3 sidenav">
              <div className="panel panel-default">
                <div className="panel-body">Selection</div>
               
              <div className="well">
                <div>
                  <p> Buffer </p>
                  <div><Checkbox options={this.state.buffers} currentOption={this.state.buffer} id='buffer' onClick={this.changeCheckbox}/></div>
                </div>
              </div>

              <div className="well" id='HA-slider'>
                  <div>
                    <p> Vol 1 </p>
                    <SlideBar min={0} max={1000} step={50} buffer={'HA'} amount={this.state.HAmount} onChange={this.changeHAVolume}/>
                  </div>
              </div>

              <div className="well" id='A-slider'>
                <div>
                  <p> Vol 2 </p>
                  <SlideBar min={0} max={1000} step={50} buffer={'A'} amount={this.state.AAmount} onChange={this.changeAVolume}/>
                </div>
              </div>
              
              <div className="well">
                  <div>
                    <p> Strong Acid/Base </p>
                    <div><Checkbox options={this.props.strongs} currentOption={this.state.strong} id='strong' onClick={this.changeCheckbox}/></div>
                    <div><br/>
                      <SlideBar min={0} max={200} step={50} buffer={this.state.strong} amount={this.state.strongAmount} onChange={this.changeStrongVolume} />
                    </div>
                  </div>
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
  equations={["1", "2", "3", "4"]}
  buffers={["0.10 M HA + 0.10 M NaA", "0.10 M HF + 0.10 M NaF",  "0.10 M HClO + 0.10 M NaClO", "0.10 M NH\u2084Cl + 0.10 M NH\u2083"]} 
  strongs ={['None', 'HCL', 'NaOH']}/></div>,
  document.getElementById("container"))





