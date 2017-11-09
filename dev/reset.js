const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');
const Modal = require('react-bootstrap-modal');

export var Reset  = createReactClass({

  getInitialState(){
    return {open: false}
  },

  resetAndClose(){
    this.props.onClick()
    this.setState({open: false})
  },

  render(){
    return (
      <div>
        <Modal
          aria-labelledby='ModalTitle'
          show={this.state.open}
          onHide={close}
        >
          <Modal.Header>
            <Modal.Title id='ModalHeader'>Are you sure you'd like to reset?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <button className='btn' onClick={() => this.setState({open: false})}>
              Close
            </button>
            <button className='btn btn-primary' onClick={this.resetAndClose}>
              Reset
            </button>
          </Modal.Footer>
        </Modal>

        <button
          className='btn btn-danger'
          onClick={() => this.setState({ open: true }) }
        >
          Reset
        </button>
      </div>
    )
  }
});