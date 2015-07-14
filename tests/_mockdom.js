"use strict";

var currentRun;

var getElement = function() {
  var stack = currentRun.stack;

  return stack.length ? stack[stack.length - 1] : null;
};

module.exports = {
  run: function(fn) {
    if (currentRun) throw new Error('Cannot run while run');

    currentRun = {
      stack: [],
      result: []
    };

    fn();

    var result = currentRun.result;
    currentRun = null;

    // jsx does not support top-level siblings
    return result[0];
  },
  elementOpenStart: function(tag) {
    var parent = getElement();
    var element = {
      tag: tag,
      children: [],
      props: {},
      attrs: {},
      // openEnded: false
    };

    if (parent) {
      parent.children.push(element);
    } else {
      currentRun.result.push(element);
    }

    currentRun.stack.push(element);
  },
  attr: function(key, val) {
    var element = getElement();

    if (!element) {
      throw new Error('Cannot set attr when there is no element');
    }

    if (element.openEnded) {
      // throw new Error('Cannot set attr when element opening is ended');
    }

    var type = typeof val;

    if (val === undefined) {
      delete element.attrs[key];
    } else if (type === 'object' || type === 'function') {
      element.props[key] = val;
    } else {
      element.attrs[key] = val;
    }
  },
  elementOpenEnd: function() {
    var element = getElement();

    if (!element) {
      throw new Error('Cannot end element opening when there is no element');
    }

    if (!Object.keys(element.props).length) {
      delete element.props;
    }

    if (!Object.keys(element.attrs).length) {
      delete element.attrs;
    }

    // element.openEnded = true;
  },
  text: function(text) {
    var parent = getElement();
    var text = {
      type: '#text',
      value: text + ''
    };

    if (!parent) {
      throw new Error('Text cannot be top-level call');
    }

    parent.children.push(text);
  },
  elementClose: function(tag) {
    var element = getElement();

    if (!element) {
      throw new Error('Cannot close element when there is no one');
    }

    if (element.tag !== tag) {
      throw new Error('Cannot close element with different tag: actual <' +
        element.tag + '>, expected <' + tag + '>');
    }

    if (!element.children.length) {
      delete element.children;
    }

    currentRun.stack.pop();
  }
};