// Bootstrap-based button. Список вариантов и размеров синхронизирован с `src/scss/_buttons.scss`.

// Solid + outline + link — только те, что реально компилируются в проекте.
export const BUTTON_VARIANTS = [
  'primary',
  'outline-secondary',
  'light',
  'clean',
  'link',
];

// Совпадает с $button-sizes из _buttons.scss.
export const BUTTON_SIZES = ['sm', 'md'];

export const ICON_POSITIONS = ['start', 'end', 'only'];

const variantToClass = (variant) => {
  if (variant === 'link') return 'btn-link';
  return `btn-${variant}`;
};

const createIcon = (name, extraClass = '') => {
  const i = document.createElement('i');
  i.className = ['bi', `bi-${name}`, extraClass].filter(Boolean).join(' ');
  i.setAttribute('aria-hidden', 'true');
  return i;
};

export const createButton = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  label = 'Button',
  icon,
  iconPosition = 'start',
  ariaLabel,
  onClick,
} = {}) => {
  const btn = document.createElement('button');
  btn.type = 'button';

  const classes = ['btn', variantToClass(variant), `btn-${size}`];
  btn.className = classes.join(' ');

  if (icon && iconPosition === 'only') {
    btn.appendChild(createIcon(icon));
    btn.setAttribute('aria-label', ariaLabel || label);
  } else if (icon && iconPosition === 'end') {
    const text = document.createElement('span');
    text.innerText = label;
    btn.appendChild(text);
    btn.appendChild(createIcon(icon, 'ms-2'));
  } else if (icon) {
    btn.appendChild(createIcon(icon, 'me-2'));
    const text = document.createElement('span');
    text.innerText = label;
    btn.appendChild(text);
  } else {
    btn.innerText = label;
  }

  if (disabled) btn.disabled = true;
  if (onClick) btn.addEventListener('click', onClick);

  return btn;
};
