export const ALERT_VARIANTS = [
  'success',
  'danger',
  'primary',
  'light',
  'warning',
];

const createCloseButton = (onDismiss) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-close';
  btn.setAttribute('aria-label', 'Закрыть');
  btn.addEventListener('click', (event) => {
    const alert = btn.closest('.alert');
    if (alert) alert.remove();
    if (onDismiss) onDismiss(event);
  });
  return btn;
};

export const createAlert = ({
  variant = 'primary',
  message = 'Это alert!',
  heading = '',
  textOnly = false,
  dismissible = false,
  onDismiss,
} = {}) => {
  const alert = document.createElement('div');
  const classes = ['alert', `alert-${variant}`];
  if (textOnly) classes.push('alert-text');
  if (dismissible) classes.push('alert-dismissible', 'fade', 'show');
  alert.className = classes.join(' ');
  alert.setAttribute('role', 'alert');

  const body = document.createElement('div');
  body.className = 'flex-grow-1';

  if (heading) {
    const h = document.createElement('h4');
    h.className = 'alert-heading';
    h.innerText = heading;
    body.appendChild(h);
  }

  const text = document.createElement('div');
  text.innerHTML = message;
  body.appendChild(text);

  alert.appendChild(body);

  if (dismissible) alert.appendChild(createCloseButton(onDismiss));

  return alert;
};
