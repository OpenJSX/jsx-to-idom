var assert = require('assert');
var run = require('../_run');

export var object = () => {
  let elem = run(
    <div
      style={ {
        color: 'black'
      } }
    ></div>
  );

  assert.deepEqual(
    elem, {
      tag: 'div',
      props: {
        style: {
          color: 'black'
        }
      }
    }
  );
};

export var string = () => {
  let elem = run(
    <div
      style="color: black"
    ></div>
  );

  assert.deepEqual(
    elem, {
      tag: 'div',
      attrs: {
        style: 'color: black'
      }
    }
  );
};