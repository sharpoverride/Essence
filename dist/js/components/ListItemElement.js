'use strict';

var React = require('react'),
    PubSub = require('../utils/PubSub'),
    ClassNames = require('../utils/ClassNames'),
    classSet = require('classnames');

module.exports = React.createClass({
  displayName: 'ListItemElement',

  mixins: [PubSub],

  getInitialState: function getInitialState() {
    return {
      text: false
    };
  },

  componentDidMount: function componentDidMount() {
    var classes = this.state.classes;

    this.setState({
      classes: classes
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    var self = this;
    self.renderChildren();
  },

  renderChildren: function renderChildren() {
    var self = this,
        classes = classSet(ClassNames(self.state.classes, this.props.classes));

    if (self.props.element) {
      return React.createElement(
        'li',
        { className: classes },
        React.createElement(
          'a',
          {
            id: self.props.element.id,
            href: self.props.element.link,
            onClick: self.props._onClick
          },
          self.props.element.text
        )
      );
    }

    return React.createElement(
      'li',
      { className: classes },
      self.props.children
    );
  },

  render: function render() {
    var self = this;
    return self.renderChildren();
  }
});