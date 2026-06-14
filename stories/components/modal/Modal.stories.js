import { fn } from 'storybook/test';

import { MODAL_SIZES, createModalDemo } from './Modal';

export default {
  title: 'TODO/Modal',
  tags: ['autodocs'],
  render: (args) => createModalDemo(args),
  argTypes: {
    triggerLabel: { control: 'text' },
    triggerVariant: { control: 'text' },
    title: { control: 'text' },
    body: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: MODAL_SIZES,
    },
    centered: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    staticBackdrop: { control: 'boolean' },
  },
  args: {
    id: 'example-modal',
    triggerLabel: 'Открыть модальное окно',
    triggerVariant: 'primary',
    title: 'Заголовок модального окна',
    body: 'Содержимое модального окна. Здесь может быть форма или текст.',
    centered: false,
    scrollable: false,
    staticBackdrop: false,
    footerButtons: [
      { label: 'Закрыть', variant: 'secondary', dismiss: true },
      { label: 'Сохранить', variant: 'primary', onClick: fn() },
    ],
  },
};

export const Default = {
  name: 'Базовый',
};

export const Centered = {
  name: 'По центру',
  args: { centered: true },
};

export const Large = {
  name: 'Large',
  args: { size: 'lg' },
};

export const Scrollable = {
  name: 'Scrollable',
  args: {
    scrollable: true,
    body:
      '<p>Длинное содержимое для прокрутки.</p>'.repeat(12),
  },
};

export const StaticBackdrop = {
  name: 'Static backdrop',
  args: { staticBackdrop: true },
};
