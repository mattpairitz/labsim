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
            volumes: {'H': 500, 'A': 500, 'strong': 0 },
            open: true,
            HAmount: 600, AAmount: 500, strongAmount: 0, validity: true,
            viewControl: {'graph': true, 'anim': true, 'beaker': true}, pH: 7};
  },

  restartLab(event){
    this.setState({viewControl: {'graph': true, 'anim': true, 'beaker': true}});
    this.setState({volumes: {'H': 500, 'A': 500, 'strong': 0 }})
    this.setState({equation: this.props.equations[0]});
    this.setState({reaction: this.props.reactions[0]});
    this.setState({buffer: this.props.buffers[0]});
    this.setState({strong: this.props.strongs[0]});
    this.setState({pH: 7});
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
    let volumes = this.state.volumes;
    volumes[id] = value
    this.setState({volumes: volumes})
    
    //this.calculatePH();
    this.checkValidity();
  },

  checkValidity(){
    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);
    if (H == 0 || A == 0){
      this.setState({validity: false, warning: this.state.warnings[1]});
      this.buttonCheck();
    }
    else if (H * 10 < A || H * .1 > A){
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

  calculatePH(){
    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);
    var total = (H + A + strong);
    var Ka = 0.00001
    var molarityHA = this.getMolarity(H)
    var molarityA = this.getMolarity(A)
    var fmolesHA = molarityHA/(total/1000)
    var fmolesA = molarityA/(total/1000)
    var Hplus = (Ka*fmolesHA)/fmolesA
    var pH = -Math.log(Hplus)
    //this.setState({pH: pH})
    //console.log(pH.toPrecision(4))
  },

  getTotalVolume(){
    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);
    return H+A+strong;
  },

  getMolarity(volume){
        return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4 }).format((volume*.1/1000));
  },

  getPH(HA, A, Ka, Kb){
    var pH=0;
    var total = this.getTotalVolume()
    // if(HA>=A){
    var x = A+Ka
    //console.log("1: " + x)
    x = Math.pow(x, 2)
    //console.log("2: " + x)
    x = x + 4*HA*Ka
    //console.log("3: " + x)
    x = -(A+Ka) + Math.sqrt(x)
    //console.log("4: " + x)
    x = x/2
    //console.log("5: " + x)
    HA = HA-x
    //console.log("HA: " + HA)
    A = A+x
    //console.log("A: "+ A)
    var a = HA/total;
    var b = A/total;
    var Hplus = Ka*a/b
    //console.log("H+: " + Hplus)
    pH = -Math.log(Hplus)
    //console.log("Ph: " + pH)
    // } else {
    //   x = (-(HA+Kb)+(Math.sqrt(Math.pow(HA+Kb), 2) + 4*HA*Kb))/2
    //   pH = 14+Math.log(x)
    // }
    return pH

  },

  getFinal(imol){
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(imol/(this.getTotalVolume()*.001));
  },

  render() {
    let volumes = this.state.volumes;
    let H, A, strong;
    ({H, A, strong} = volumes);

    let buffer = this.state.buffer;
    let [buffer_left, buffer_right] = buffer.split(" ");
    let viewControl = this.state.viewControl;
    
    var imoleHA = this.getMolarity(H);
    var imoleA = this.getMolarity(A);
    var Ka = 0.00001 
    var Kb = 0.00000000000001

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
              <div><div className="view" >
                <Collapse isOpened={viewControl['anim']}>
                  <h3>Molecule View</h3><br/>  
                    <div><Molecules buffer={this.state.buffer} strong={this.state.strong}/></div>
                </Collapse>
              </div></div>
            
              <div><div className="view" >
                 <Collapse isOpened={viewControl['beaker']}>
                 <h3>Beaker View</h3><br/>
                  <Canvas volume1={H} volume2={A} volume3={strong} pH={this.state.pH}/>
                  <Equation equations={this.props.equations} equation={this.state.equation} reactions={this.props.reactions} reaction={this.state.reaction} />
                </Collapse>
              </div></div>           
              
              <br/>
             
              <div>
                <p>HA imoles: {this.getMolarity(H)}</p>
                <p>A imoles: {this.getMolarity(A)}</p>
                <p>Strong addmoles: {this.getMolarity(strong)}</p>
                <p>HA fmoles: {this.getFinal(imoleHA)}</p>
                <p>A fmoles: {this.getFinal(imoleA)}</p>
                <p>pH: {this.getPH(parseFloat(imoleHA), parseFloat(imoleA), Ka, Kb)}</p>
              </div>
            </div>

            <div className="col-sm-2 sidenav">
              <div className="panel panel-default">
                <div className="panel-body"></div>
                  <ControlPanel viewControl={this.state.viewControl} onClick={this.toggleComponentView}/>
                  <br/>
                    <div id='buffer-selection'>
                    <Collapse isOpened={this.state.open}>
                      <div className="well">
                        <div>
                          <p> Buffer </p>
                          <div><Checkbox id='buffer' options={this.state.buffers} currentOption={this.state.buffer} onClick={this.changeCheckbox}/></div>
                        </div>
                      </div>

                      <div className="well" id='HA-slider'>
                          <div>
                            <p> Volume 1 </p>
                            <SlideBar min={1} max={1000} step={1} buffer={buffer_left} amount={H} onChange={this.changeVolume.bind(this, 'H')}/>
                          </div>
                      </div>

                      <div className="well" id='A-slider'>
                        <div>
                          <p> Volume 2 </p>
                          <SlideBar min={1} max={1000} step={1} buffer={buffer_right} amount={A} onChange={this.changeVolume.bind(this, 'A')}/>
                        </div>
                      </div>
                        <button id= "btn" type="button" className="btn btn-success btn-block" onClick={() => this.setState({open: false})}>Continue</button>
                        <p id="warning-message">{this.state.warning}</p>
                        <br/>
                      </Collapse>
                    </div>

              <div className="well" id='strong-selection'>
                  <div>
                    <p> Strong Acid/Base </p>
                    <div><Checkbox id='strong' options={this.state.strongs} currentOption={this.state.strong} onClick={this.changeCheckbox}/></div>
                    <div><br/>
                      <SlideBar min={1} max={200} step={1} buffer={this.state.strong} amount={strong} onChange={this.changeVolume.bind(this, 'strong')} />
                    </div>
                    <Reset onClick={this.restartLab}/>
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </div>
          <footer></footer>
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





