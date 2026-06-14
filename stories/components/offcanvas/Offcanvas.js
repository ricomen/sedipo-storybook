import 'bootstrap/js/dist/offcanvas';

export const OFFCANVAS_PLACEMENTS = ['start', 'end', 'top', 'bottom'];

export const createOffcanvas = ({
  id = 'example-offcanvas',
  title = 'Offcanvas',
  body = 'Содержимое боковой панели.',
  placement = 'start',
  backdrop = true,
  scroll = false,
} = {}) => {
  const offcanvas = document.createElement('div');
  offcanvas.className = `offcanvas offcanvas-${placement}`;
  offcanvas.id = id;
  offcanvas.setAttribute('tabindex', '-1');
  offcanvas.setAttribute('aria-labelledby', `${id}-label`);
  if (!backdrop) offcanvas.setAttribute('data-bs-backdrop', 'false');
  if (scroll) offcanvas.setAttribute('data-bs-scroll', 'true');

  const header = document.createElement('div');
  header.className = 'offcanvas-header';

  const titleEl = document.createElement('h5');
  titleEl.className = 'offcanvas-title';
  titleEl.id = `${id}-label`;
  titleEl.innerText = title;
  header.appendChild(titleEl);

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn-close';
  close.setAttribute('data-bs-dismiss', 'offcanvas');
  close.setAttribute('aria-label', 'Закрыть');
  header.appendChild(close);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'offcanvas-body';
  bodyEl.innerHTML = body;

  offcanvas.appendChild(header);
  offcanvas.appendChild(bodyEl);
  return offcanvas;
};

export const createOffcanvasDemo = ({
  triggerLabel = 'Открыть offcanvas',
  triggerVariant = 'primary',
  ...offcanvasArgs
} = {}) => {
  const wrap = document.createElement('div');
  const id = offcanvasArgs.id || 'example-offcanvas';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = `btn btn-${triggerVariant}`;
  trigger.setAttribute('data-bs-toggle', 'offcanvas');
  trigger.setAttribute('data-bs-target', `#${id}`);
  trigger.setAttribute('aria-controls', id);
  trigger.innerText = triggerLabel;

  wrap.appendChild(trigger);
  wrap.appendChild(createOffcanvas({ ...offcanvasArgs, id }));
  return wrap;
};
