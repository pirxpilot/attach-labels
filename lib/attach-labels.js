module.exports = attachLabels;

attachLabels.PREFIX = 'l_';
attachLabels.PADDING = '000000';

var counter = 1;

function getNextId() {
  var suffix = attachLabels.PADDING + counter++;
  suffix = suffix.slice(-attachLabels.PADDING.length);
  return attachLabels.PREFIX + suffix;
}

function attach(label) {
  if (label.getAttribute('for')) {
    // already attached
    return;
  }
  if (label.childElementCount > 0) {
    // already labels something
    return;
  }
  var next = label.nextElementSibling;
  if (!next) {
    // nothing follows the label
    return;
  }
  if (next.nodeName !== 'INPUT') {
    // not an input
    return;
  }
  if (!next.id) {
    next.id = getNextId();
  }
  label.setAttribute('for', next.id);
}


function attachLabels(container) {
  var i;
  var labels = container.querySelectorAll('label');
  for(i = 0; i < labels.length; i++) {
    attach(labels[i]);
  }
}
