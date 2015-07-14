var assert = require('assert');
var run = require('../_run');

export var simple = () => {
  let elem = run(
    <div data-test="test"></div>
  );

  assert.deepEqual(
    elem, {
      tag: 'div',
      attrs: {
        'data-test': 'test'
      }
    }
  );
};

export var js_values = () => {
  let fn = () => { 1; };

  let elem = run(
    <div
      data-boolean={ true }
      data-number={ 1 }
      data-string={ 'str' }

      data-object={ {} }
      data-array={ [1, 2, 3] }
      data-fn={ fn }
      data-null={ null }
    ></div>
  );

  assert.deepEqual(
    elem, {
      tag: 'div',
      attrs: {
        'data-boolean': true,
        'data-number': 1,
        'data-string': 'str'
      },
      props: {
        'data-object': {},
        'data-array': [1, 2, 3],
        'data-fn': fn,
        'data-null': null
      }
    }
  );
};