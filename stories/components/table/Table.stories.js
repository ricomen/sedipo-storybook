import { createTable } from './Table';

export default {
  title: 'Example/Table',
  tags: ['autodocs'],
  render: (args) => createTable(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'light', 'dark'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hover: { control: 'boolean' },
    responsive: { control: 'boolean' },
    caption: { control: 'text' },
    columns: { control: 'object' },
    rows: { control: 'object' },
  },
  args: {
    variant: 'default',
    size: 'medium',
    striped: false,
    bordered: false,
    hover: false,
    responsive: false,
    caption: '',
  },
};

export const Default = {
  args: {},
};

export const Striped = {
  args: {
    striped: true,
  },
};

export const Bordered = {
  args: {
    bordered: true,
  },
};

export const Hover = {
  args: {
    hover: true,
  },
};

export const Small = {
  args: {
    size: 'small',
  },
};

export const Dark = {
  args: {
    variant: 'dark',
    striped: true,
  },
};

export const Responsive = {
  args: {
    responsive: true,
    bordered: true,
    columns: [
      { key: 'id', label: '#' },
      { key: 'col1', label: 'Heading 1' },
      { key: 'col2', label: 'Heading 2' },
      { key: 'col3', label: 'Heading 3' },
      { key: 'col4', label: 'Heading 4' },
      { key: 'col5', label: 'Heading 5' },
      { key: 'col6', label: 'Heading 6' },
      { key: 'col7', label: 'Heading 7' },
      { key: 'col8', label: 'Heading 8' },
    ],
    rows: [
      { id: 1, col1: 'Cell', col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell', col6: 'Cell', col7: 'Cell', col8: 'Cell' },
      { id: 2, col1: 'Cell', col2: 'Cell', col3: 'Cell', col4: 'Cell', col5: 'Cell', col6: 'Cell', col7: 'Cell', col8: 'Cell' },
    ],
  },
};
