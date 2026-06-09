import { fn } from 'storybook/test';

import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_POSITIONS,
  createButton,
} from './Button';

const wrap = (children, { gap = '0.5rem', align = 'center' } = {}) => {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.alignItems = align;
  row.style.gap = gap;
  children.forEach((child) => row.appendChild(child));
  return row;
};

const section = (title, content) => {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '1.5rem';

  const heading = document.createElement('h6');
  heading.innerText = title;
  heading.style.margin = '0 0 0.5rem';
  heading.style.fontFamily = 'system-ui, sans-serif';
  heading.style.color = '#555';

  wrapper.appendChild(heading);
  wrapper.appendChild(content);
  return wrapper;
};

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  render: (args) => createButton(args),
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: BUTTON_VARIANTS,
    },
    size: {
      control: { type: 'inline-radio' },
      options: BUTTON_SIZES,
    },
    icon: {
      control: 'text',
      description: 'Имя bi-иконки без префикса (например, `download`)',
    },
    iconPosition: {
      control: { type: 'inline-radio' },
      options: ICON_POSITIONS,
    },
    disabled: { control: 'boolean' },
    onClick: { action: 'onClick' },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    icon: '',
    iconPosition: 'start',
    disabled: false,
    onClick: fn(),
  },
};

export const Primary = {
  args: { variant: 'primary', label: 'Primary' },
};

export const OutlineSecondary = {
  name: 'Outline secondary',
  args: { variant: 'outline-secondary', label: 'Outline secondary' },
};

export const Light = {
  args: { variant: 'light', label: 'Light' },
};

export const Clean = {
  args: { variant: 'clean', label: 'Clean' },
};

export const Link = {
  args: { variant: 'link', label: 'Link' },
};

export const Small = {
  args: { variant: 'primary', size: 'sm', label: 'Small' },
};

export const Medium = {
  args: { variant: 'primary', size: 'md', label: 'Medium' },
};

export const Disabled = {
  args: { variant: 'primary', disabled: true, label: 'Disabled' },
};

export const WithIconStart = {
  name: 'Icon · start',
  args: {
    variant: 'primary',
    label: 'Скачать',
    icon: 'download',
    iconPosition: 'start',
  },
};

export const WithIconEnd = {
  name: 'Icon · end',
  args: {
    variant: 'primary',
    label: 'Дальше',
    icon: 'arrow-right',
    iconPosition: 'end',
  },
};

export const IconOnly = {
  name: 'Icon · only',
  args: {
    variant: 'outline-secondary',
    label: 'Закрыть',
    icon: 'x-lg',
    iconPosition: 'only',
  },
};

export const AllButtons = {
  name: 'All buttons',
  parameters: {
    controls: { disable: true },
  },
  args: { onClick: fn() },
  render: (args) => {
    const root = document.createElement('div');
    root.style.fontFamily = 'system-ui, sans-serif';

    const variants = wrap(
      BUTTON_VARIANTS.map((variant) =>
        createButton({ ...args, variant, label: variant }),
      ),
    );
    root.appendChild(section('Variants', variants));

    const sizes = wrap(
      BUTTON_SIZES.map((size) =>
        createButton({ ...args, variant: 'primary', size, label: `Size ${size}` }),
      ),
      { align: 'baseline' },
    );
    root.appendChild(section('Sizes', sizes));

    const iconStart = wrap([
      createButton({ ...args, variant: 'primary', label: 'Скачать', icon: 'download' }),
      createButton({ ...args, variant: 'outline-secondary', label: 'Изменить', icon: 'pencil' }),
      createButton({ ...args, variant: 'light', label: 'Сохранить', icon: 'save' }),
      createButton({ ...args, variant: 'link', label: 'Открыть', icon: 'box-arrow-up-right' }),
    ]);
    root.appendChild(section('Icon at start', iconStart));

    const iconEnd = wrap([
      createButton({ ...args, variant: 'primary', label: 'Дальше', icon: 'arrow-right', iconPosition: 'end' }),
      createButton({ ...args, variant: 'outline-secondary', label: 'Подробнее', icon: 'chevron-right', iconPosition: 'end' }),
      createButton({ ...args, variant: 'link', label: 'Подробнее', icon: 'chevron-right', iconPosition: 'end' }),
    ]);
    root.appendChild(section('Icon at end', iconEnd));

    const iconOnly = wrap([
      createButton({ ...args, variant: 'primary', label: 'Добавить', icon: 'plus-lg', iconPosition: 'only' }),
      createButton({ ...args, variant: 'outline-secondary', label: 'Закрыть', icon: 'x-lg', iconPosition: 'only' }),
      createButton({ ...args, variant: 'light', label: 'Меню', icon: 'list', iconPosition: 'only' }),
      createButton({ ...args, variant: 'outline-secondary', size: 'sm', label: 'Удалить', icon: 'trash', iconPosition: 'only' }),
    ]);
    root.appendChild(section('Icon only', iconOnly));

    const states = wrap(
      BUTTON_VARIANTS.map((variant) =>
        createButton({ ...args, variant, disabled: true, label: `${variant} disabled` }),
      ),
    );
    root.appendChild(section('Disabled', states));

    return root;
  },
};
