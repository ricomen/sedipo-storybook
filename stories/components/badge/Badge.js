// Bootstrap badge: https://getbootstrap.com/docs/5.3/components/badge/
// Используем утилиту `.text-bg-*`, чтобы вместе с фоном автоматически
// подбирался читаемый цвет текста.
// для soft испощьуем класс формата badge-soft-* без text-bg-*
export const BADGE_VARIANTS = [
  'primary',
  'dark',
  'success',
  'danger',
  'warning',
  'light',
];

// Совпадает с набором `.badge-soft-*` из `src/scss/_badge.scss`.
export const BADGE_SOFT_VARIANTS = [
  'primary',
  'success',
  'danger',
  'warning',
];

// `md` — дефолтный размер бейджа. `sm` подключает класс `.badge-sm`
// из `src/scss/_badge.scss`.
export const BADGE_SIZES = ['sm', 'md'];

const createIcon = (name, extraClass = '') => {
  const i = document.createElement('i');
  i.className = ['bi', `bi-${name}`, extraClass].filter(Boolean).join(' ');
  i.setAttribute('aria-hidden', 'true');
  return i;
};

export const createBadge = ({
  variant = 'primary',
  size = 'md',
  soft = false,
  label = 'Badge',
  icon = '',
  ariaLabel,
  tag = 'span',
} = {}) => {
  const badge = document.createElement(tag);

  const classes = ['badge'];
  if (soft) {
    classes.push(`badge-soft-${variant}`);
  } else {
    classes.push(`text-bg-${variant}`);
  }
  if (size === 'sm') classes.push('badge-sm');
  
  badge.className = classes.join(' ');

  if (icon && !label) {
    badge.appendChild(createIcon(icon));
    if (ariaLabel) badge.setAttribute('aria-label', ariaLabel);
  } else if (icon) {
    badge.appendChild(createIcon(icon, 'me-1'));
    const text = document.createElement('span');
    text.innerText = label;
    badge.appendChild(text);
  } else {
    badge.innerText = label;
  }

  return badge;
};

// Бейдж-«пилюля» поверх другого элемента (например, кнопки) — используем
// утилиты позиционирования Bootstrap. Принимает целевой элемент и параметры
// бейджа; возвращает обёртку `position-relative` с уже встроенным бейджем.
export const createPositionedBadge = ({
  target,
  variant = 'danger',
  label = '99+',
  visuallyHiddenLabel = '',
} = {}) => {
  const wrapper = document.createElement('span');
  wrapper.className = 'position-relative d-inline-block';
  if (target) wrapper.appendChild(target);

  const badge = createBadge({ variant, label });
  badge.classList.add(
    'position-absolute',
    'top-0',
    'start-100',
    'translate-middle',
  );

  if (visuallyHiddenLabel) {
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.innerText = visuallyHiddenLabel;
    badge.appendChild(sr);
  }

  wrapper.appendChild(badge);
  return wrapper;
};
