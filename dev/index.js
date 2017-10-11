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
var {Equation} = require('./equation.js');

/*
  CSS
*/
import './stylesheet.css';
import 'rc-slider/assets/index.css';

var Index = createReactClass({

  getInitialState(){
    return {secondsElapsed: 0,
            equation: this.props.equations[0], equations: this.props.equations,
            reaction: this.props.reactions[0], reactions: this.props.reactions,
            buffer: this.props.buffers[0], buffers: this.props.buffers,
            strong: this.props.strongs[0], strongs: this.props.strongs,
            HAmount: 500, AAmount: 500, strongAmount: 0};
  },

  changeCheckbox(event){
    // add else ifs to target additional checkboxes by id
    if(event.currentTarget.id=='buffer'){
        this.setState({buffer: event.currentTarget.name});
        this.changeEquation(event.currentTarget.name);
        this.changeReaction(this.state.strong);
      }
    else {
        this.setState({strong: event.currentTarget.name});
        this.changeReaction(event.currentTarget.name);
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

  toggleSwitch(){
    let toggle = document.getElementById('toggle').value;
    toggle = toggle==='on' ? 'off' : 'on';
    document.getElementById('toggle').value = toggle;
    if(toggle==='off'){
      document.getElementById('react-state').style.display = 'inline';
    } else {
      document.getElementById('react-state').style.display = '';
    }
    
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
            break;
    }
  },

  changeReaction(value){
      if(value == this.state.strongs[0]){
          this.setState({reaction: this.state.reactions[0]});
      }
      else {
          switch (this.state.buffer) {
              case(this.state.buffers[0]):
                  if (value == this.state.strongs[1]) {
                      this.setState({reaction: this.props.reactions[1]});
                      break;
                  }
                  if (value == this.state.strongs[2]) {
                      this.setState({reaction: this.props.reactions[5]});
                      break;
                  }
              case(this.state.buffers[1]):
                  if (value == this.state.strongs[1]) {
                      this.setState({reaction: this.props.reactions[2]});
                      break;
                  }
                  if (value == this.state.strongs[2]) {
                      this.setState({reaction: this.props.reactions[6]});
                      break;
                  }
              case(this.state.buffers[2]):
                  if (value == this.state.strongs[1]) {
                      this.setState({reaction: this.props.reactions[3]});
                      break;
                  }
                  if (value == this.state.strongs[2]) {
                      this.setState({reaction: this.props.reactions[7]});
                      break;
                  }
              case(this.state.buffers[3]):
                  if (value == this.state.strongs[1]) {
                      this.setState({reaction: this.props.reactions[4]});
                      break;
                  }
                  if (value == this.state.strongs[2]) {
                      this.setState({reaction: this.props.reactions[8]});
                      break;
                  }
          }
      }
  },


  render() {
    let buffer = this.state.buffer;
    let [buffer_left, buffer_right] = buffer.split(" ");
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
            <div className="col-sm-4 text-left"> 

            <br/>
              <div>
                 <label className="switch"> 
                  <input id='toggle' type="checkbox" onClick={this.toggleSwitch}/>
                  <span className="check round"></span>
                </label>
                
                 <h5>Component Toggle</h5>
              </div>
              <br/>


              <div id='react-state'>
                <h1>The Reaction State</h1>
                  <p>Buffer: {this.state.buffer}</p>
                  <p>Vol 1: {this.state.HAmount}</p>
                  <p>Vol 2: {this.state.AAmount}</p>
                  <p>Strong: {this.state.strong}</p>
                  <p>Strong Vol: {this.state.strongAmount}</p>
              </div>
                <br/>
                <h3>Graph View</h3>
                <div id="viz">
                  <div>
                     <div><Graph volume1={this.state.HAmount} volume2={this.state.AAmount} volume3={this.state.strongAmount} buffer={this.state.buffer} strong={this.state.strong}/></div>
                  </div>
                </div>
                <br/>
                <h3>Equation View</h3>
                <div>
                    <Equation equations={this.props.equations} equation={this.state.equation} reactions={this.props.reactions} reaction={this.state.reaction} />
                </div>
            </div>

            <div className="col-sm-5 text-center"> 
              <div id='canvas-well'> 
                  <h3>Beaker View</h3><br/>
                    <div><Canvas volume1={this.state.HAmount} volume2={this.state.AAmount} volume3={this.state.strongAmount}/></div>
                   <h3>Molecule View</h3><br/>  
                    <div><Molecules buffer={this.state.buffer} strong={this.state.strong}/></div>
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
                    <p> Volume 1 </p>
                    <SlideBar min={0} max={1000} step={50} buffer={buffer_left} amount={this.state.HAmount} onChange={this.changeHAVolume}/>
                  </div>
              </div>

              <div className="well" id='A-slider'>
                <div>
                  <p> Volume 2 </p>
                  <SlideBar min={0} max={1000} step={50} buffer={buffer_right} amount={this.state.AAmount} onChange={this.changeAVolume}/>
                </div>
              </div>
              
              <div className="well">
                  <div>
                    <p> Strong Acid/Base </p>
                    <div><Checkbox id='strong' options={this.state.strongs} currentOption={this.state.strong} onClick={this.changeCheckbox}/></div>
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
  equations={["HA + H\u2082O \u21CC H\u2083O\u207A + A\u207B",
  "HF + H\u2082O \u21CC H\u2083O\u207A + A\u207B",
  "HClO + H\u2082O \u21CC H\u2083O\u207A + ClO\u207B",
  "NH\u2083 + H\u2082O \u21CC OH\u207B + NH\u2084\u207A"]}
  reactions={["0", "1", "2", "3", "4", "5", "6", "7", "8"]}
  buffers={["HA NaA", "HF NaF",  "HClO NaClO", "NH\u2084Cl NH\u2083"]} 
  strongs ={['None', 'HCL', 'NaOH']}/></div>,
  document.getElementById("container"))





