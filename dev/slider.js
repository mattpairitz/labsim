const React = require('react');
const ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');

export var Slider = createReactClass({
    getInitialState: function () {
        return {options: this.props.buffers, currentOption: this.props.currentOption}
    },

    render: function () {
        return (<div>
            <input type="range"
                   min=".0001"
                   max="1000"
                   value="1"
                   className="slider"/>
        </div>);
    }
});