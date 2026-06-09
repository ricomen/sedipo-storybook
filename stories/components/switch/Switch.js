// Bootstrap form-switch — это `.form-check.form-switch` с input[type=checkbox][role=switch].
// API совпадает с Checkbox, но без indeterminate (для свитча это бессмысленно).

let uid = 0;
const nextId = () => `switch-${++uid}`;

export const createSwitch = ({
  id,
  label = 'Switch',
  name,
  value,
  checked = false,
  disabled = false,
  reverse = false,
  hideLabel = false,
  ariaLabel,
  onChange,
} = {}) => {
  const inputId = id || nextId();

  const wrapper = document.createElement('div');
  wrapper.className = [
    'form-check',
    'form-switch',
    reverse ? 'form-check-reverse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.setAttribute('role', 'switch');
  input.className = 'form-check-input';
  input.id = inputId;
  if (name) input.name = name;
  if (value !== undefined) input.value = value;
  if (checked) input.checked = true;
  if (disabled) input.disabled = true;
  if (hideLabel && ariaLabel) input.setAttribute('aria-label', ariaLabel);
  if (typeof onChange === 'function') {
    input.addEventListener('change', onChange);
  }

  wrapper.appendChild(input);

  if (!hideLabel) {
    const labelEl = document.createElement('label');
    labelEl.className = 'form-check-label';
    labelEl.setAttribute('for', inputId);
    labelEl.innerText = label;
    wrapper.appendChild(labelEl);
  }

  return wrapper;
};
