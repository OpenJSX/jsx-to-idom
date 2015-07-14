var assert = require('assert');
var run = require('../_run');

export var simple = () => {
  let elem = run(
    <div>
      text-test
    </div>
  );

  assert.deepEqual(
    elem, {
      tag: 'div',
      children: [{
        type: '#text',
        value: 'text-test'
      }]
    }
  );
};