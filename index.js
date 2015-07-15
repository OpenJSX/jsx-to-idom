"use strict";

var jsx = require('jsx-runtime');
var idom = typeof _mockdom !== 'undefined' ? _mockdom : require('incremental-dom');
var hasOwn = Object.prototype.hasOwnProperty;

var openStart = idom.elementOpenStart;
var openEnd = idom.elementOpenEnd;
var close = idom.elementClose;
var text = idom.text;
var attr = idom.attr;

var element = {};

var renderer = jsx.register('DOM', {
  tags: {
    '*': {
      enter: function(tag, props) {
        openStart(tag);

        if (props) {
          handleProps(props);
        }

        openEnd();

        return element;
      },
      leave: function(parent, tag) {
        close(tag);
        return parent;
      },
      child: function(child, parent) {
        if (child === element) {
          // do nothing
        } else {
          text(child + '');
        }

        return parent;
      }
    }
  }
});

module.exports = renderer;

function handleProps(props) {
  for (var key in props) {
    if (!hasOwn.call(props, key)) continue;

    var val = props[key];

    if (key === 'className') key = 'class';
    if (key === 'cssFor') key = 'for';

    attr(key, val);
  }
}