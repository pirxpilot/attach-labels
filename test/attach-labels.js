const test = require('node:test');

const attachLabels = require('../');

/* global document */

test('attach-labels', async t => {
  const jsdom = require('jsdom-global')();

  t.after(() => {
    jsdom();
  });

  await t.test('should attach label to input', t => {
    document.body.innerHTML = '<label>A</label><input/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    t.assert.equal(input.id, label.getAttribute('for'));
  });

  await t.test('should use input ID if present', t => {
    document.body.innerHTML = '<label>A</label><input id="email"/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    t.assert.equal(label.getAttribute('for'), 'email');
  });

  await t.test('should ignore labels with "for" attribute present', t => {
    document.body.innerHTML = '<label for="email">A</label><input/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    t.assert.equal(label.getAttribute('for'), 'email');
    t.assert.equal(input.id, '');
  });

  await t.test('should ignore labels with children', t => {
    document.body.innerHTML = '<label>A<input/></label>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    t.assert.ok(!label.getAttribute('for'), 'for attribute should not be set');
    t.assert.equal(input.id, '');
  });
});
