// Bootstrap form-check (checkbox). Структура: .form-check > input.form-check-input + label.form-check-label.
// Модификаторы: .form-check-inline (в строку) и .form-check-reverse (label слева).
// Для indeterminate-состояния используем JS-свойство, потому что HTML-атрибута для него нет.

let uid = 0;
const nextId = () => `checkbox-${++uid}`;

export const createCheckbox = ({
  id,
  label = 'Checkbox',
  name,
  value,
  checked = false,
  indeterminate = false,
  disabled = false,
  inline = false,
  reverse = false,
  hideLabel = false,
  ariaLabel,
  onChange,
} = {}) => {
  const inputId = id || nextId();

  const wrapper = document.createElement('div');
  wrapper.className = [
    'form-check',
    inline ? 'form-check-inline' : '',
    reverse ? 'form-check-reverse' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = 'form-check-input';
  input.id = inputId;
  if (name) input.name = name;
  if (value !== undefined) input.value = value;
  if (checked) input.checked = true;
  if (disabled) input.disabled = true;
  if (indeterminate) input.indeterminate = true;
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
