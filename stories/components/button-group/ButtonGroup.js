// Bootstrap-based button group. Принимает массив описаний кнопок и
// собирает `.btn-group` / `.btn-group-vertical` через createButton.

import { createButton } from '../button/Button';

export const BUTTON_GROUP_SIZES = ['sm', 'md'];
export const BUTTON_GROUP_ORIENTATIONS = ['horizontal', 'vertical'];

const sizeToClass = (size) => (size === 'sm' ? 'btn-group-sm' : '');

export const createButtonGroup = ({
  buttons = [],
  size = 'md',
  orientation = 'horizontal',
  ariaLabel = 'Button group',
} = {}) => {
  const group = document.createElement('div');
  const baseClass = orientation === 'vertical' ? 'btn-group-vertical' : 'btn-group';
  group.className = [baseClass, sizeToClass(size)].filter(Boolean).join(' ');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', ariaLabel);

  buttons.forEach((btnArgs) => {
    group.appendChild(createButton({ size, ...btnArgs }));
  });

  return group;
};

export const createButtonToolbar = ({
  groups = [],
  size = 'md',
  ariaLabel = 'Button toolbar',
  gap = '0.5rem',
} = {}) => {
  const toolbar = document.createElement('div');
  toolbar.className = 'btn-toolbar';
  toolbar.setAttribute('role', 'toolbar');
  toolbar.setAttribute('aria-label', ariaLabel);
  toolbar.style.gap = gap;

  groups.forEach((groupArgs) => {
    toolbar.appendChild(createButtonGroup({ size, ...groupArgs }));
  });

  return toolbar;
};
