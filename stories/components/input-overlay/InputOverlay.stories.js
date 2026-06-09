import { fn } from 'storybook/test';

import { INPUT_OVERLAY_SIZES, createInputOverlay } from './InputOverlay';

const cleanAction = (overrides = {}) => ({
  variant: 'clean',
  icon: 'x-lg',
  ariaLabel: 'Сбросить фильтр',
  clearOnClick: true,
  onClick: fn(),
  ...overrides,
});

export default {
  title: 'Example/Input overlay',
  tags: ['autodocs'],
  render: (args) => createInputOverlay(args),
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: INPUT_OVERLAY_SIZES,
    },
    type: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    hideActionWhenEmpty: { control: 'boolean' },
    action: { control: 'object' },
  },
  args: {
    size: 'md',
    type: 'text',
    placeholder: 'Фильтр',
    value: 'Москва',
    ariaLabel: 'Фильтр',
    disabled: false,
    hideActionWhenEmpty: false,
    action: cleanAction(),
  },
};

export const ResetFilter = {
  name: 'Сброс фильтра (clean внутри)',
  args: {},
};

export const HideWhenEmpty = {
  name: 'Скрывать кнопку при пустом поле',
  args: {
    hideActionWhenEmpty: true,
    value: 'Можно очистить',
  },
};

export const Small = {
  name: 'Small + clean внутри',
  args: {
    size: 'sm',
    value: 'Привет',
  },
};

export const Disabled = {
  name: 'Disabled + clean внутри',
  args: {
    disabled: true,
    value: 'Недоступно',
  },
};

export const EmptyPlaceholder = {
  name: 'Пустое поле',
  args: {
    value: '',
    placeholder: 'Введите название города',
    hideActionWhenEmpty: true,
  },
};
