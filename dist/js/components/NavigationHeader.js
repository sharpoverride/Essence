'use strict';

var React = require('react'),
    PubSub = require('../utils/PubSub'),
    ClassNames = require('../utils/ClassNames'),
    classSet = require('classnames');

module.exports = React.createClass({
  displayName: 'NavigationHeader',

  mixins: [PubSub],

  getInitialState: function getInitialState() {
    return {
      classes: {
        'e-nav-header': true
      }
    };
  },

  componentDidMount: function componentDidMount() {
    var self = this,
        classes = self.state.classes;

    classes = ClassNames(classes, self.props.classes);

    self.setState({
      classes: classSet(classes)
    });
  },

  render: function render() {
    var self = this;

    return React.createElement(
      'header',
      { className: self.state.classes },
      self.props.children
    );
  }
});