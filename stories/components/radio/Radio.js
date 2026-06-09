// Bootstrap form-check (radio). Структура та же, что у чекбокса, но type="radio"
// и обязательный общий name на группе. Ниже два хелпера: createRadio для одной кнопки
// и createRadioGroup для группы (auto-name + общий обработчик).

let uid = 0;
const nextId = () => `radio-${++uid}`;
let groupUid = 0;
const nextGroupName = () => `radio-group-${++groupUid}`;

export const createRadio = ({
  id,
  name,
  label = 'Radio',
  value,
  checked = false,
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
  input.type = 'radio';
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

export const createRadioGroup = ({
  name,
  options = [],
  value,
  inline = false,
  reverse = false,
  disabled = false,
  ariaLabel = 'Radio group',
  onChange,
} = {}) => {
  const groupName = name || nextGroupName();

  const root = document.createElement('div');
  root.setAttribute('role', 'radiogroup');
  root.setAttribute('aria-label', ariaLabel);
  if (!inline) {
    root.style.display = 'flex';
    root.style.flexDirection = 'column';
    root.style.gap = '0.25rem';
  }

  options.forEach((opt) => {
    const optionValue = typeof opt === 'string' ? opt : opt.value;
    const optionLabel = typeof opt === 'string' ? opt : opt.label ?? opt.value;
    const optionDisabled = (typeof opt === 'object' && opt.disabled) || disabled;
    const optionChecked =
      typeof opt === 'object' && 'checked' in opt
        ? opt.checked
        : value !== undefined && value === optionValue;

    root.appendChild(
      createRadio({
        name: groupName,
        value: optionValue,
        label: optionLabel,
        checked: optionChecked,
        disabled: optionDisabled,
        inline,
        reverse,
        onChange,
      }),
    );
  });

  return root;
};
