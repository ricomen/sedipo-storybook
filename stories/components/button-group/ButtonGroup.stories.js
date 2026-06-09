import { fn } from 'storybook/test';

import { BUTTON_VARIANTS } from '../button/Button';
import {
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
  createButtonGroup,
  createButtonToolbar,
} from './ButtonGroup';

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
  title: 'Example/Button group',
  tags: ['autodocs'],
  render: (args) => createButtonGroup(args),
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: BUTTON_GROUP_SIZES,
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: BUTTON_GROUP_ORIENTATIONS,
    },
    ariaLabel: { control: 'text' },
    buttons: { control: 'object' },
  },
  args: {
    size: 'md',
    orientation: 'horizontal',
    ariaLabel: 'Basic example',
    buttons: [
      { variant: 'outline-secondary', label: 'Left', onClick: fn() },
      { variant: 'outline-secondary', label: 'Middle', onClick: fn() },
      { variant: 'outline-secondary', label: 'Right', onClick: fn() },
    ],
  },
};

export const Basic = {
  args: {},
};

export const MixedVariants = {
  name: 'Mixed variants',
  args: {
    ariaLabel: 'Mixed variants',
    buttons: [
      { variant: 'primary', label: 'Сохранить', onClick: fn() },
      { variant: 'outline-secondary', label: 'Отмена', onClick: fn() },
      { variant: 'clean', label: 'Сбросить', onClick: fn() },
    ],
  },
};

export const WithIcons = {
  name: 'With icons',
  args: {
    ariaLabel: 'Text alignment',
    buttons: [
      { variant: 'outline-secondary', label: 'Слева', icon: 'text-left', iconPosition: 'only', onClick: fn() },
      { variant: 'outline-secondary', label: 'По центру', icon: 'text-center', iconPosition: 'only', onClick: fn() },
      { variant: 'outline-secondary', label: 'Справа', icon: 'text-right', iconPosition: 'only', onClick: fn() },
      { variant: 'outline-secondary', label: 'По ширине', icon: 'justify', iconPosition: 'only', onClick: fn() },
    ],
  },
};

export const Small = {
  args: {
    size: 'sm',
    ariaLabel: 'Small button group',
  },
};

export const Vertical = {
  args: {
    orientation: 'vertical',
    ariaLabel: 'Vertical button group',
    buttons: [
      { variant: 'outline-secondary', label: 'Профиль', icon: 'person', onClick: fn() },
      { variant: 'outline-secondary', label: 'Настройки', icon: 'gear', onClick: fn() },
      { variant: 'outline-secondary', label: 'Выход', icon: 'box-arrow-right', onClick: fn() },
    ],
  },
};

export const Toolbar = {
  name: 'Toolbar',
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createButtonToolbar({
      ariaLabel: 'Toolbar with button groups',
      groups: [
        {
          ariaLabel: 'История',
          buttons: [
            { variant: 'outline-secondary', label: 'Назад', icon: 'arrow-left', iconPosition: 'only', onClick: fn() },
            { variant: 'outline-secondary', label: 'Вперёд', icon: 'arrow-right', iconPosition: 'only', onClick: fn() },
          ],
        },
        {
          ariaLabel: 'Действия',
          buttons: [
            { variant: 'outline-secondary', label: 'Копировать', icon: 'clipboard', iconPosition: 'only', onClick: fn() },
            { variant: 'outline-secondary', label: 'Вставить', icon: 'clipboard-check', iconPosition: 'only', onClick: fn() },
            { variant: 'outline-secondary', label: 'Удалить', icon: 'trash', iconPosition: 'only', onClick: fn() },
          ],
        },
        {
          ariaLabel: 'Подтверждение',
          buttons: [
            { variant: 'primary', label: 'Сохранить', icon: 'check2', onClick: fn() },
          ],
        },
      ],
    }),
};

export const AllVariants = {
  name: 'All variants',
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const root = document.createElement('div');
    root.style.fontFamily = 'system-ui, sans-serif';

    root.appendChild(
      section(
        'Basic',
        createButtonGroup({
          ariaLabel: 'Basic example',
          buttons: [
            { variant: 'outline-secondary', label: 'Left', onClick: fn() },
            { variant: 'outline-secondary', label: 'Middle', onClick: fn() },
            { variant: 'outline-secondary', label: 'Right', onClick: fn() },
          ],
        }),
      ),
    );

    root.appendChild(
      section(
        'Mixed variants',
        createButtonGroup({
          ariaLabel: 'Mixed variants',
          buttons: BUTTON_VARIANTS.map((variant) => ({
            variant,
            label: variant,
            onClick: fn(),
          })),
        }),
      ),
    );

    root.appendChild(
      section(
        'Sizes',
        (() => {
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.flexDirection = 'column';
          wrapper.style.gap = '0.5rem';
          wrapper.style.alignItems = 'flex-start';

          BUTTON_GROUP_SIZES.forEach((size) => {
            wrapper.appendChild(
              createButtonGroup({
                size,
                ariaLabel: `Size ${size}`,
                buttons: [
                  { variant: 'outline-secondary', label: `Size ${size}` },
                  { variant: 'outline-secondary', label: 'Middle' },
                  { variant: 'outline-secondary', label: 'Right' },
                ],
              }),
            );
          });
          return wrapper;
        })(),
      ),
    );

    root.appendChild(
      section(
        'Vertical',
        createButtonGroup({
          orientation: 'vertical',
          ariaLabel: 'Vertical button group',
          buttons: [
            { variant: 'outline-secondary', label: 'Профиль', icon: 'person' },
            { variant: 'outline-secondary', label: 'Настройки', icon: 'gear' },
            { variant: 'outline-secondary', label: 'Выход', icon: 'box-arrow-right' },
          ],
        }),
      ),
    );

    return root;
  },
};
