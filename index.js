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

var renderer = jsx.register('iDOM', {
  before: function(tree) {
    this.scope.calls = [];
    return tree;
  },

  /*after: function(tree) {
    var calls = this.scope.calls;

    return function() {
      calls.forEach(function(fn) { fn() });
    };
  },*/

  render: function(render) {
    // console.log('render 0');
    var calls = this.scope.calls;
    render();

    return function() {
      calls.forEach(function(fn) { fn() });
    };
  },

  fragment: function() {
    return element;
  },

  params: {
    renderType: 'all',
    updateType: 'fragment',
  },

  tags: {
    '*': {
      enter: function(tag, props) {
        this.scope.calls.push(function() {
          openStart(tag);

          if (props) {
            handleProps(props);
          }

          openEnd();
        });

        return element;
      },
      leave: function(parent, tag) {
        this.scope.calls.push(function() {
          close(tag);
        });

        return parent;
      },
      child: function(child, parent) {
        this.scope.calls.push(function() {
          if (child instanceof jsx.Stream) {
            // debugger;
            var render = child.get();
            console.log('render:', render, render + '');
            // fix stream, because right now function is used as getter
            render(); // call returned function
            return;
          }

          if (child === element) {
            console.log('child element');
            // do nothing
          } else {
            console.log('child text:', child + '');
            text(child + '');
          }
        });

        return child;
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

function handleChild(child) {
  if (child === element) {
    // do nothing
  } else {
    text(child + '');
  }
}