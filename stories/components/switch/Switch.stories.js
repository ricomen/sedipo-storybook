import { fn } from 'storybook/test';

import { createSwitch } from './Switch';

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
  title: 'Example/Switch',
  tags: ['autodocs'],
  render: (args) => createSwitch(args),
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    reverse: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Включить уведомления',
    checked: false,
    disabled: false,
    reverse: false,
    hideLabel: false,
    onChange: fn(),
  },
};

export const Default = {
  args: {},
};

export const Checked = {
  args: { checked: true, label: 'Включено' },
};

export const Disabled = {
  args: { disabled: true, label: 'Недоступно' },
};

export const DisabledChecked = {
  name: 'Disabled + checked',
  args: { disabled: true, checked: true, label: 'Включено (заблокировано)' },
};

export const Reverse = {
  name: 'Reverse (label слева)',
  args: { reverse: true, label: 'Тёмная тема' },
};

export const NoLabel = {
  name: 'Без подписи (только aria-label)',
  args: { hideLabel: true, ariaLabel: 'Toggle' },
};

export const SettingsList = {
  name: 'Список настроек',
  parameters: { controls: { disable: true } },
  render: () =>
    stack([
      createSwitch({ label: 'Email-уведомления', checked: true, onChange: fn() }),
      createSwitch({ label: 'SMS-уведомления', onChange: fn() }),
      createSwitch({ label: 'Push-уведомления', checked: true, onChange: fn() }),
      createSwitch({ label: 'Бета-функции (скоро)', disabled: true, onChange: fn() }),
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
          createSwitch({ label: 'Default', onChange: fn() }),
          createSwitch({ label: 'Checked', checked: true, onChange: fn() }),
          createSwitch({ label: 'Disabled', disabled: true, onChange: fn() }),
          createSwitch({ label: 'Disabled + checked', disabled: true, checked: true, onChange: fn() }),
        ]),
      ),
    );

    root.appendChild(
      section(
        'Reverse',
        stack([
          createSwitch({ label: 'Лейбл слева, переключатель справа', reverse: true, onChange: fn() }),
          createSwitch({ label: 'Reverse + checked', reverse: true, checked: true, onChange: fn() }),
        ]),
      ),
    );

    return root;
  },
};
