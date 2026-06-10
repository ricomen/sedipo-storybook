import { fn } from 'storybook/test';

import { ALERT_VARIANTS, createAlert } from './Alert';

const stack = (children, { gap = '0.75rem' } = {}) => {
  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = gap;
  children.forEach((child) => child && root.appendChild(child));
  return root;
};

export default {
  title: 'Example/Alert',
  tags: ['autodocs'],
  render: (args) => createAlert(args),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ALERT_VARIANTS,
    },
    message: { control: 'text' },
    heading: { control: 'text' },
    icon: {
      control: 'text',
      description: 'Имя bi-иконки без префикса (например, `info-circle-fill`)',
    },
    textOnly: {
      control: 'boolean',
      description:
        'Добавить модификатор `.alert-text` — мелкий текст в цвете *-text-emphasis, ' +
        'без фона/бордера/паддинга. Для inline-сообщений.',
    },
    dismissible: { control: 'boolean' },
    onDismiss: { action: 'onDismiss' },
  },
  args: {
    variant: 'primary',
    message: 'Это простое информационное сообщение.',
    heading: '',
    icon: '',
    textOnly: false,
    dismissible: false,
    onDismiss: fn(),
  },
};

export const Primary = {
  args: { variant: 'primary', message: 'Это primary-alert. Используйте для нейтральных сообщений.' },
};

export const light = {
  args: { variant: 'light', message: 'Это light-alert.' },
};

export const Success = {
  args: { variant: 'success', message: 'Готово! Данные успешно сохранены.' },
};

export const Warning = {
  args: { variant: 'warning', message: 'Внимание! Проверьте введённые данные.' },
};

export const Danger = {
  args: { variant: 'danger', message: 'Ошибка! Не удалось выполнить операцию.' },
};

export const WithHeading = {
  name: 'С заголовком',
  args: {
    variant: 'success',
    heading: 'Отлично!',
    message: 'Ваш заказ оформлен. Мы отправили подтверждение на email.',
  },
};

export const WithIcon = {
  name: 'С иконкой',
  args: {
    variant: 'warning',
    icon: 'exclamation-triangle-fill',
    message: 'Срок действия пароля истекает через 3 дня.',
  },
};

export const WithLink = {
  name: 'Со ссылкой',
  args: {
    variant: 'primary',
    message:
      'Прочитайте <a href="#" class="alert-link">наши рекомендации</a>, чтобы получить максимум от продукта.',
  },
};

export const TextOnly = {
  name: '.alert-text — компактный',
  args: {
    variant: 'danger',
    textOnly: true,
    message: 'Ошибка валидации: укажите корректный email.',
  },
};

export const Dismissible = {
  name: 'Закрываемый',
  args: {
    variant: 'danger',
    icon: 'x-octagon-fill',
    heading: 'Что-то пошло не так',
    message: 'Не удалось загрузить данные. Попробуйте обновить страницу.',
    dismissible: true,
  },
};

export const AllColors = {
  name: 'Все цвета',
  parameters: { controls: { disable: true } },
  render: () =>
    stack(
      ALERT_VARIANTS.map((variant) =>
        createAlert({
          variant,
          message:
            `Это <strong>alert-${variant}</strong> — ` +
            `<a href="#" class="alert-link">ссылка внутри alert</a>.`,
        }),
      ),
    ),
};

export const AllColorsTextOnly = {
  name: 'Все цвета · .alert-text',
  parameters: { controls: { disable: true } },
  render: () =>
    stack(
      ALERT_VARIANTS.map((variant) =>
        createAlert({
          variant,
          textOnly: true,
          message: `Компактный alert-${variant}.alert-text`,
        }),
      ),
    ),
};

export const AllColorsDismissible = {
  name: 'Все цвета · закрываемые',
  parameters: { controls: { disable: true } },
  render: () =>
    stack(
      ALERT_VARIANTS.map((variant) =>
        createAlert({
          variant,
          message: `Закрываемый alert-${variant}.`,
          dismissible: true,
          onDismiss: fn(),
        }),
      ),
    ),
};
