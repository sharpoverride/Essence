'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'BottomSheets',

  render: function render() {
    var self = this;
    return self.props.children;
  }
});