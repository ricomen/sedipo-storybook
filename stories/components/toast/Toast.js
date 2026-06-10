import 'bootstrap/js/dist/toast';

export const TOAST_VARIANTS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'light',
  'dark',
];

// Светлые фоны Bootstrap — крестик остаётся тёмным; для остальных нужен `.btn-close-white`.
const LIGHT_BG_VARIANTS = new Set(['light', 'warning']);

const createCloseButton = ({ white = false, extraClass = '', onDismiss } = {}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = ['btn-close', white ? 'btn-close-white' : '', extraClass]
    .filter(Boolean)
    .join(' ');
  btn.setAttribute('data-bs-dismiss', 'toast');
  btn.setAttribute('aria-label', 'Закрыть');
  if (onDismiss) {
    btn.addEventListener('click', onDismiss);
  }
  return btn;
};

export const createToast = ({
  variant,
  title = 'Уведомление',
  subtitle = '',
  message = 'Это простое уведомление.',
  simple = false,
  dismissible = true,
  show = true,
  ariaLive = 'assertive',
  onDismiss,
} = {}) => {
  const toast = document.createElement('div');
  const classes = ['toast'];
  if (show) classes.push('show');
  if (simple && variant) classes.push(`text-bg-${variant}`);
  if (simple) classes.push('align-items-center', 'border-0');
  toast.className = classes.join(' ');
  toast.setAttribute('role', ariaLive === 'assertive' ? 'alert' : 'status');
  toast.setAttribute('aria-live', ariaLive);
  toast.setAttribute('aria-atomic', 'true');

  const useWhiteClose = simple && !!variant && !LIGHT_BG_VARIANTS.has(variant);

  if (simple) {
    const flex = document.createElement('div');
    flex.className = 'd-flex';

    const body = document.createElement('div');
    body.className = 'toast-body d-flex align-items-center gap-2';
    const text = document.createElement('span');
    text.innerHTML = message;
    body.appendChild(text);
    flex.appendChild(body);

    if (dismissible) {
      flex.appendChild(
        createCloseButton({
          white: useWhiteClose,
          extraClass: 'me-2 m-auto',
          onDismiss,
        }),
      );
    }
    toast.appendChild(flex);
    return toast;
  }

  const header = document.createElement('div');
  header.className = 'toast-header';

  const titleEl = document.createElement('strong');
  titleEl.className = 'me-auto';
  titleEl.innerText = title;
  header.appendChild(titleEl);

  if (subtitle) {
    const small = document.createElement('small');
    small.className = 'text-body-secondary';
    small.innerText = subtitle;
    header.appendChild(small);
  }

  if (dismissible) {
    header.appendChild(createCloseButton({ extraClass: 'ms-2', onDismiss }));
  }
  toast.appendChild(header);

  const body = document.createElement('div');
  body.className = 'toast-body';
  body.innerHTML = message;
  toast.appendChild(body);

  return toast;
};

// Хелпер: обёртка `.toast-container` для размещения нескольких тостов
// (например, в углу экрана). Принимает массив createToast-аргументов.
export const createToastContainer = ({
  toasts = [],
  position = 'top-end',
  margin = '1rem',
} = {}) => {
  const container = document.createElement('div');
  container.className = 'toast-container position-fixed p-3';

  // Bootstrap-классы position-* для углов:
  const positionClasses = {
    'top-start': 'top-0 start-0',
    'top-center': 'top-0 start-50 translate-middle-x',
    'top-end': 'top-0 end-0',
    'bottom-start': 'bottom-0 start-0',
    'bottom-center': 'bottom-0 start-50 translate-middle-x',
    'bottom-end': 'bottom-0 end-0',
  };
  const posClass = positionClasses[position] || positionClasses['top-end'];
  posClass.split(' ').forEach((c) => container.classList.add(c));
  container.style.padding = margin;

  toasts.forEach((args) => container.appendChild(createToast(args)));
  return container;
};
