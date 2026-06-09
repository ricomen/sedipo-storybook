import { fn } from 'storybook/test';

import { createCheckbox } from './Checkbox';

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

const stack = (children, { gap = '0.5rem', direction = 'column' } = {}) => {
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.flexDirection = direction;
  row.style.flexWrap = 'wrap';
  row.style.gap = gap;
  children.forEach((child) => row.appendChild(child));
  return row;
};

export default {
  title: 'Example/Checkbox',
  tags: ['autodocs'],
  render: (args) => createCheckbox(args),
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    inline: { control: 'boolean' },
    reverse: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Согласен с условиями',
    checked: false,
    indeterminate: false,
    disabled: false,
    inline: false,
    reverse: false,
    hideLabel: false,
    onChange: fn(),
  },
};

export const Default = {
  args: {},
};

export const Checked = {
  args: { checked: true, label: 'Выбран' },
};

export const Indeterminate = {
  name: 'Indeterminate',
  args: { indeterminate: true, label: 'Частично выбран' },
};

export const Disabled = {
  args: { disabled: true, label: 'Недоступно' },
};

export const DisabledChecked = {
  name: 'Disabled + checked',
  args: { disabled: true, checked: true, label: 'Недоступно (выбрано)' },
};

export const Reverse = {
  name: 'Reverse (label слева)',
  args: { reverse: true, label: 'Лейбл справа налево' },
};

export const Inline = {
  name: 'Inline (несколько в строке)',
  parameters: { controls: { disable: true } },
  render: () =>
    stack(
      [
        createCheckbox({ label: 'Москва', inline: true, checked: true, onChange: fn() }),
        createCheckbox({ label: 'Санкт-Петербург', inline: true, onChange: fn() }),
        createCheckbox({ label: 'Казань', inline: true, onChange: fn() }),
      ],
      { direction: 'row' },
    ),
};

export const Group = {
  name: 'Группа (вертикально)',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      createCheckbox({ label: 'Email-уведомления', checked: true, onChange: fn() }),
      createCheckbox({ label: 'SMS-уведомления', onChange: fn() }),
      createCheckbox({ label: 'Push-уведомления', checked: true, onChange: fn() }),
      createCheckbox({ label: 'Telegram-уведомления', disabled: true, onChange: fn() }),
    ]),
};

export const States = {
  name: 'All states',
  parameters: { controls: { disable: true } },
  render: () => {
    const root = document.createElement('div');
    root.style.fontFamily = 'system-ui, sans-serif';

    root.appendChild(
      section(
        'Базовые состояния',
        stack([
          createCheckbox({ label: 'Default', onChange: fn() }),
          createCheckbox({ label: 'Checked', checked: true, onChange: fn() }),
          createCheckbox({ label: 'Indeterminate', indeterminate: true, onChange: fn() }),
          createCheckbox({ label: 'Disabled', disabled: true, onChange: fn() }),
          createCheckbox({ label: 'Disabled + checked', disabled: true, checked: true, onChange: fn() }),
        ]),
      ),
    );

    root.appendChild(
      section(
        'Inline',
        stack(
          [
            createCheckbox({ label: 'Один', inline: true, onChange: fn() }),
            createCheckbox({ label: 'Два', inline: true, checked: true, onChange: fn() }),
            createCheckbox({ label: 'Три', inline: true, onChange: fn() }),
          ],
          { direction: 'row' },
        ),
      ),
    );

    root.appendChild(
      section(
        'Reverse',
        stack([
          createCheckbox({ label: 'Лейбл слева, чекбокс справа', reverse: true, onChange: fn() }),
          createCheckbox({ label: 'Reverse + checked', reverse: true, checked: true, onChange: fn() }),
        ]),
      ),
    );

    return root;
  },
};
