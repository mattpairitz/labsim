const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
const Checkbox = require('./checkbox.js').Checkbox;
require("./stylesheet.css");
require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

var Index = createReactClass({

  getInitialState: function(){
    return {buffer: "HA/NaA", buffers: this.props.list};
  },

  changeBuffer: function(event){
    this.setState({buffer: event.currentTarget.value});
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
            </div>
            <div className="col-sm-3 sidenav">
              <div className="well">
                  <div>
                      <p>Selected: {this.state.buffer}</p>
                  </div>
                <div><Checkbox options={this.state.buffers} currentOption={this.state.buffer} onClick={this.changeBuffer}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
            
      );
  }
});

ReactDOM.render(<div><Index 
                list={["H/Na", "HF/NaF", "HCl/NaCl", "NH\u2083/NH\u2084Cl"]}/></div>, 
                document.getElementById("container"))





