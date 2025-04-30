attachLabels.PREFIX = 'l_';
attachLabels.PADDING = '0';
attachLabels.PADDING_LEN = 6;

let counter = 1;

function getNextId() {
  return attachLabels.PREFIX + String(counter++).padStart(attachLabels.PADDING_LEN, attachLabels.PADDING);
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
  const next = label.nextElementSibling;
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

export default function attachLabels(container) {
  container.querySelectorAll('label').forEach(label => attach(label));
}
