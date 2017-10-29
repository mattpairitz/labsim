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
var {ControlPanel} = require('./controlPanel.js');

/*
  CSS
*/
import './stylesheet.css';
import 'rc-slider/assets/index.css';

var Index = createReactClass({

  getInitialState(){
    return {equation: this.props.equations[0], equations: this.props.equations,
            reaction: this.props.reactions[0], reactions: this.props.reactions,
            buffer: this.props.buffers[0], buffers: this.props.buffers,
            strong: this.props.strongs[0], strongs: this.props.strongs,
            warning: this.props.warnings[0], warnings: this.props.warnings,
            HAmount: 500, AAmount: 500, strongAmount: 0, validity: true,
            viewControl: {'graph': false, 'anim': false, 'beaker': false, 'equation': false} };
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
    this.checkValidity();
  },

  changeAVolume(value){
    this.setState({AAmount: value});
    this.checkValidity();
  },

  changeStrongVolume(value){
    this.setState({strongAmount: value});
  },

  checkValidity(){
    if (this.state.HAmount == 0 || this.state.AAmount == 0){
      this.setState({validity: false, warning: this.state.warnings[1]});
      this.buttonCheck();
    }
    else if (this.state.HAmount * 10 < this.state.AAmount || this.state.HAmount * .1 > this.state.AAmount){
      this.setState({validity: false, warning: this.state.warnings[2]});
      this.buttonCheck();
    }
    else {
      this.setState({validity: true, warning: this.state.warnings[0]});
      this.buttonCheck();
    }
  },

  buttonCheck(){
    if(this.state.validity == false){
      document.getElementById("btn").disabled = true;
    }
    else{
      document.getElementById("btn").disabled = false;
    }
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

  buttonPress(){
    document.getElementById("strong-selection").style.display = 'block';
    document.getElementById("btn").style.display = 'none';
    document.getElementById("buffer-selection").style.display = 'none';
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
      if(value == this.state.strongs[1]){
          if(this.state.buffer == this.state.buffers[0]){
              this.setState({reaction: this.state.reactions[1]});
          }
          if(this.state.buffer == this.state.buffers[1]){
              this.setState({reaction: this.state.reactions[2]});
          }
          if(this.state.buffer == this.state.buffers[2]){
              this.setState({reaction: this.state.reactions[3]});
          }
          if(this.state.buffer == this.state.buffers[3]) {
              this.setState({reaction: this.state.reactions[4]});
          }
      }
      if(value == this.state.strongs[2]){
          if(this.state.buffer == this.state.buffers[0]){
              this.setState({reaction: this.state.reactions[5]});
          }
          if(this.state.buffer == this.state.buffers[1]){
              this.setState({reaction: this.state.reactions[6]});
          }
          if(this.state.buffer == this.state.buffers[2]){
              this.setState({reaction: this.state.reactions[7]});
          }
          if(this.state.buffer == this.state.buffers[3]) {
              this.setState({reaction: this.state.reactions[8]});
          }
      }
  },

  toggleComponentView(event){
    let state = JSON.parse(event.target.value);
    let id = event.target.id;
    let newViewControl = this.state.viewControl;
    newViewControl[id] = !state;
    this.setState({viewControl: newViewControl})
  },


  render() {
    let buffer = this.state.buffer;
    let [buffer_left, buffer_right] = buffer.split(" ");
    let viewControl = this.state.viewControl;
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
            <div className="col-sm-5 text-left"> 

            <br/>
              <div>
                 <label className="switch"> 
                  <input id='toggle' type="checkbox" onClick={this.toggleSwitch}/>
                  <span className="check round"></span>
                </label>
                 <h5>Component Toggle</h5>
              </div>
              <br/>

                <ControlPanel viewControl={this.state.viewControl} onClick={this.toggleComponentView}/>

                <br/>
                <h3>Beaker/Equation View</h3><br/>
                    <div hidden={viewControl['beaker']}>
                      <Canvas volume1={this.state.HAmount} volume2={this.state.AAmount} volume3={this.state.strongAmount} pH={7}/>
                      <Equation equations={this.props.equations} equation={this.state.equation} reactions={this.props.reactions} reaction={this.state.reaction} />
                    </div>
                <br/>
            </div>

            <div className="col-sm-5 text-center"> 
              <div id='canvas-well'> 
                  <h3>Graph View</h3>
                    <div hidden={viewControl['graph']} id="viz">
                      <div>
                         <div><Graph volume1={this.state.HAmount} volume2={this.state.AAmount} volume3={this.state.strongAmount} 
                                buffer={this.state.buffer} strong={this.state.strong}/></div>
                      </div>
                    </div>
                  <h3>Molecule View</h3><br/>  
                    <div hidden={viewControl['anim']}><Molecules buffer={this.state.buffer} strong={this.state.strong}/></div>
                </div>
              </div>
            <div className="col-sm-2 sidenav">
              <div className="panel panel-default">
                <div className="panel-body">Selection</div>
                    <div id='buffer-selection'>
                      <div className="well">
                        <div>
                          <p> Buffer </p>
                          <div><Checkbox options={this.state.buffers} currentOption={this.state.buffer} id='buffer' onClick={this.changeCheckbox}/></div>
                        </div>
                      </div>

                      <div className="well" id='HA-slider'>
                          <div>
                            <p> Volume 1 </p>
                            <SlideBar min={0} max={1000} step={1} buffer={buffer_left} amount={this.state.HAmount} onChange={this.changeHAVolume}/>
                          </div>
                      </div>

                      <div className="well" id='A-slider'>
                        <div>
                          <p> Volume 2 </p>
                          <SlideBar min={0} max={1000} step={1} buffer={buffer_right} amount={this.state.AAmount} onChange={this.changeAVolume}/>
                        </div>
                      </div>
                        <button id= "btn" type="button" className="btn btn-success btn-block" onClick={this.buttonPress}>Confirm</button>
                        <p id="warning-message">{this.state.warning}</p>
                        <br/>
                    </div>
              <div className="well" id='strong-selection'>
                  <div>
                    <p> Strong Acid/Base </p>
                    <div><Checkbox id='strong' options={this.state.strongs} currentOption={this.state.strong} onClick={this.changeCheckbox}/></div>
                    <div><br/>
                      <SlideBar min={0} max={200} step={1} buffer={this.state.strong} amount={this.state.strongAmount} onChange={this.changeStrongVolume} />
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
  reactions={[" ", "Reaction: H\u207A + A\u207B \u21CC HA", "Reaction: H\u207A + F\u207B \u21CC HF",
  "Reaction: H\u207A + ClO\u207B \u21CC HClO", "Reaction: H\u207A + NH\u2083 \u21CC NH\u2084\u207A",
  "Reaction: OH\u207B + HA \u21CC H\u2082O + A\u207B", "Reaction: OH\u207B + HF \u21CC H\u2082O + F\u207B",
  "Reaction: OH\u207B + HClO \u21CC H\u2082O + ClO\u207B", "Reaction: OH\u207B + NH\u2084\u207A \u21CC H\u2082O + NH\u2083"]}
  buffers={["HA NaA", "HF NaF",  "HClO NaClO", "NH\u2084Cl NH\u2083"]} 
  strongs ={['None', 'HCL', 'NaOH']}
  warnings ={['', 'Buffer must contain both an acid and base!', 'Both components must be within 10x of each other in volume!']}/></div>,
  document.getElementById("container"))





