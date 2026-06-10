import { fn } from 'storybook/test';

import {
  TOAST_VARIANTS,
  createToast,
  createToastContainer,
} from './Toast';

const stack = (children, { gap = '0.75rem' } = {}) => {
  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = gap;
  children.forEach((child) => child && root.appendChild(child));
  return root;
};

export default {
  title: 'Example/Toast',
  tags: ['autodocs'],
  render: (args) => createToast(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [undefined, ...TOAST_VARIANTS],
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    message: { control: 'text' },
    simple: {
      control: 'boolean',
      description:
        'Компактный вариант без `.toast-header`, цвет через `text-bg-{variant}`.',
    },
    dismissible: { control: 'boolean' },
    show: {
      control: 'boolean',
      description: 'Класс `.show` (тост виден сразу). Без него Bootstrap скроет тост.',
    },
    onDismiss: { action: 'onDismiss' },
  },
  args: {
    variant: undefined,
    title: 'Bootstrap',
    subtitle: 'только что',
    message: 'Привет, это базовый тост.',
    simple: false,
    dismissible: true,
    show: true,
    onDismiss: fn(),
  },
};

export const Default = {
  name: 'Базовый (с шапкой)',
  args: {},
};

export const Simple = {
  name: 'Простой (без шапки)',
  args: {
    variant: 'primary',
    simple: true,
    message: 'Hello, world! This is a toast message.',
  },
};

export const AllColors = {
  name: 'Все цвета · simple',
  parameters: { controls: { disable: true } },
  render: () =>
    stack(
      TOAST_VARIANTS.map((variant) =>
        createToast({
          variant,
          simple: true,
          message:
            `Это <strong>text-bg-${variant}</strong> toast — ` +
            'короткое уведомление в стилях Bootstrap.',
          onDismiss: fn(),
        }),
      ),
    ),
};

export const Container = {
  name: 'Toast container · top-end',
  parameters: {
    controls: { disable: true },
    layout: 'fullscreen',
  },
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.position = 'relative';
    wrap.style.minHeight = '320px';
    wrap.style.background = '#f6f7f8';

    wrap.appendChild(
      createToastContainer({
        position: 'top-end',
        toasts: [
          {
            variant: 'success',
            simple: true,
            message: 'Заявка #1234 сохранена.',
            onDismiss: fn(),
          },
          {
            variant: 'danger',
            simple: true,
            message: 'Не удалось загрузить документ.',
            onDismiss: fn(),
          },
          {
            title: 'Bootstrap',
            subtitle: '11 минут назад',
            message: 'Hello, world! Это <strong>toast</strong> с шапкой.',
            onDismiss: fn(),
          },
        ],
      }),
    );
    return wrap;
  },
};
