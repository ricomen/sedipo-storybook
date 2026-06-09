// Input с кнопкой-оверлеем «внутри» поля (паттерн position-relative + position-absolute).
// Bootstrap не даёт это «из коробки», поэтому собираем из утилит:
//   .position-relative на обёртке, .position-absolute + .top-50 + .end-0
//   + .translate-middle-y на кнопке, .pe-5 на инпуте, чтобы текст не уезжал под кнопку.

import { createButton } from '../button/Button';

export const INPUT_OVERLAY_SIZES = ['sm', 'md'];

const formControlSizeClass = (size) => (size === 'sm' ? 'form-control-sm' : '');

export const createInputOverlay = ({
  id,
  size = 'md',
  type = 'text',
  placeholder = '',
  value = '',
  ariaLabel = 'Input',
  disabled = false,
  hideActionWhenEmpty = false,
  // overlay-кнопка справа; null/undefined — не рисуем.
  // { variant, icon, ariaLabel, clearOnClick, onClick, buttonSize }
  action = null,
} = {}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'position-relative';

  const input = document.createElement('input');
  input.type = type;
  input.className = [
    'form-control',
    formControlSizeClass(size),
    action ? 'pe-5' : '',
  ]
    .filter(Boolean)
    .join(' ');
  if (placeholder) input.placeholder = placeholder;
  if (value) input.value = value;
  if (id) input.id = id;
  input.setAttribute('aria-label', ariaLabel);
  if (disabled) input.disabled = true;

  wrapper.appendChild(input);

  if (action) {
    const {
      variant = 'clean',
      icon = 'x-lg',
      ariaLabel: actionAria = 'Сбросить',
      clearOnClick = true,
      onClick,
      buttonSize = 'sm',
    } = action;

    const button = createButton({
      variant,
      size: buttonSize,
      icon,
      iconPosition: 'only',
      label: actionAria,
      ariaLabel: actionAria,
    });
    button.classList.add(
      'position-absolute',
      'top-50',
      'end-0',
      'translate-middle-y',
      'me-1',
    );
    if (disabled) button.disabled = true;

    const syncVisibility = () => {
      if (!hideActionWhenEmpty) return;
      button.classList.toggle('d-none', input.value.length === 0);
    };

    button.addEventListener('click', (event) => {
      if (clearOnClick) {
        input.value = '';
        input.focus();
        syncVisibility();
      }
      if (typeof onClick === 'function') onClick(event);
    });

    if (hideActionWhenEmpty) {
      syncVisibility();
      input.addEventListener('input', syncVisibility);
    }

    wrapper.appendChild(button);
  }

  return wrapper;
};
