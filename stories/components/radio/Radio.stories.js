import { fn } from 'storybook/test';

import { createRadio, createRadioGroup } from './Radio';

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
  title: 'Example/Radio',
  tags: ['autodocs'],
  render: (args) => createRadio(args),
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    inline: { control: 'boolean' },
    reverse: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Radio',
    name: 'demo',
    value: 'demo',
    checked: false,
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

export const Disabled = {
  args: { disabled: true, label: 'Недоступно' },
};

export const DisabledChecked = {
  name: 'Disabled + checked',
  args: { disabled: true, checked: true, label: 'Недоступно (выбрано)' },
};

export const Reverse = {
  name: 'Reverse (label слева)',
  args: { reverse: true, label: 'Лейбл слева' },
};

export const Group = {
  name: 'Группа (вертикально)',
  parameters: { controls: { disable: true } },
  render: () =>
    createRadioGroup({
      name: 'city',
      ariaLabel: 'Выбор города',
      value: 'msk',
      onChange: fn(),
      options: [
        { value: 'msk', label: 'Москва' },
        { value: 'spb', label: 'Санкт-Петербург' },
        { value: 'kzn', label: 'Казань' },
        { value: 'ekb', label: 'Екатеринбург' },
      ],
    }),
};

export const InlineGroup = {
  name: 'Группа inline',
  parameters: { controls: { disable: true } },
  render: () =>
    createRadioGroup({
      name: 'size',
      inline: true,
      ariaLabel: 'Размер',
      value: 'm',
      onChange: fn(),
      options: [
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL' },
      ],
    }),
};

export const GroupWithDisabled = {
  name: 'Группа с disabled-опцией',
  parameters: { controls: { disable: true } },
  render: () =>
    createRadioGroup({
      name: 'plan',
      ariaLabel: 'Тариф',
      value: 'free',
      onChange: fn(),
      options: [
        { value: 'free', label: 'Бесплатный' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise (скоро)', disabled: true },
      ],
    }),
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
        createRadioGroup({
          name: 'states-basic',
          ariaLabel: 'Базовые состояния',
          onChange: fn(),
          options: [
            { value: '1', label: 'Default' },
            { value: '2', label: 'Checked', checked: true },
            { value: '3', label: 'Disabled', disabled: true },
            { value: '4', label: 'Disabled + checked', disabled: true, checked: true },
          ],
        }),
      ),
    );

    root.appendChild(
      section(
        'Inline',
        createRadioGroup({
          name: 'states-inline',
          inline: true,
          ariaLabel: 'Inline',
          value: '2',
          onChange: fn(),
          options: [
            { value: '1', label: 'Один' },
            { value: '2', label: 'Два' },
            { value: '3', label: 'Три' },
          ],
        }),
      ),
    );

    root.appendChild(
      section(
        'Reverse',
        createRadioGroup({
          name: 'states-reverse',
          reverse: true,
          ariaLabel: 'Reverse',
          value: 'a',
          onChange: fn(),
          options: [
            { value: 'a', label: 'Лейбл слева, кнопка справа' },
            { value: 'b', label: 'Reverse + не выбран' },
          ],
        }),
      ),
    );

    return root;
  },
};
