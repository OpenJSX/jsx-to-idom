var assert = require('assert');
var run = require('../_run');

export var simple = () => {
  var elem = run(<div></div>);

  assert.deepEqual(
    elem, {
      tag: 'div'
    }
  );
};

export var svg_namespace = () => {
  let elem = run(
    <div>
      <svg></svg>
    </div>
  );

  // cannot test namespaces for idom
  assert.deepEqual(elem, {
    tag: 'div',
    children: [{
      tag: 'svg'
    }]
  });
};

export var html_namespace = () => {
  let elem = run(
    <div>
      <svg>
        <foreignObject />
      </svg>
    </div>
  );

  // cannot test namespaces for idom
  assert.deepEqual(elem, {
    tag: 'div',
    children: [{
      tag: 'svg',
      children: [{
        tag: 'foreignObject',
      }]
    }]
  });
};

export var custom_tags = () => {
  let elem = run(
    <div>
      <custom-tag></custom-tag>
    </div>
  );

  assert.deepEqual(elem, {
    tag: 'div',
    children: [{
      tag: 'custom-tag'
    }]
  });
};

export var scope_tags = () => {
  var Scoped = function() {
    return <span></span>
  };

  let elem = run(
    <div>
      <Scoped />
    </div>
  );

  assert.deepEqual(elem, {
    tag: 'div',
    children: [{
      tag: 'span'
    }]
  });
};