import { OFFCANVAS_PLACEMENTS, createOffcanvasDemo } from './Offcanvas';

export default {
  title: 'TODO/Offcanvas',
  tags: ['autodocs'],
  render: (args) => createOffcanvasDemo(args),
  argTypes: {
    triggerLabel: { control: 'text' },
    triggerVariant: { control: 'text' },
    title: { control: 'text' },
    body: { control: 'text' },
    placement: {
      control: { type: 'inline-radio' },
      options: OFFCANVAS_PLACEMENTS,
    },
    backdrop: { control: 'boolean' },
    scroll: { control: 'boolean' },
  },
  args: {
    id: 'example-offcanvas',
    triggerLabel: 'Открыть offcanvas',
    triggerVariant: 'primary',
    title: 'Offcanvas',
    body: 'Содержимое боковой панели. Можно разместить навигацию или фильтры.',
    placement: 'start',
    backdrop: true,
    scroll: false,
  },
};

export const Default = {
  name: 'Start',
};

export const End = {
  name: 'End',
  args: { placement: 'end', id: 'example-offcanvas-end' },
};

export const Top = {
  name: 'Top',
  args: { placement: 'top', id: 'example-offcanvas-top' },
};

export const NoBackdrop = {
  name: 'Без backdrop',
  args: {
    backdrop: false,
    id: 'example-offcanvas-no-backdrop',
  },
};
