webpackJsonp([0],{

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(49);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(57);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Child = __webpack_require__(184).Child;

var Index = _react2.default.createClass({
  displayName: 'Index',


  getInitialState: function getInitialState() {
    return { name: this.props.name };
  },

  handleChange: function handleChange(event) {
    this.setState({ name: event.target.value });
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(Child, { name: this.state.name })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { type: 'text', value: this.state.name, onChange: this.handleChange })
      ),
      _react2.default.createElement(
        'h2',
        null,
        'Hello'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Hello, ',
        this.state.name,
        '!'
      )
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(Index, { name: 'Matt' })
), document.getElementById("container"));

/***/ })

},[83]);