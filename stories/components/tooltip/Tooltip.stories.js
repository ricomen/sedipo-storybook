import { TOOLTIP_PLACEMENTS, createTooltipDemo } from './Tooltip';

export default {
  title: 'TODO/Tooltips',
  tags: ['autodocs'],
  render: (args) => createTooltipDemo(args),
  argTypes: {
    label: { control: 'text' },
    tooltip: { control: 'text' },
    placement: {
      control: { type: 'inline-radio' },
      options: TOOLTIP_PLACEMENTS,
    },
    variant: { control: 'text' },
    showAllPlacements: { control: 'boolean' },
  },
  args: {
    label: 'Наведите курсор',
    tooltip: 'Это tooltip Bootstrap',
    placement: 'top',
    variant: 'secondary',
    showAllPlacements: false,
  },
};

export const Default = {
  name: 'Базовый',
};

export const AllPlacements = {
  name: 'Все позиции',
  args: { showAllPlacements: true },
  parameters: { controls: { disable: true } },
};
