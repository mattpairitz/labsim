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
var {Collapse} = require('react-collapse');
var {Reset} = require('./reset.js');
var {Calculations} = require('./calculations.js');

/*
  CSS
*/
import './stylesheet.css';
import 'rc-slider/assets/index.css';

var Index = createReactClass({

  getInitialState(){
    return {equation: this.props.equations['HA NaA'], reaction: this.props.reactions['None'],
            buffer: this.props.buffers[0], strong: this.props.strongs[0],
            warning: this.props.warnings[0], volumes: {'H': 500, 'A': 500, 'strong': 0 , 'total': 1000}, 
            validity: true, viewControl: {'graph': true, 'anim': true, 'beaker': true}, pH: 5, open: true};
  },

  getTotalVolume(){
    let volumes = this.state.volumes
    let H, A, strong;
    ({H, A, strong} = volumes);
    return H+A+strong;
  },

  restartLab(event){
    this.setState({viewControl: {'graph': true, 'anim': true, 'beaker': true}});
    this.setState({volumes: {'H': 500, 'A': 500, 'strong': 0 , 'total': 1000}})
    this.setState({equation: this.props.equations['HA NaA']});
    this.setState({reaction: this.props.reactions['None']});
    this.setState({buffer: this.props.buffers[0]});
    this.setState({strong: this.props.strongs[0]});
    this.setState({warning: this.props.warnings[0]});
    this.setState({pH: 5});
    this.setState({open: true});
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

  changeVolume(id, value){
    // Use id as dict key to change volume state
    let volumes = this.state.volumes;
    let total = volumes['total'] + value - volumes[id];
    volumes[id] = value;
    volumes['total'] = total;
    this.setState({volumes: volumes});
    this.checkValidity();
  },

  checkValidity(){
    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);
    if (H == 0 || A == 0){

      this.setState({validity: false, warning: this.props.warnings[1]});
    }
    else if (H * 10 < A || H * .1 > A){
      this.setState({validity: false, warning: this.props.warnings[2]});
    }
    else {
      this.setState({validity: true, warning: this.props.warnings[0]});
    }
  },

  changeEquation(value) {
    this.setState({equation: this.props.equations[value]});
  },

  changeReaction(value){
    let buffer = this.state.buffer;
    let key = buffer+value

      if(value == 'None'){
        this.setState({reaction: this.props.reactions[value]});
      } else {
        this.setState({reaction: this.props.reactions[key]});
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

    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);

    return (
      <div className="app">
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
            <div className="col-sm-10 text-center"> 

            <div><div className="view" >
                 <Collapse isOpened={viewControl['beaker']}>
                 <h3>Beaker View</h3><br/>
                  <Canvas volume1={H} volume2={A} volume3={strong} pH={this.state.pH}/>
                  <Equation equation={this.state.equation} reaction={this.state.reaction}/>
                </Collapse>
              </div></div>  

              <div><div className="view" >
                <Collapse isOpened={viewControl['anim']}>
                  <h3>Molecule View</h3><br/>  
                    <div><Molecules buffer={this.state.buffer} strong={this.state.strong}/></div>
                </Collapse>
              </div></div>         
              
              <div className="view" >
              <Collapse isOpened={viewControl['graph']}>
                  <div><h3>Graph View</h3>
                    <div id="viz">
                      <div>
                         <div><Graph volume1={H} volume2={A} volume3={strong} 
                                buffer={this.state.buffer} strong={this.state.strong}/></div>
                      </div>
                    </div>
                </div>
                </Collapse>
              </div>
            </div>

            <div className="col-sm-2 sidenav">
              <div className="panel panel-default">
                <div className="panel-body"></div>
                  <ControlPanel viewControl={this.state.viewControl} onClick={this.toggleComponentView} />
                  <br/>
                    <div id='buffer-selection'>
                    <div className={!this.state.open ? 'hidden' : ''}>
                      <div className="well">
                        <div>
                          <p> Buffer </p>
                          <div><Checkbox id='buffer' options={this.props.buffers} currentOption={this.state.buffer} onClick={this.changeCheckbox}/></div>
                        </div>
                      </div>

                      <div className="well" id='HA-slider'>
                          <div>
                            <p> {buffer_left} Volume </p>
                            <SlideBar min={1} max={1000} step={1} buffer={buffer_left} amount={H} onChange={this.changeVolume.bind(this, 'H')}/>
                          </div>
                      </div>

                      <div className="well" id='A-slider'>
                        <div>
                          <p> {buffer_right} Volume </p>
                          <SlideBar min={1} max={1000} step={1} buffer={buffer_right} amount={A} onChange={this.changeVolume.bind(this, 'A')}/>
                        </div>
                      </div>
                        <div className={this.state.validity ? '' : 'hidden'}>
                          <button type="button" id="btn" className="btn btn-primary" onClick={() => this.setState({open: false})}>Next <span className="glyphicon glyphicon-arrow-right"></span></button>
                        </div>
                        <p id="warning-message">{this.state.warning}</p> 
                      </div>
                    

              <div id='strong-selection'>
                  </div>
                  <div className={this.state.open ? 'hidden' : ''}>
                  <div className="well">
                    <p id= "strong-label" className={this.state.strong=="None" ? 'hidden' : ''}>{this.state.strong}</p>
                    <p id= "strong-label"> Volume</p>
                    <div><Checkbox id='strong' options={this.props.strongs} currentOption={this.state.strong} onClick={this.changeCheckbox}/></div>
                    <div><br/>
                      <SlideBar min={0} max={200} step={1} buffer={this.state.strong} amount={strong} onChange={this.changeVolume.bind(this, 'strong')} />
                    </div>
                    <br/>

                    
                    <button type="button" id="back-btn" className="btn btn-primary" onClick={() => this.setState({open: true})}>
                      <span className="glyphicon glyphicon-arrow-left"></span>Back
                    </button>
                    <br/>
                    <Reset onClick={this.restartLab}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
          <footer><Calculations buffer={this.state.buffer} strong={this.state.strong} volumes={volumes}/></footer>
      </div>

      );
  }
});
ReactDOM.render(<div><Index
  reactions={{"None": " ", "HA NaAHCL": "Reaction: H\u207A + A\u207B \u21CC HA", "HF NaFHCL": "Reaction: H\u207A + F\u207B \u21CC HF",
  "HClO NaClOHCL": "Reaction: H\u207A + ClO\u207B \u21CC HClO", "NH\u2084Cl NH\u2083HCL": "Reaction: H\u207A + NH\u2083 \u21CC NH\u2084\u207A",
  "HA NaANaOH": "Reaction: OH\u207B + HA \u21CC H\u2082O + A\u207B", "HF NaFNaOH": "Reaction: OH\u207B + HF \u21CC H\u2082O + F\u207B",
  "HClO NaClONaOH": "Reaction: OH\u207B + HClO \u21CC H\u2082O + ClO\u207B", "NH\u2084Cl NH\u2083NaOH": "Reaction: OH\u207B + NH\u2084\u207A \u21CC H\u2082O + NH\u2083"}}
  equations={{"HA NaA": "HA + H\u2082O \u21CC H\u2083O\u207A + A\u207B", "HF NaF":"HF + H\u2082O \u21CC H\u2083O\u207A + F\u207B",
  "HClO NaClO": "HClO + H\u2082O \u21CC H\u2083O\u207A + ClO\u207B", "NH\u2084Cl NH\u2083": "NH\u2083 + H\u2082O \u21CC OH\u207B + NH\u2084\u207A"}}
  buffers={["HA NaA", "HF NaF",  "HClO NaClO", "NH\u2084Cl NH\u2083"]}
  strongs ={['None', 'HCL', 'NaOH']}
  warnings ={['', 'Buffer must contain both an acid and base!', 'Both components must be within 10x of each other in volume!']}/></div>,
  document.getElementById("container"))





