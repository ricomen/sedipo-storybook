import 'bootstrap/js/dist/modal';

export const MODAL_SIZES = [undefined, 'sm', 'lg', 'xl'];

const createFooterButton = ({ label, variant = 'secondary', dismiss = false, onClick } = {}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `btn btn-${variant}`;
  btn.innerText = label;
  if (dismiss) btn.setAttribute('data-bs-dismiss', 'modal');
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
};

export const createModal = ({
  id = 'example-modal',
  title = 'Заголовок модального окна',
  body = 'Текст в теле модального окна.',
  footerButtons = [
    { label: 'Закрыть', variant: 'secondary', dismiss: true },
    { label: 'Сохранить', variant: 'primary' },
  ],
  size,
  centered = false,
  scrollable = false,
  staticBackdrop = false,
} = {}) => {
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = id;
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', `${id}-label`);
  modal.setAttribute('aria-hidden', 'true');
  if (staticBackdrop) modal.setAttribute('data-bs-backdrop', 'static');

  const dialogClasses = ['modal-dialog'];
  if (size) dialogClasses.push(`modal-${size}`);
  if (centered) dialogClasses.push('modal-dialog-centered');
  if (scrollable) dialogClasses.push('modal-dialog-scrollable');

  const dialog = document.createElement('div');
  dialog.className = dialogClasses.join(' ');

  const content = document.createElement('div');
  content.className = 'modal-content';

  const header = document.createElement('div');
  header.className = 'modal-header';

  const titleEl = document.createElement('h5');
  titleEl.className = 'modal-title';
  titleEl.id = `${id}-label`;
  titleEl.innerText = title;
  header.appendChild(titleEl);

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn-close';
  close.setAttribute('data-bs-dismiss', 'modal');
  close.setAttribute('aria-label', 'Закрыть');
  header.appendChild(close);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'modal-body';
  bodyEl.innerHTML = body;

  const footer = document.createElement('div');
  footer.className = 'modal-footer';
  footerButtons.forEach((btnArgs) => footer.appendChild(createFooterButton(btnArgs)));

  content.appendChild(header);
  content.appendChild(bodyEl);
  content.appendChild(footer);
  dialog.appendChild(content);
  modal.appendChild(dialog);
  return modal;
};

export const createModalDemo = ({
  triggerLabel = 'Открыть модальное окно',
  triggerVariant = 'primary',
  ...modalArgs
} = {}) => {
  const wrap = document.createElement('div');

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = `btn btn-${triggerVariant}`;
  trigger.setAttribute('data-bs-toggle', 'modal');
  trigger.setAttribute('data-bs-target', `#${modalArgs.id || 'example-modal'}`);
  trigger.innerText = triggerLabel;

  wrap.appendChild(trigger);
  wrap.appendChild(createModal(modalArgs));
  return wrap;
};
