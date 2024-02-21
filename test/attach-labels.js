const { describe, it, after } = require('node:test');

const should = require('should');
const attachLabels = require('../');

/* global document */

describe('attach-labels node module', function () {
  const jsdom = require('jsdom-global')();

  after(function () {
    jsdom();
  });

  it('should attach label to input', function () {
    document.body.innerHTML = '<label>A</label><input/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    input.id.should.eql(label.getAttribute('for'));
  });

  it('should use input ID if present', function () {
    document.body.innerHTML = '<label>A</label><input id="email"/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    label.getAttribute('for').should.eql("email");
  });

  it('should ignore labels with "for" attribute present', function () {
    document.body.innerHTML = '<label for="email">A</label><input/>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    label.getAttribute('for').should.eql("email");
    input.id.should.eql('');
  });

  it('should ignore labels with children', function () {
    document.body.innerHTML = '<label>A<input/></label>';
    attachLabels(document.body);
    const label = document.querySelector('label');
    const input = document.querySelector('input');
    should.not.exist(label.getAttribute('for'));
    input.id.should.eql('');
  });
});
