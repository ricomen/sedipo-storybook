import { createTabs, TAB_VARIANTS } from './Tabs';

export default {
  title: 'TODO/Tabs',
  tags: ['autodocs'],
  render: (args) => createTabs(args),
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: TAB_VARIANTS,
    },
    id: { control: 'text' },
  },
  args: {
    id: 'example-tabs',
    variant: 'tabs',
  },
};

export const Default = {
  name: 'Базовые вкладки',
};

export const Pills = {
  name: 'Pills',
  args: { variant: 'pills' },
};
